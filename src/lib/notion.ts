import { Client } from '@notionhq/client';
import { DevlogEntry } from '@/app/devlog/data';

// Initialize the Notion client
// Note: In a production environment, this should be stored in environment variables
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// The ID of the database containing devlog entries
// This should also be stored in environment variables
const databaseId = process.env.NOTION_DEVLOG_DATABASE_ID;

/**
 * Fetches all blocks for a specific page
 */
async function getPageBlocks(pageId: string): Promise<string> {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
    });

    // Process blocks to create HTML content
    let content = '';
    let currentListType = null;
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
          const listClass = listType === 'ul' ? 'notion-bulleted-list list-disc pl-6 my-4' : 'notion-numbered-list list-decimal pl-6 my-4';
          content += `<${listType} class="${listClass}">`;
          currentListType = listType;
          isListOpen = true;
        }

        // Add the list item
        content += processBlock(block, true);
      } else {
        // If we're leaving a list, close it
        if (isListOpen) {
          content += `</${currentListType}>`;
          isListOpen = false;
          currentListType = null;
        }

        // Process the non-list block
        content += processBlock(block);
      }
    }

    // Close any open list at the end
    if (isListOpen) {
      content += `</${currentListType}>`;
    }

    return content;
  } catch (error) {
    console.error('Error fetching page blocks from Notion:', error);
    return '';
  }
}

/**
 * Processes a block and returns HTML content
 */
function processBlock(block: any, isListItem = false): string {
  if (!block || !block.type) return '';

  const blockType = block.type;
  const blockContent = block[blockType];

  if (!blockContent) return '';

  switch (blockType) {
    case 'paragraph':
      return `<p class="notion-paragraph">${getRichTextContent(blockContent.rich_text)}</p>`;
    case 'heading_1':
      return `<h1 class="notion-h1 text-3xl font-bold mt-8 mb-4">${getRichTextContent(blockContent.rich_text)}</h1>`;
    case 'heading_2':
      return `<h2 class="notion-h2 text-2xl font-bold mt-6 mb-3">${getRichTextContent(blockContent.rich_text)}</h2>`;
    case 'heading_3':
      return `<h3 class="notion-h3 text-xl font-bold mt-4 mb-2">${getRichTextContent(blockContent.rich_text)}</h3>`;
    case 'bulleted_list_item':
      // If it's being processed as part of a list, just return the li element
      return isListItem
        ? `<li class="notion-list-item">${getRichTextContent(blockContent.rich_text)}</li>`
        : `<ul class="notion-bulleted-list list-disc pl-6 my-4"><li class="notion-list-item">${getRichTextContent(blockContent.rich_text)}</li></ul>`;
    case 'numbered_list_item':
      // If it's being processed as part of a list, just return the li element
      return isListItem
        ? `<li class="notion-list-item">${getRichTextContent(blockContent.rich_text)}</li>`
        : `<ol class="notion-numbered-list list-decimal pl-6 my-4"><li class="notion-list-item">${getRichTextContent(blockContent.rich_text)}</li></ol>`;
    case 'code':
      return `<pre class="notion-code bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4"><code>${getRichTextContent(blockContent.rich_text)}</code></pre>`;
    case 'quote':
      return `<blockquote class="notion-quote border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">${getRichTextContent(blockContent.rich_text)}</blockquote>`;
    case 'divider':
      return `<hr class="notion-divider my-6 border-t border-gray-200 dark:border-gray-700">`;
    case 'image':
      if (blockContent.type === 'external') {
        return `<figure class="notion-image my-6">
          <img src="${blockContent.external.url}" alt="${blockContent.caption ? getRichTextContent(blockContent.caption) : ''}" class="rounded-lg max-w-full h-auto" />
          ${blockContent.caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${getRichTextContent(blockContent.caption)}</figcaption>` : ''}
        </figure>`;
      } else if (blockContent.type === 'file') {
        return `<figure class="notion-image my-6">
          <img src="${blockContent.file.url}" alt="${blockContent.caption ? getRichTextContent(blockContent.caption) : ''}" class="rounded-lg max-w-full h-auto" />
          ${blockContent.caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${getRichTextContent(blockContent.caption)}</figcaption>` : ''}
        </figure>`;
      }
      return '';
    case 'callout':
      return `<div class="notion-callout bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex items-start gap-3 my-4">
        ${blockContent.icon ? `<div class="notion-callout-icon text-xl">${blockContent.icon.emoji}</div>` : ''}
        <div class="notion-callout-content">${getRichTextContent(blockContent.rich_text)}</div>
      </div>`;
    case 'toggle':
      return `<details class="notion-toggle my-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <summary class="notion-toggle-summary p-3 cursor-pointer font-medium">${getRichTextContent(blockContent.rich_text)}</summary>
        <div class="notion-toggle-content p-3 pt-0 border-t border-gray-200 dark:border-gray-700"></div>
      </details>`;
    case 'bookmark':
      return `<a href="${blockContent.url}" class="notion-bookmark block border border-gray-200 dark:border-gray-700 rounded-md p-4 my-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" target="_blank" rel="noopener noreferrer">
        <div class="text-blue-600 dark:text-blue-400 break-all">${blockContent.url}</div>
      </a>`;
    case 'table':
      return `<div class="notion-table-container overflow-x-auto my-4">
        <table class="notion-table w-full border-collapse border border-gray-200 dark:border-gray-700">
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
function getRichTextContent(richText: any[]): string {
  if (!richText || richText.length === 0) return '';

  return richText.map(text => {
    let formattedText = text.plain_text;

    // Apply text formatting
    if (text.annotations) {
      if (text.annotations.bold) {
        formattedText = `<strong class="notion-bold font-bold">${formattedText}</strong>`;
      }
      if (text.annotations.italic) {
        formattedText = `<em class="notion-italic italic">${formattedText}</em>`;
      }
      if (text.annotations.strikethrough) {
        formattedText = `<del class="notion-strikethrough line-through">${formattedText}</del>`;
      }
      if (text.annotations.underline) {
        formattedText = `<u class="notion-underline underline">${formattedText}</u>`;
      }
      if (text.annotations.code) {
        formattedText = `<code class="notion-inline-code bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">${formattedText}</code>`;
      }
    }

    // Handle links
    if (text.href) {
      formattedText = `<a href="${text.href}" class="notion-link text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">${formattedText}</a>`;
    }

    return formattedText;
  }).join('');
}

/**
 * Fetches all devlog entries from Notion
 */
export async function getDevlogEntries(): Promise<DevlogEntry[]> {
  if (!databaseId) {
    console.error('Notion database ID is not defined');
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    const entries = [];

    for (const page of response.results) {
      const properties = page.properties;
      const pageContent = await getPageBlocks(page.id);

      entries.push({
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
        summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
        content: pageContent,
        tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
      });
    }

    return entries;
  } catch (error) {
    console.error('Error fetching devlog entries from Notion:', error);
    return [];
  }
}

/**
 * Fetches a specific devlog entry by slug
 */
export async function getDevlogEntryBySlug(slug: string): Promise<DevlogEntry | undefined> {
  if (!databaseId) {
    console.error('Notion database ID is not defined');
    return undefined;
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'Status',
            select: {
              equals: 'Published'
            }
          }
        ]
      },
    });

    if (response.results.length === 0) {
      return undefined;
    }

    const page = response.results[0];
    const properties = page.properties;
    const pageContent = await getPageBlocks(page.id);

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
      date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
      summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
      content: pageContent,
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
    };
  } catch (error) {
    console.error('Error fetching devlog entry from Notion:', error);
    return undefined;
  }
}
