import { Metadata } from 'next';
import { Heading } from '@/components/heading';
import { Scroll, Calendar, Tag } from 'lucide-react';
import { getDevlogEntries } from '@/lib/notion';

// Force static generation for this page
export const dynamic = 'force-static';
export const revalidate = false; // Never revalidate, use build time data

export const metadata: Metadata = {
  title: 'Devlog - Vinícius Arcanjo',
  description: 'Meu diário de desenvolvimento e aprendizados em programação.',
};

export default async function DevlogPage() {
  const devlogEntries = await getDevlogEntries();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <header className="text-center space-y-4">
        <Scroll className="w-16 h-16 mx-auto text-primary" />
        <Heading size="4xl" font="round" className="text-center">Devlog</Heading>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meu diário de desenvolvimento onde compartilho aprendizados, desafios e conquistas na minha jornada como desenvolvedor.
        </p>
      </header>

      <section className="space-y-8">
        {devlogEntries.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhuma entrada encontrada no devlog.</p>
        ) : (
          devlogEntries.map((entry) => (
            <article
              key={entry.id}
              className="border rounded-lg p-6 hover:bg-muted/50 transition-colors"
            >
              <h2 className="text-2xl font-semibold hover:text-primary transition-colors">
                <a href={`/devlog/${entry.slug}`}>{entry.title}</a>
              </h2>

              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(entry.date).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <p className="mt-4">{entry.summary}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4">
                <a
                  href={`/devlog/${entry.slug}`}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Ler mais →
                </a>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
