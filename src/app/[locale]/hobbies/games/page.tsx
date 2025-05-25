import { Metadata } from 'next';
import { GamesSection } from '@/components/games-section';
import { Heading } from '@/components/heading';
import { getGameCardProps } from '@/lib/notion/notion';


export const metadata: Metadata = {
  title: 'Games - Vinícius Arcanjo',
  description: 'Meus jogos favoritos e avaliações.',
};

export default async function GamesPage() {
  // Fetch games from Notion
  const games = await getGameCardProps();

  return (
    <main className="space-y-12">
      <Heading size="8xl" font="grunge" className="text-center mt-10">Games</Heading>
      <section className="space-y-6">
        <GamesSection games={games} />
      </section>
    </main>
  );
}
