import { Metadata } from 'next';
import { GamesSection } from '@/components/games-section';

export const metadata: Metadata = {
  title: 'Hobbies - Vinícius Arcanjo',
  description: 'Meus hobbies e interesses pessoais.',
};

export default function HobbiesPage() {
  return (
    <main className="space-y-12">
      <h1 className="text-3xl font-bold">Hobbies</h1>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Jogos</h2>
        <p className="text-muted-foreground">
          Aqui você encontrará os jogos que já joguei e os que pretendo jogar, com minhas avaliações pessoais.
        </p>

        <GamesSection />
      </section>
    </main>
  );
}
