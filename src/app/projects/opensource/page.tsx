import { Metadata } from 'next';
import { Heading } from '@/components/heading';
import { OpenSourceProjectsSection } from '@/components/opensource-projects-section';

export const metadata: Metadata = {
  title: 'Open Source Projects - Vinícius Arcanjo',
  description: 'Projetos de código aberto que desenvolvi ou contribuí.',
};

export default function OpenSourceProjectsPage() {
  return (
    <main className="space-y-12">
      <Heading size="4xl" font="grunge" className="font-bold text-center mt-10">Open Source</Heading>
      <section className="space-y-6">
        <OpenSourceProjectsSection />
      </section>
    </main>
  );
}
