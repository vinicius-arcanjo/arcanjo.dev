import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Heading } from '@/components/heading';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { getDevlogEntryBySlug } from '@/lib/notion';
import '@/styles/notion.css';

// Generate metadata for the page dynamically based on the slug
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const entry = await getDevlogEntryBySlug(resolvedParams.slug);

  if (!entry) {
    return {
      title: 'Post não encontrado - Devlog',
      description: 'O post solicitado não foi encontrado.'
    };
  }

  return {
    title: `${entry.title} - Devlog`,
    description: entry.content.substring(0, 160).replace(/<[^>]*>/g, '') + '...'
  };
}

export default async function DevlogPostPage({ params }: { params: { slug: string } }) {
  const entry = await getDevlogEntryBySlug(params.slug);

  // If the entry doesn't exist, show a 404 page
  if (!entry) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/devlog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" />
        Voltar para o Devlog
      </Link>

      <article className="space-y-8">
        <header className="space-y-4">
          <Heading size="4xl" font="round">{entry.title}</Heading>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(entry.date).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
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
        </header>

        <div
          className="prose prose-zinc dark:prose-invert max-w-none notion-content"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />
      </article>
    </main>
  );
}
