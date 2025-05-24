import { Metadata } from 'next';
import { SeriesSection } from '@/components/series-section';
import { Title } from '@/components/ui/title';

export const metadata: Metadata = {
  title: 'Séries - Vinícius Arcanjo',
  description: 'Séries que acompanho e minhas opiniões.',
};

export default function SeriesPage() {
  return (
    <main className="space-y-12">
      <Title size="4xl" font="stencil" className="font-bold text-center mt-10">Séries</Title>
      <section className="space-y-6">
        <SeriesSection />
      </section>
    </main>
  );
}
