export default {
  // Layout and metadata
  metadata: {
    title: 'Vinícius Arcanjo - Software Engineer',
    description: 'Software Engineer, passionate about building great products and solving complex problems.'
  },

  // Header
  header: {
    openMenu: 'Open menu',
    name: 'Vinicius A.'
  },

  // Footer
  footer: {
    copyright: 'All Rights Reserved ©'
  },

  // Hero Section
  heroSection: {
    title: 'Vinicius Arcanjo',
    subtitle: 'Open Sourcerer | E2E Developer | Speaker',
    mvpTitle: 'Microsoft MVP on Developer Technologies',
    maintainer: 'MySQL2 Co-Maintainer and Creator of Poku'
  },

  // Projects Section
  projectsSection: {
    title: 'Projects',
    tabs: {
      openSource: 'Open Source',
      private: 'Private'
    },
    viewAll: {
      openSource: 'View all open source projects →',
      private: 'View all private projects →'
    },
    projects: {
      portfolio: {
        name: 'my-portfolio',
        description: 'My personal website with Next.js, Tailwind and shadcn/ui.'
      },
      githubScraper: {
        name: 'github-scraper',
        description: 'Script to collect public data from GitHub.'
      }
    }
  },

  // Navigation
  navigation: {
    projects: 'Projects',
    devlog: 'Devlog',
    about: 'About',
    hobbies: 'Hobbies',
    pandoraBox: 'Pandora\'s Box'
  }
} as const
