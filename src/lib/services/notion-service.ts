import { Client } from '@notionhq/client';
import { unstable_cache } from 'next/cache';
import {
  NotionBlock,
  NotionBlocksResponse,
  NotionDatabaseQueryResponse,
  NotionPage
} from '@/types/notion-api';

/**
 * Base class for Notion services
 * Handles common functionality like initializing the client, processing blocks, and caching
 */
export class NotionService {
  protected notion: Client;

  constructor() {
    // Initialize the Notion client
    const apiKey = process.env.NOTION_API_KEY;

    if (!apiKey) {
      console.error('Notion API key is not defined');
    }

    this.notion = new Client({
      auth: apiKey,
    });
  }

  /**
   * Fetches all blocks for a specific page with caching
   */
  protected async getPageBlocks(pageId: string): Promise<string> {
    return this.getPageBlocksWithCache(pageId);
  }

  /**
   * Cached version of the fetch function for page blocks
   */
  private getPageBlocksWithCache = unstable_cache(
    async (pageId: string): Promise<string> => {
      try {
        const blocks = await this.notion.blocks.children.list({
          block_id: pageId,
        }) as NotionBlocksResponse;

        // Process blocks to create HTML content
        let content = '';
        let currentListType: string | null = null;
        let isListOpen = false;

        for (const block of blocks.results) {
          const blockType = block.type;

          // Handle list items specially to group them
          if (blockType === 'bulleted_list_item' || blockType === 'numbered_list_item') {
            const listType = blockType === 'bulleted_list_item' ? 'ul' : 'ol';

            // If we're not in a list or in a different type of list, close the previous list and start a new one
            if (!isListOpen || currentListType !== listType) {
              if (isListOpen) {
                content += `</${currentListType}>`;
              }
              const listClass = listType === 'ul' ? 'list-disc pl-6 my-4' : 'list-decimal pl-6 my-4';
              content += `<${listType} class="${listClass}">`;
              currentListType = listType;
              isListOpen = true;
            }

            // Add the list item
            content += this.processBlock(block, true);
          } else {
            // If we're leaving a list, close it
            if (isListOpen) {
              content += `</${currentListType}>`;
              isListOpen = false;
              currentListType = null;
            }

            // Process the non-list block
            content += this.processBlock(block);
          }
        }

        // Close any open list at the end
        if (isListOpen && currentListType) {
          content += `</${currentListType}>`;
        }

        return content;
      } catch (error) {
        console.error('Error fetching page blocks from Notion:', error);
        return '';
      }
    },
    ['page-blocks'], // Cache key prefix
    {
      revalidate: 3600, // Cache for 1 hour (3600 seconds)
      tags: ['notion-content'] // Tag for manual revalidation
    }
  );

  /**
   * Processes a block and returns HTML content
   */
  protected processBlock(block: NotionBlock, isListItem = false): string {
    if (!block || !block.type) return '';

    const blockType = block.type;
    const blockContent = block[blockType];

    if (!blockContent) return '';

    switch (blockType) {
      case 'paragraph':
        return `<p class="my-4 leading-relaxed">${this.getRichTextContent(blockContent.rich_text)}</p>`;
      case 'heading_1':
        return `<h1 class="text-3xl font-bold mt-8 mb-4">${this.getRichTextContent(blockContent.rich_text)}</h1>`;
      case 'heading_2':
        return `<h2 class="text-2xl font-bold mt-6 mb-3">${this.getRichTextContent(blockContent.rich_text)}</h2>`;
      case 'heading_3':
        return `<h3 class="text-xl font-bold mt-4 mb-2">${this.getRichTextContent(blockContent.rich_text)}</h3>`;
      case 'bulleted_list_item':
        // If it's being processed as part of a list, just return the li element
        return isListItem
          ? `<li class="my-1">${this.getRichTextContent(blockContent.rich_text)}</li>`
          : `<ul class="list-disc pl-6 my-4"><li class="my-1">${this.getRichTextContent(blockContent.rich_text)}</li></ul>`;
      case 'numbered_list_item':
        // If it's being processed as part of a list, just return the li element
        return isListItem
          ? `<li class="my-1">${this.getRichTextContent(blockContent.rich_text)}</li>`
          : `<ol class="list-decimal pl-6 my-4"><li class="my-1">${this.getRichTextContent(blockContent.rich_text)}</li></ol>`;
      case 'code':
        return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm">${this.getRichTextContent(blockContent.rich_text)}</code></pre>`;
      case 'quote':
        return `<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">${this.getRichTextContent(blockContent.rich_text)}</blockquote>`;
      case 'divider':
        return `<hr class="my-6 border-t border-gray-200 dark:border-gray-700">`;
      case 'image':
        if (blockContent.type === 'external') {
          return `<figure class="my-6 flex flex-col items-center">
            <img src="${blockContent.external.url}" alt="${blockContent.caption ? this.getRichTextContent(blockContent.caption) : ''}" class="rounded-lg max-w-full h-auto" />
            ${blockContent.caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${this.getRichTextContent(blockContent.caption)}</figcaption>` : ''}
          </figure>`;
        } else if (blockContent.type === 'file') {
          return `<figure class="my-6 flex flex-col items-center">
            <img src="${blockContent.file.url}" alt="${blockContent.caption ? this.getRichTextContent(blockContent.caption) : ''}" class="rounded-lg max-w-full h-auto" />
            ${blockContent.caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${this.getRichTextContent(blockContent.caption)}</figcaption>` : ''}
          </figure>`;
        }
        return '';
      case 'callout':
        return `<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex items-start gap-3 my-4">
          ${blockContent.icon ? `<div class="flex-shrink-0 text-xl">${blockContent.icon.emoji}</div>` : ''}
          <div class="flex-grow">${this.getRichTextContent(blockContent.rich_text)}</div>
        </div>`;
      case 'toggle':
        return `<details class="my-4 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          <summary class="p-3 cursor-pointer font-medium flex items-center">${this.getRichTextContent(blockContent.rich_text)}</summary>
          <div class="p-3 pt-0 border-t border-gray-200 dark:border-gray-700 pl-8"></div>
        </details>`;
      case 'bookmark':
        return `<a href="${blockContent.url}" class="block border border-gray-200 dark:border-gray-700 rounded-md p-4 my-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" target="_blank" rel="noopener noreferrer">
          <div class="text-blue-600 dark:text-blue-400 break-all">${blockContent.url}</div>
        </a>`;
      case 'table':
        return `<div class="overflow-x-auto my-4">
          <table class="w-full border-collapse border border-gray-200 dark:border-gray-700">
            <tbody></tbody>
          </table>
        </div>`;
      default:
        console.log(`Unhandled block type: ${blockType}`);
        return '';
    }
  }

  /**
   * Gets the formatted text content from rich text objects
   */
  protected getRichTextContent(richText: any[]): string {
    if (!richText || richText.length === 0) return '';

    return richText.map(text => {
      let formattedText = text.plain_text;

      // Apply text formatting
      if (text.annotations) {
        if (text.annotations.bold) {
          formattedText = `<strong class="font-bold">${formattedText}</strong>`;
        }
        if (text.annotations.italic) {
          formattedText = `<em class="italic">${formattedText}</em>`;
        }
        if (text.annotations.strikethrough) {
          formattedText = `<del class="line-through">${formattedText}</del>`;
        }
        if (text.annotations.underline) {
          formattedText = `<u class="underline">${formattedText}</u>`;
        }
        if (text.annotations.code) {
          formattedText = `<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">${formattedText}</code>`;
        }
      }

      // Handle links
      if (text.href) {
        formattedText = `<a href="${text.href}" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">${formattedText}</a>`;
      }

      return formattedText;
    }).join('');
  }

  /**
   * Helper method to query a Notion database with caching
   */
  protected async queryDatabaseWithCache<T>(
    databaseId: string | undefined,
    filter: any,
    sorts: any[],
    mapper: (page: NotionPage) => Promise<T>,
    cacheKey: string,
    cacheTags: string[]
  ): Promise<T[]> {
    if (!databaseId) {
      console.error(`Notion database ID is not defined for ${cacheKey}`);
      return [];
    }

    const fetchFunction = async (): Promise<T[]> => {
      try {
        const response = await this.notion.databases.query({
          database_id: databaseId,
          filter,
          sorts,
        }) as NotionDatabaseQueryResponse;

        const items: T[] = [];
        for (const page of response.results) {
          const item = await mapper(page);
          items.push(item);
        }

        return items;
      } catch (error) {
        console.error(`Error fetching ${cacheKey} from Notion:`, error);

        // Log more detailed error information
        if (error instanceof Error) {
          console.error(`Error name: ${error.name}`);
          console.error(`Error message: ${error.message}`);
          console.error(`Error stack: ${error.stack}`);
        }

        // Log the request parameters for debugging
        console.error('Request parameters:', {
          database_id: databaseId,
          filter: JSON.stringify(filter),
          sorts: JSON.stringify(sorts)
        });

        return [];
      }
    };

    // Create a cached version of the fetch function
    return unstable_cache(
      fetchFunction,
      [cacheKey],
      {
        revalidate: 3600, // Cache for 1 hour (3600 seconds)
        tags: cacheTags
      }
    )();
  }

  /**
   * Helper method to query a single item from a Notion database with caching
   */
  protected async queryItemBySlugWithCache<T>(
    databaseId: string | undefined,
    slug: string,
    additionalFilters: any[] = [],
    mapper: (page: NotionPage) => Promise<T>,
    cacheKey: string,
    cacheTags: string[]
  ): Promise<T | undefined> {
    if (!databaseId) {
      console.error(`Notion database ID is not defined for ${cacheKey}`);
      return undefined;
    }

    const fetchFunction = async (): Promise<T | undefined> => {
      try {
        const filters = [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          ...additionalFilters
        ];

        const response = await this.notion.databases.query({
          database_id: databaseId,
          filter: additionalFilters.length > 0 ? { and: filters } : filters[0],
        }) as NotionDatabaseQueryResponse;

        if (response.results.length === 0) {
          return undefined;
        }

        const page = response.results[0];
        return await mapper(page);
      } catch (error) {
        console.error(`Error fetching ${cacheKey} from Notion:`, error);
        return undefined;
      }
    };

    // Create a cached version of the fetch function
    return unstable_cache(
      fetchFunction,
      [`${cacheKey}-${slug}`],
      {
        revalidate: 3600, // Cache for 1 hour (3600 seconds)
        tags: cacheTags
      }
    )();
  }
}
