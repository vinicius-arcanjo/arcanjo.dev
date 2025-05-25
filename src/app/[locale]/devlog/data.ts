// Sample devlog entries - in a real implementation, these would come from a database or CMS
export interface DevlogEntry {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  slug: string;
}

export const devlogEntries: DevlogEntry[] = [
  {
    id: '1',
    title: 'Iniciando meu site pessoal com Next.js',
    date: '2023-12-15',
    summary: 'Comecei a desenvolver meu site pessoal utilizando Next.js, Tailwind CSS e TypeScript. Neste post, compartilho minha experiência inicial e decisões de arquitetura.',
    content: `
      <p>Decidi finalmente criar meu site pessoal utilizando tecnologias modernas como Next.js, Tailwind CSS e TypeScript. Neste post, compartilho minha experiência inicial e decisões de arquitetura.</p>
      
      <h2>Por que Next.js?</h2>
      <p>Escolhi o Next.js por sua flexibilidade, performance e facilidade de uso. Com o App Router, posso criar rotas facilmente e aproveitar os Server Components para melhorar a performance.</p>
      
      <h2>Estrutura do Projeto</h2>
      <p>Organizei o projeto seguindo as melhores práticas do Next.js:</p>
      <ul>
        <li>app/ - Contém as páginas e rotas da aplicação</li>
        <li>components/ - Componentes reutilizáveis</li>
        <li>lib/ - Funções utilitárias e configurações</li>
      </ul>
      
      <h2>Estilização com Tailwind CSS</h2>
      <p>O Tailwind CSS tem se mostrado extremamente produtivo, permitindo criar interfaces bonitas e responsivas com facilidade. A integração com o Next.js é perfeita.</p>
      
      <h2>Próximos Passos</h2>
      <p>Pretendo continuar expandindo o site, adicionando mais seções e funcionalidades. Também planejo implementar um sistema de blog mais robusto no futuro.</p>
    `,
    tags: ['Next.js', 'React', 'Tailwind CSS'],
    slug: 'iniciando-site-pessoal-nextjs'
  },
  {
    id: '2',
    title: 'Implementando animações com Framer Motion',
    date: '2023-12-20',
    summary: 'Adicionei animações ao meu site utilizando a biblioteca Framer Motion. Aprendi sobre animações de entrada, saída e como criar transições suaves entre estados.',
    content: `
      <p>Adicionei animações ao meu site utilizando a biblioteca Framer Motion. Aprendi sobre animações de entrada, saída e como criar transições suaves entre estados.</p>
      
      <h2>Primeiros passos com Framer Motion</h2>
      <p>A Framer Motion é uma biblioteca poderosa para criar animações em React. Comecei implementando animações simples de fade-in e depois evoluí para animações mais complexas.</p>
      
      <h2>Animações de página</h2>
      <p>Implementei transições suaves entre páginas, melhorando significativamente a experiência do usuário ao navegar pelo site.</p>
      
      <h2>Desafios encontrados</h2>
      <p>O maior desafio foi garantir que as animações funcionassem bem em dispositivos móveis e não afetassem negativamente a performance do site.</p>
    `,
    tags: ['Framer Motion', 'Animações', 'React'],
    slug: 'implementando-animacoes-framer-motion'
  },
  {
    id: '3',
    title: 'Otimizando performance em aplicações Next.js',
    date: '2024-01-05',
    summary: 'Explorei técnicas de otimização de performance em aplicações Next.js, incluindo Server Components, imagens otimizadas e estratégias de carregamento.',
    content: `
      <p>Explorei técnicas de otimização de performance em aplicações Next.js, incluindo Server Components, imagens otimizadas e estratégias de carregamento.</p>
      
      <h2>Server Components</h2>
      <p>Os Server Components do Next.js 13+ permitem renderizar componentes no servidor, reduzindo o JavaScript enviado ao cliente e melhorando o tempo de carregamento inicial.</p>
      
      <h2>Otimização de imagens</h2>
      <p>Utilizei o componente Image do Next.js para otimizar automaticamente as imagens, servindo formatos modernos como WebP e ajustando o tamanho conforme o dispositivo.</p>
      
      <h2>Estratégias de carregamento</h2>
      <p>Implementei lazy loading para componentes não críticos e utilizei o streaming de HTML para melhorar o tempo até a primeira interação.</p>
      
      <h2>Resultados</h2>
      <p>Com essas otimizações, consegui melhorar significativamente as métricas de Core Web Vitals, especialmente o LCP (Largest Contentful Paint) e o CLS (Cumulative Layout Shift).</p>
    `,
    tags: ['Performance', 'Next.js', 'Otimização'],
    slug: 'otimizando-performance-nextjs'
  }
];

// Helper function to find a devlog entry by slug
export function getDevlogEntryBySlug(slug: string): DevlogEntry | undefined {
  return devlogEntries.find(entry => entry.slug === slug);
}
