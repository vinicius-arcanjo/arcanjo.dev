import { NotionService } from './notion-service';
import { Movie } from '@/types/notion';
import { NotionPage } from '@/types/notion-api';

/**
 * Service for handling Notion Movie entries
 */
export class MovieService extends NotionService {
  private moviesDatabaseId: string | undefined;

  constructor() {
    super();
    this.moviesDatabaseId = process.env.NOTION_MOVIES_DATABASE_ID;
  }

  /**
   * Fetches all movies from Notion
   */
  async getMovies(): Promise<Movie[]> {
    const filter = {}; // No filter needed for movies

    const sorts = [
      {
        property: 'Title',
        direction: 'ascending',
      },
    ];

    return this.queryDatabaseWithCache<Movie>(
      this.moviesDatabaseId,
      filter,
      sorts,
      this.mapPageToMovie.bind(this),
      'movies',
      ['movies']
    );
  }

  /**
   * Fetches a specific movie by slug
   */
  async getMovieBySlug(slug: string): Promise<Movie | undefined> {
    return this.queryItemBySlugWithCache<Movie>(
      this.moviesDatabaseId,
      slug,
      [], // No additional filters
      this.mapPageToMovie.bind(this),
      'movie-by-slug',
      ['movies']
    );
  }

  /**
   * Maps a Notion page to a Movie
   */
  private async mapPageToMovie(page: NotionPage): Promise<Movie> {
    const properties = page.properties;
    const pageContent = await this.getPageBlocks(page.id);

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
      releaseDate: properties.ReleaseDate?.date?.start || '',
      description: properties.Description?.rich_text?.[0]?.plain_text || '',
      content: pageContent,
      genres: properties.Genres?.multi_select?.map((genre: any) => genre.name) || [],
      director: properties.Director?.rich_text?.[0]?.plain_text || '',
      image: properties.Image?.url || properties.Image?.files?.[0]?.file?.url || null,
      slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
      rating: properties.Rating?.number || 0,
      watched: properties.Watched?.checkbox || false,
      wouldWatchAgain: properties.WouldWatchAgain?.checkbox || false
    };
  }
}

// Create a singleton instance
export const movieService = new MovieService();
