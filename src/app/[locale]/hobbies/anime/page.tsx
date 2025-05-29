import { Metadata } from 'next';
import { AnimeSection } from '@/components/anime-section';
import { Heading } from '@/components/heading';

export const metadata: Metadata = {
  title: 'Anime - Vinícius Arcanjo',
  description: 'Animes que assisti e recomendo.',
};

export default function AnimePage() {
  return (
    <main className="space-y-12">
      <Heading size="8xl" font="stencil" className="text-center mt-10">Animes</Heading>
      <section className="space-y-6">
        <AnimeSection />
      </section>
    </main>
  );
}
