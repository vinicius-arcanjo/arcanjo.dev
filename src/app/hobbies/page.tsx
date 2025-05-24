import { Metadata } from 'next';
import Link from 'next/link';
import { Gamepad2, Film, Tv, Clapperboard } from 'lucide-react';
import { Title } from '@/components/ui/title';

export const metadata: Metadata = {
  title: 'Hobbies - Vinícius Arcanjo',
  description: 'Meus hobbies e interesses pessoais.',
};

export default function HobbiesPage() {
  return (
    <main className="space-y-12">
      <Title size="4xl" font="round" className="font-bold text-center mt-10">Meus Hobbies</Title>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/hobbies/games"
          className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
        >
          <Gamepad2 className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold">Games</h2>
          <p className="text-center text-muted-foreground mt-2">
            Meus jogos favoritos e avaliações
          </p>
        </Link>

        <Link
          href="/hobbies/movies"
          className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
        >
          <Film className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold">Filmes</h2>
          <p className="text-center text-muted-foreground mt-2">
            Filmes que assisti e recomendo
          </p>
        </Link>

        <Link
          href="/hobbies/series"
          className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
        >
          <Tv className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold">Séries</h2>
          <p className="text-center text-muted-foreground mt-2">
            Séries que acompanho e minhas opiniões
          </p>
        </Link>

        <Link
          href="/hobbies/anime"
          className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
        >
          <Clapperboard className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold">Anime</h2>
          <p className="text-center text-muted-foreground mt-2">
            Animes que assisti e recomendo
          </p>
        </Link>
      </section>
    </main>
  );
}
