import { NotionService } from './notion-service';
import { DevlogEntry } from '@/types/notion';
import { NotionPage } from '@/types/notion-api';

/**
 * Service for handling Notion Devlog entries
 */
export class DevlogService extends NotionService {
  private devlogDatabaseId: string | undefined;

  constructor() {
    super();
    this.devlogDatabaseId = process.env.NOTION_DEVLOG_DATABASE_ID;
  }

  /**
   * Fetches all devlog entries from Notion
   */
  async getDevlogEntries(): Promise<DevlogEntry[]> {
    const filter = {
      property: 'Status',
      select: {
        equals: 'Published'
      }
    };

    const sorts = [
      {
        property: 'Date',
        direction: 'descending',
      },
    ];

    return this.queryDatabaseWithCache<DevlogEntry>(
      this.devlogDatabaseId,
      filter,
      sorts,
      this.mapPageToDevlogEntry.bind(this),
      'devlog-entries',
      ['devlog-entries']
    );
  }

  /**
   * Fetches a specific devlog entry by slug
   */
  async getDevlogEntryBySlug(slug: string): Promise<DevlogEntry | undefined> {
    const additionalFilters = [
      {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      }
    ];

    return this.queryItemBySlugWithCache<DevlogEntry>(
      this.devlogDatabaseId,
      slug,
      additionalFilters,
      this.mapPageToDevlogEntry.bind(this),
      'devlog-entry-by-slug',
      ['devlog-entries']
    );
  }

  /**
   * Maps a Notion page to a DevlogEntry
   */
  private async mapPageToDevlogEntry(page: NotionPage): Promise<DevlogEntry> {
    const properties = page.properties;
    const pageContent = await this.getPageBlocks(page.id);

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
      date: properties.Date?.date?.start || new Date().toISOString().split('T')[0],
      summary: properties.Summary?.rich_text?.[0]?.plain_text || '',
      content: pageContent,
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
    };
  }
}

// Create a singleton instance
export const devlogService = new DevlogService();
