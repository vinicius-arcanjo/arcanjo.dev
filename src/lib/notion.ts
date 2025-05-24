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
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    return response.results.map((page: any) => {
      const properties = page.properties;

      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
        summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
        content: properties.Content?.rich_text?.[0]?.plain_text || '',
        tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
      };
    });
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

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
      date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
      summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
      content: properties.Content?.rich_text?.[0]?.plain_text || '',
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
    };
  } catch (error) {
    console.error('Error fetching devlog entry from Notion:', error);
    return undefined;
  }
}
