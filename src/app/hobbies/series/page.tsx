import { Metadata } from 'next';
import { SeriesSection } from '@/components/series-section';
import { Heading } from '@/components/heading';

export const metadata: Metadata = {
  title: 'Séries - Vinícius Arcanjo',
  description: 'Séries que acompanho e minhas opiniões.',
};

export default function SeriesPage() {
  return (
    <main className="space-y-12">
      <Heading size="4xl" font="stencil" className="font-bold text-center mt-10">Séries</Heading>
      <section className="space-y-6">
        <SeriesSection />
      </section>
    </main>
  );
}
