# Arcanjo

Arcanjo is a personal website/portfolio built with Next.js that showcases projects, hobbies, and a developer log (devlog) with various integrations including Notion and GitHub.

## Features

- **Internationalization**: Multi-language support using next-international
- **Theme Support**: Light and dark mode using next-themes
- **Projects Section**: Showcase of personal projects with GitHub integration
- **Hobbies Section**: Display of personal interests including:
  - Anime
  - Movies
  - TV Series
  - Games
- **Developer Log (Devlog)**: Blog-like section powered by Notion integration
- **Responsive Design**: Built with Tailwind CSS for a responsive layout

## Technologies Used

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI components
- **Notion API**: For content management
- **GitHub API**: For project information
- **next-international**: For internationalization
- **next-themes**: For theme management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/arcanjo.git
   cd arcanjo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the necessary environment variables (see Environment Variables section below).

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Notion Integration
NOTION_API_KEY=your_notion_api_key
NOTION_DEVLOG_DATABASE_ID=your_notion_database_id

# GitHub Integration
GITHUB_TOKEN=your_github_token
```

See the env.exemple file for a complete list of required environment variables.

## Notion Integration for Devlog

### Configuration

1. Create a Notion integration:
   - Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
   - Click on "New integration"
   - Name your integration (e.g., "Arcanjo Devlog")
   - Select the workspace where your devlog database is located
   - Click on "Submit"
   - Copy the "Internal Integration Token" (this will be your `NOTION_API_KEY`)

2. Create a Notion database for the devlog with the following properties:
   - Title (title): Type "Title"
   - Date (data): Type "Date"
   - Summary (resumo): Type "Text"
   - Content (conteúdo): Type "Text" (for HTML content)
   - Tags: Type "Multi-select"
   - Slug: Type "Text" (for friendly URLs)

3. Share the database with your integration:
   - Open the database in Notion
   - Click on "Share" in the top right corner
   - Click on "Invite" and select your integration from the list

4. Get the database ID:
   - Open the database in Notion
   - Copy the ID from the URL: `https://www.notion.so/{workspace_name}/{database_id}?v={view_id}`
   - The ID is the part between the workspace name and the "?v" parameter

5. Add the environment variables to your `.env.local` file:
   ```
   NOTION_API_KEY=your_integration_token
   NOTION_DEVLOG_DATABASE_ID=your_database_id
   ```

### Usage

To add new entries to the devlog, simply create new items in your Notion database. The entries will be automatically displayed on the website after an update.

Each entry should have:
- A title
- A date
- A summary
- HTML content
- Tags (optional)
- A unique slug for the URL

## Project Structure

- `src/app/[locale]`: Contains the main pages and routes with locale support
- `src/components`: Reusable UI components
- `src/lib/services`: Service integrations (Notion, GitHub, etc.)
- `src/locales`: Internationalization files
- `src/styles`: CSS and styling files
- `src/types`: TypeScript type definitions

## License

This project is licensed under the MIT License - see the LICENSE file for details.
