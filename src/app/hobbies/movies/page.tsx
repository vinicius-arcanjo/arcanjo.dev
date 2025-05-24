import { Metadata } from 'next';
import { MoviesSection } from '@/components/movies-section';

export const metadata: Metadata = {
  title: 'Filmes - Vinícius Arcanjo',
  description: 'Filmes que assisti e recomendo.',
};

export default function MoviesPage() {
  return (
    <main className="space-y-12">
      <h1 className="text-4xl font-bold tracking-tight text-center mt-10">Filmes</h1>
      <section className="space-y-6">
        <MoviesSection />
      </section>
    </main>
  );
}
