import { Metadata } from 'next';
import { GamesSection } from '@/components/games-section';
import { Heading } from '@/components/heading';
import { getGameCardProps } from '@/lib/notion';


export const metadata: Metadata = {
  title: 'Games - Vinícius Arcanjo',
  description: 'Meus jogos favoritos e avaliações.',
};

export default async function GamesPage() {
  // Fetch games from Notion
  const games = await getGameCardProps();

  console.log(games)

  return (
    <main className="space-y-12">
      <Heading size="4xl" font="grunge" className="font-bold text-center mt-10">Games</Heading>
      <section className="space-y-6">
        <GamesSection games={games} />
      </section>
    </main>
  );
}
