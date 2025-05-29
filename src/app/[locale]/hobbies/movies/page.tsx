import { Metadata } from 'next';
import { MoviesSection } from '@/components/movies-section';
import { Heading } from '@/components/heading';

export const metadata: Metadata = {
  title: 'Filmes - Vinícius Arcanjo',
  description: 'Filmes que assisti e recomendo.',
};

export default function MoviesPage() {
  return (
    <main className="space-y-12">
      <Heading size="4xl" font="shadow01" className="font-bold text-center mt-10">Filmes</Heading>
      <section className="space-y-6">
        <MoviesSection />
      </section>
    </main>
  );
}
