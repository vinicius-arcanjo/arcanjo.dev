import { NotionService } from './notion-service';
import { Game } from '@/types/notion';
import { GameCardProps } from '@/components/game-card';
import { NotionDatabaseQueryResponse, NotionPage } from '@/types/notion-api';

/**
 * Service for handling Notion Game entries
 */
export class GamesService extends NotionService {
  private readonly gamesDatabaseId: string | undefined;

  constructor() {
    super();
    // Get the database ID from environment variables
    const rawDatabaseId = process.env.NOTION_GAMES_DATABASE_ID;

    // Format the database ID if needed (add hyphens if they're missing)
    if (rawDatabaseId && !rawDatabaseId.includes('-')) {
      // Convert "1fee5e41c76f801fad0dc0b6c9d021bf" to "1fee5e41-c76f-801f-ad0d-c0b6c9d021bf"
      this.gamesDatabaseId = [
        rawDatabaseId.substring(0, 8),
        rawDatabaseId.substring(8, 12),
        rawDatabaseId.substring(12, 16),
        rawDatabaseId.substring(16, 20),
        rawDatabaseId.substring(20)
      ].join('-');
    } else {
      this.gamesDatabaseId = rawDatabaseId;
    }
  }

  /**
   * Extracts the image URL from a Notion property
   * Handles different possible structures for the Image property
   */
  private extractImageUrl(imageProperty: any): string | undefined {
    if (!imageProperty) return undefined;

    // Case 1: Direct URL property
    if (imageProperty.url) {
      return imageProperty.url;
    }

    // Case 2: Files array with file objects
    if (imageProperty.files && Array.isArray(imageProperty.files) && imageProperty.files.length > 0) {
      const file = imageProperty.files[0];

      // External file
      if (file.type === 'external' && file.external && file.external.url) {
        return file.external.url;
      }

      // Uploaded file
      if (file.type === 'file' && file.file && file.file.url) {
        return file.file.url;
      }
    }

    // Case 3: Direct file object
    if (imageProperty.type === 'external' && imageProperty.external && imageProperty.external.url) {
      return imageProperty.external.url;
    }

    if (imageProperty.type === 'file' && imageProperty.file && imageProperty.file.url) {
      return imageProperty.file.url;
    }

    console.log('Could not extract image URL from property');
    return undefined;
  }

  /**
   * Fetches all games from Notion
   */
  async getGames(): Promise<Game[]> {
    if (!this.gamesDatabaseId) {
      console.error('Games database ID is not defined');
      return [];
    }

    try {
      const response = await this.notion.databases.query({
        database_id: this.gamesDatabaseId,
        sorts: [
          {
            property: 'Title',
            direction: 'ascending',
          },
        ],
      }) as NotionDatabaseQueryResponse;

      const items: Game[] = [];
      for (const page of response.results) {
        const item = await this.mapPageToGame(page);
        items.push(item);
      }

      return items;
    } catch (error) {
      console.error('Error fetching games directly from Notion:', error);

      // Log more detailed error information
      if (error instanceof Error) {
        console.error(`Error name: ${error.name}`);
        console.error(`Error message: ${error.message}`);
        console.error(`Error stack: ${error.stack}`);
      }

      return [];
    }
  }

  /**
   * Fetches a specific game by slug
   */
  async getGameBySlug(slug: string): Promise<Game | undefined> {
    return this.queryItemBySlugWithCache<Game>(
      this.gamesDatabaseId,
      slug,
      [], // No additional filters
      this.mapPageToGame.bind(this),
      'game-by-slug',
      ['games']
    );
  }

  /**
   * Converts a Game object to GameCardProps format
   */
  gameToGameCardProps(game: Game): GameCardProps {
    return {
      title: game.title,
      description: game.description,
      imageUrl: game.image,
      rating: game.rating,
      completed: game.completed,
      wouldPlayAgain: game.playAgain,
      played: game.played
    };
  }

  /**
   * Fetches all games from Notion and converts them to GameCardProps format
   */
  async getGameCardProps(): Promise<GameCardProps[]> {
    const games = await this.getGames();
    return games.map(this.gameToGameCardProps);
  }

  /**
   * Maps a Notion page to a Game
   */
  private async mapPageToGame(page: NotionPage): Promise<Game> {
    const properties = page.properties;

    const pageContent = await this.getPageBlocks(page.id);

    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
      releaseDate: properties.ReleaseDate?.date?.start || '',
      description: properties.Description?.rich_text?.[0]?.plain_text || '',
      content: pageContent,
      genres: properties.Genres?.multi_select?.map((genre: any) => genre.name) || [],
      platforms: properties.Platforms?.multi_select?.map((platform: any) => platform.name) || [],
      image: this.extractImageUrl(properties.Image),
      slug: properties.Slug?.rich_text?.[0]?.plain_text || page.id,
      rating: properties.Rating?.number || 0,
      completed: properties.Completed?.checkbox || false,
      playAgain: properties.PlayAgain?.checkbox || false,
      played: properties.Played?.checkbox || false
    };
  }
}

// Create a singleton instance
export const gamesService = new GamesService();
