import { NotionService } from './notion-service';
import { Game } from '@/types/notion';
import { GameCardProps } from '@/components/game-card';
import { NotionPage } from '@/types/notion-api';

/**
 * Service for handling Notion Game entries
 */
export class GamesService extends NotionService {
  private readonly gamesDatabaseId: string | undefined;

  constructor() {
    super();
    this.gamesDatabaseId = process.env.NOTION_GAMES_DATABASE_ID;
  }

  /**
   * Fetches all games from Notion
   */
  async getGames(): Promise<Game[]> {
    const filter = {}; // No filter needed for games

    const sorts = [
      {
        property: 'Title',
        direction: 'ascending',
      },
    ];

    return this.queryDatabaseWithCache<Game>(
      this.gamesDatabaseId,
      filter,
      sorts,
      this.mapPageToGame.bind(this),
      'games',
      ['games']
    );
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
      image: properties.Image?.url || properties.Image?.files?.[0]?.file?.url || null,
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
