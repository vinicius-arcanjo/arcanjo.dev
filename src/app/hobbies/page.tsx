import { Metadata } from 'next';
import { GamesSection } from '@/components/games-section';
// import { GameCard } from '@/components/game-card';

export const metadata: Metadata = {
  title: 'Hobbies - Vinícius Arcanjo',
  description: 'Meus hobbies e interesses pessoais.',
};

export default function HobbiesPage() {
  return (
    <main className="space-y-12">
      <h1 className="text-3xl font-bold">Games</h1>
      <section className="space-y-6">
        <GamesSection />
        {/*<GameCard*/}
        {/*  title="The Legend of Zelda: Breath of the Wild"*/}
        {/*  description="Explore um vasto mundo em uma das aventuras mais épicas já criadas."*/}
        {/*  imageUrl="https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png"*/}
        {/*  rating={4.9}*/}
        {/*  completed={true}*/}
        {/*  wouldPlayAgain={true}*/}
        {/*  played={true}*/}
        {/*/>*/}

      </section>
    </main>
  );
}
