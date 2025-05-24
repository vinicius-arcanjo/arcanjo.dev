import { Metadata } from 'next';
import { GamesSection } from '@/components/games-section';

export const metadata: Metadata = {
  title: 'Games - Vinícius Arcanjo',
  description: 'Meus jogos favoritos e avaliações.',
};

export default function GamesPage() {
  return (
    <main className="space-y-12">
      <h1 className="text-4xl font-bold tracking-tight text-center mt-10">Games</h1>
      <section className="space-y-6">
        <GamesSection />
      </section>
    </main>
  );
}
