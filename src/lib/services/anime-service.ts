import { NotionService } from './notion-service';
import { Anime } from '@/types/notion';
import { NotionPage } from '@/types/notion-api';

/**
 * Service for handling Notion Anime entries
 */
export class AnimeService extends NotionService {
  private animeDatabaseId: string | undefined;

  constructor() {
    super();
    this.animeDatabaseId = process.env.NOTION_ANIME_DATABASE_ID;
  }

  /**
   * Fetches all anime from Notion
   */
  async getAnimeList(): Promise<Anime[]> {
    const filter = {}; // No filter needed for anime

    const sorts = [
      {
        property: 'Title',
        direction: 'ascending',
      },
    ];

    return this.queryDatabaseWithCache<Anime>(
      this.animeDatabaseId,
      filter,
      sorts,
      this.mapPageToAnime.bind(this),
      'anime',
      ['anime']
    );
  }

  /**
   * Fetches a specific anime by slug
   */
  async getAnimeBySlug(slug: string): Promise<Anime | undefined> {
    return this.queryItemBySlugWithCache<Anime>(
      this.animeDatabaseId,
      slug,
      [], // No additional filters
      this.mapPageToAnime.bind(this),
      'anime-by-slug',
      ['anime']
    );
  }

  /**
   * Maps a Notion page to an Anime
   */
  private async mapPageToAnime(page: NotionPage): Promise<Anime> {
    const properties = page.properties;
    const pageContent = await this.getPageBlocks(page.id);

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
      releaseDate: properties.ReleaseDate?.date?.start || '',
      description: properties.Description?.rich_text?.[0]?.plain_text || '',
      content: pageContent,
      genres: properties.Genres?.multi_select?.map((genre: { name: any; }) => genre.name) || [],
      studio: properties.Studio?.rich_text?.[0]?.plain_text || '',
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
export const animeService = new AnimeService();
