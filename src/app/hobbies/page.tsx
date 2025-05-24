import { Metadata } from 'next';
import { GamesSection } from '@/components/games-section';

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
      </section>
    </main>
  );
}
