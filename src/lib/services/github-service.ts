import { ProjectCardProps } from "@/components/project-card";

/**
 * Service to fetch GitHub projects
 */
export class GitHubService {
  private readonly apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com';
  private readonly username?: string = process.env.GITHUB_USERNAME || 'vinicius-arcanjo';

  constructor(username?: string) {
    this.username = username;
  }

  /**
   * Fetches public repositories for the user with blacklist topic filtering
   */
  async getProjects(): Promise<ProjectCardProps[]> {
    try {
      const response = await fetch(`${this.apiUrl}/users/${this.username}/repos?sort=updated&direction=desc`);

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos = await response.json();

      // Filters repositories that do NOT have the 'not-list' topic
      return repos
        .filter((repo: any) => !(repo.topics || []).includes('not-list'))
        .map((repo: any) => ({
          name: repo.name,
          description: repo.description || 'No description available',
          url: repo.html_url,
          topics: repo.topics || [],
        }));
    } catch (error) {
      console.error('Error fetching GitHub projects:', error);
      return [];
    }
  }
}

/**
 * Creates a GitHub service instance with the specified username
 */
export function createGitHubService(username?: string) {
  return new GitHubService(username);
}
