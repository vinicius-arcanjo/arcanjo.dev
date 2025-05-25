import { Client } from '@notionhq/client';
import { unstable_cache } from 'next/cache';
import { DevlogEntry, Game } from '@/types/notion';
import { GameCardProps } from '@/components/game-card';

// Initialize the Notion client
// Note: In a production environment, this should be stored in environment variables
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// The IDs of the databases
// These should be stored in environment variables
const devlogDatabaseId = process.env.NOTION_DEVLOG_DATABASE_ID;
const gamesDatabaseId = process.env.NOTION_GAMES_DATABASE_ID;

/**
 * Fetches all blocks for a specific page with caching
 */
async function getPageBlocks(pageId: string): Promise<string> {
  return getPageBlocksWithCache(pageId);
}

// Create a cached version of the fetch function for page blocks
const getPageBlocksWithCache = unstable_cache(
  async (pageId: string): Promise<string> => {
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
            const listClass = listType === 'ul' ? 'list-disc pl-6 my-4' : 'list-decimal pl-6 my-4';
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
  },
  ['page-blocks'], // Cache key prefix
  {
    revalidate: 3600, // Cache for 1 hour (3600 seconds)
    tags: ['devlog-entries'] // Tag for manual revalidation
  }
);

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
      return `<p class="my-4 leading-relaxed">${getRichTextContent(blockContent.rich_text)}</p>`;
    case 'heading_1':
      return `<h1 class="text-3xl font-bold mt-8 mb-4">${getRichTextContent(blockContent.rich_text)}</h1>`;
    case 'heading_2':
      return `<h2 class="text-2xl font-bold mt-6 mb-3">${getRichTextContent(blockContent.rich_text)}</h2>`;
    case 'heading_3':
      return `<h3 class="text-xl font-bold mt-4 mb-2">${getRichTextContent(blockContent.rich_text)}</h3>`;
    case 'bulleted_list_item':
      // If it's being processed as part of a list, just return the li element
      return isListItem
        ? `<li class="my-1">${getRichTextContent(blockContent.rich_text)}</li>`
        : `<ul class="list-disc pl-6 my-4"><li class="my-1">${getRichTextContent(blockContent.rich_text)}</li></ul>`;
    case 'numbered_list_item':
      // If it's being processed as part of a list, just return the li element
      return isListItem
        ? `<li class="my-1">${getRichTextContent(blockContent.rich_text)}</li>`
        : `<ol class="list-decimal pl-6 my-4"><li class="my-1">${getRichTextContent(blockContent.rich_text)}</li></ol>`;
    case 'code':
      return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto my-4"><code class="font-mono text-sm">${getRichTextContent(blockContent.rich_text)}</code></pre>`;
    case 'quote':
      return `<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">${getRichTextContent(blockContent.rich_text)}</blockquote>`;
    case 'divider':
      return `<hr class="my-6 border-t border-gray-200 dark:border-gray-700">`;
    case 'image':
      if (blockContent.type === 'external') {
        return `<figure class="my-6 flex flex-col items-center">
          <img src="${blockContent.external.url}" alt="${blockContent.caption ? getRichTextContent(blockContent.caption) : ''}" class="rounded-lg max-w-full h-auto" />
          ${blockContent.caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${getRichTextContent(blockContent.caption)}</figcaption>` : ''}
        </figure>`;
      } else if (blockContent.type === 'file') {
        return `<figure class="my-6 flex flex-col items-center">
          <img src="${blockContent.file.url}" alt="${blockContent.caption ? getRichTextContent(blockContent.caption) : ''}" class="rounded-lg max-w-full h-auto" />
          ${blockContent.caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${getRichTextContent(blockContent.caption)}</figcaption>` : ''}
        </figure>`;
      }
      return '';
    case 'callout':
      return `<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex items-start gap-3 my-4">
        ${blockContent.icon ? `<div class="flex-shrink-0 text-xl">${blockContent.icon.emoji}</div>` : ''}
        <div class="flex-grow">${getRichTextContent(blockContent.rich_text)}</div>
      </div>`;
    case 'toggle':
      return `<details class="my-4 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
        <summary class="p-3 cursor-pointer font-medium flex items-center">${getRichTextContent(blockContent.rich_text)}</summary>
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
function getRichTextContent(richText: any[]): string {
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
 * Fetches all devlog entries from Notion with caching
 */
export async function getDevlogEntries(): Promise<DevlogEntry[]> {
  return fetchDevlogEntriesWithCache();
}

// Create a cached version of the fetch function
const fetchDevlogEntriesWithCache = unstable_cache(
  async (): Promise<DevlogEntry[]> => {
    if (!devlogDatabaseId) {
      console.error('Notion devlog database ID is not defined');
      return [];
    }

    try {
      const response = await notion.databases.query({
        database_id: devlogDatabaseId,
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
  },
  ['devlog-entries'], // Cache key
  {
    revalidate: 3600, // Cache for 1 hour (3600 seconds)
    tags: ['devlog-entries'] // Tag for manual revalidation
  }
);

/**
 * Fetches a specific devlog entry by slug with caching
 */
export async function getDevlogEntryBySlug(slug: string): Promise<DevlogEntry | undefined> {
  return fetchDevlogEntryBySlugWithCache(slug);
}

/**
 * Fetches all games from Notion with caching
 */
export async function getGames(): Promise<Game[]> {
  return fetchGamesWithCache();
}

// Create a cached version of the fetch function for games
const fetchGamesWithCache = unstable_cache(
  async (): Promise<Game[]> => {
    if (!gamesDatabaseId) {
      console.error('Notion games database ID is not defined');
      return [];
    }

    try {
      const response = await notion.databases.query({
        database_id: gamesDatabaseId,
        sorts: [
          {
            property: 'Title',
            direction: 'ascending',
          },
        ],
      });

      const games = [];

      for (const page of response.results) {
        const properties = page.properties;
        const pageContent = await getPageBlocks(page.id);

        games.push({
          id: page.id,
          title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
          releaseDate: properties.ReleaseDate?.date?.start || '',
          description: properties.Description?.rich_text?.[0]?.plain_text || '',
          content: pageContent,
          genres: properties.Genres?.multi_select?.map((genre: any) => genre.name) || [],
          platforms: properties.Platforms?.multi_select?.map((platform: any) => platform.name) || [],
          coverImage: properties.CoverImage?.url || properties.CoverImage?.files?.[0]?.file?.url || null,
          slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
          rating: properties.Rating?.number || 0,
          completed: properties.Completed?.checkbox || false,
          playAgain: properties.PlayAgain?.checkbox || false,
          played: properties.Played?.checkbox || false
        });
      }

      return games;
    } catch (error) {
      console.error('Error fetching games from Notion:', error);
      return [];
    }
  },
  ['games'], // Cache key
  {
    revalidate: 3600, // Cache for 1 hour (3600 seconds)
    tags: ['games'] // Tag for manual revalidation
  }
);

/**
 * Fetches a specific game by slug with caching
 */
export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  return fetchGameBySlugWithCache(slug);
}

/**
 * Converts a Game object to GameCardProps format
 */
export function gameToGameCardProps(game: Game): GameCardProps {
  return {
    title: game.title,
    description: game.description,
    imageUrl: game.coverImage,
    rating: game.rating,
    completed: game.completed,
    wouldPlayAgain: game.playAgain,
    played: game.played
  };
}

/**
 * Fetches all games from Notion and converts them to GameCardProps format
 */
export async function getGameCardProps(): Promise<GameCardProps[]> {
  const games = await getGames();
  return games.map(gameToGameCardProps);
}

// Create a cached version of the fetch function for individual games
const fetchGameBySlugWithCache = unstable_cache(
  async (slug: string): Promise<Game | undefined> => {
    if (!gamesDatabaseId) {
      console.error('Notion games database ID is not defined');
      return undefined;
    }

    try {
      const response = await notion.databases.query({
        database_id: gamesDatabaseId,
        filter: {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
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
        releaseDate: properties.ReleaseDate?.date?.start || '',
        description: properties.Description?.rich_text?.[0]?.plain_text || '',
        content: pageContent,
        genres: properties.Genres?.multi_select?.map((genre: any) => genre.name) || [],
        platforms: properties.Platforms?.multi_select?.map((platform: any) => platform.name) || [],
        coverImage: properties.CoverImage?.url || properties.CoverImage?.files?.[0]?.file?.url || '',
        slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
        rating: properties.Rating?.number || 0,
        completed: properties.Completed?.checkbox || false,
        playAgain: properties.PlayAgain?.checkbox || false,
        played: properties.Played?.checkbox || false
      };
    } catch (error) {
      console.error('Error fetching game from Notion:', error);
      return undefined;
    }
  },
  ['game-by-slug'], // Cache key prefix
  {
    revalidate: 3600, // Cache for 1 hour (3600 seconds)
    tags: ['games'] // Tag for manual revalidation
  }
);

// Create a cached version of the fetch function for individual entries
const fetchDevlogEntryBySlugWithCache = unstable_cache(
  async (slug: string): Promise<DevlogEntry | undefined> => {
    if (!devlogDatabaseId) {
      console.error('Notion devlog database ID is not defined');
      return undefined;
    }

    try {
      const response = await notion.databases.query({
        database_id: devlogDatabaseId,
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
  },
  ['devlog-entry-by-slug'], // Cache key prefix
  {
    revalidate: 3600, // Cache for 1 hour (3600 seconds)
    tags: ['devlog-entries'] // Tag for manual revalidation
  }
);
