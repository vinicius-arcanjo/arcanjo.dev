import { Metadata } from 'next';
import { AnimeSection } from '@/components/anime-section';
import BentoGridThirdDemo from '@/components/test';
import { Title } from '@/components/ui/title';

export const metadata: Metadata = {
  title: 'Anime - Vinícius Arcanjo',
  description: 'Animes que assisti e recomendo.',
};

export default function AnimePage() {
  return (
    <main className="space-y-12">
      <Title size="8xl" font="outline01" className="text-center mt-10">Anime</Title>
      <section className="space-y-6">
        <AnimeSection />
        {/*<BentoGridThirdDemo />*/}
      </section>
    </main>
  );
}
