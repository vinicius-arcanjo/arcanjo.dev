/**
 * This file re-exports the services from the services directory
 * to maintain backward compatibility with existing code.
 *
 * For new code, it's recommended to import directly from the services.
 */
import { devlogService } from '@/lib/services/devlog-service';
import { gamesService } from '@/lib/services/games-service';

// Re-export the services
export { devlogService, gamesService };

// Re-export the methods from the devlog service
export const getDevlogEntries = () => devlogService.getDevlogEntries();
export const getDevlogEntryBySlug = (slug: string) => devlogService.getDevlogEntryBySlug(slug);

// Re-export the methods from the game service
export const getGames = () => gamesService.getGames();
export const getGameBySlug = (slug: string) => gamesService.getGameBySlug(slug);
export const gameToGameCardProps = (game: any) => gamesService.gameToGameCardProps(game);
export const getGameCardProps = () => gamesService.getGameCardProps();
