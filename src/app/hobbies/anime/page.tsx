import { Metadata } from 'next';
import { AnimeSection } from '@/components/anime-section';

export const metadata: Metadata = {
  title: 'Anime - Vinícius Arcanjo',
  description: 'Animes que assisti e recomendo.',
};

export default function AnimePage() {
  return (
    <main className="space-y-12">
      <h1 className="text-4xl font-bold tracking-tight text-center mt-10">Anime</h1>
      <section className="space-y-6">
        <AnimeSection />
      </section>
    </main>
  );
}
