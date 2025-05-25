import { NotionService } from './notion-service';
import { Series } from '@/types/notion';
import { NotionPage } from '@/types/notion-api';

/**
 * Service for handling Notion Series entries
 */
export class SeriesService extends NotionService {
  private seriesDatabaseId: string | undefined;

  constructor() {
    super();
    this.seriesDatabaseId = process.env.NOTION_SERIES_DATABASE_ID;
  }

  /**
   * Fetches all series from Notion
   */
  async getAllSeries(): Promise<Series[]> {
    const filter = {}; // No filter needed for series

    const sorts = [
      {
        property: 'Title',
        direction: 'ascending',
      },
    ];

    return this.queryDatabaseWithCache<Series>(
      this.seriesDatabaseId,
      filter,
      sorts,
      this.mapPageToSeries.bind(this),
      'series',
      ['series']
    );
  }

  /**
   * Fetches a specific series by slug
   */
  async getSeriesBySlug(slug: string): Promise<Series | undefined> {
    return this.queryItemBySlugWithCache<Series>(
      this.seriesDatabaseId,
      slug,
      [], // No additional filters
      this.mapPageToSeries.bind(this),
      'series-by-slug',
      ['series']
    );
  }

  /**
   * Maps a Notion page to a Series
   */
  private async mapPageToSeries(page: NotionPage): Promise<Series> {
    const properties = page.properties;
    const pageContent = await this.getPageBlocks(page.id);

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
      releaseDate: properties.ReleaseDate?.date?.start || '',
      description: properties.Description?.rich_text?.[0]?.plain_text || '',
      content: pageContent,
      genres: properties.Genres?.multi_select?.map((genre: any) => genre.name) || [],
      creator: properties.Creator?.rich_text?.[0]?.plain_text || '',
      image: properties.Image?.url || properties.Image?.files?.[0]?.file?.url || null,
      slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
      rating: properties.Rating?.number || 0,
      watched: properties.Watched?.checkbox || false,
      completed: properties.Completed?.checkbox || false,
      seasons: properties.Seasons?.number || 0
    };
  }
}

// Create a singleton instance
export const seriesService = new SeriesService();
