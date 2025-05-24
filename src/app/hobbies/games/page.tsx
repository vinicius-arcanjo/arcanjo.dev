import { Metadata } from 'next';
import { GamesSection } from '@/components/games-section';
import { Title } from '@/components/ui/title';

export const metadata: Metadata = {
  title: 'Games - Vinícius Arcanjo',
  description: 'Meus jogos favoritos e avaliações.',
};

export default function GamesPage() {
  return (
    <main className="space-y-12">
      <Title size="4xl" font="grunge" className="font-bold text-center mt-10">Games</Title>
      <section className="space-y-6">
        <GamesSection />
      </section>
    </main>
  );
}
