import { Metadata } from 'next';
import { MoviesSection } from '@/components/movies-section';
import { Title } from '@/components/ui/title';

export const metadata: Metadata = {
  title: 'Filmes - Vinícius Arcanjo',
  description: 'Filmes que assisti e recomendo.',
};

export default function MoviesPage() {
  return (
    <main className="space-y-12">
      <Title size="4xl" font="shadow01" className="font-bold text-center mt-10">Filmes</Title>
      <section className="space-y-6">
        <MoviesSection />
      </section>
    </main>
  );
}
