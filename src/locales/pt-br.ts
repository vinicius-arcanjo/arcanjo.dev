export default {
  // Layout and metadata
  metadata: {
    title: 'Vinícius Arcanjo - Engenheiro de Software',
    description: 'Engenheiro de Software, apaixonado por construir ótimos produtos e resolver problemas complexos.'
  },

  // Header
  header: {
    openMenu: 'Abrir menu',
    name: 'Vinicius A.'
  },

  // Footer
  footer: {
    copyright: 'Direitos Reservados ©'
  },

  // Hero Section
  heroSection: {
    title: 'Vinicius Arcanjo',
    subtitle: 'Open Sourcerer | E2E Developer | Palestrante',
    mvpTitle: 'Microsoft MVP on Developer Technologies',
    maintainer: 'MySQL2 Co-Maintainer e Criador do Poku'
  },

  // Projects Section
  projectsSection: {
    title: 'Projetos',
    tabs: {
      openSource: 'Open Source',
      private: 'Privados'
    },
    viewAll: {
      openSource: 'Ver todos os projetos open source →',
      private: 'Ver todos os projetos privados →'
    },
    projects: {
      portfolio: {
        name: 'meu-portfólio',
        description: 'Meu site pessoal com Next.js, Tailwind e shadcn/ui.'
      },
      githubScraper: {
        name: 'github-scraper',
        description: 'Script para coletar dados públicos do GitHub.'
      }
    }
  },

  // Navigation
  navigation: {
    projects: 'Projetos',
    devlog: 'Devlog',
    about: 'Sobre',
    hobbies: 'Hobbies',
    pandoraBox: 'Caixa de Pandora'
  }
} as const
