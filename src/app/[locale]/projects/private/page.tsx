import { Metadata } from 'next';
import { Heading } from '@/components/heading';
import { PrivateProjectsSection } from '@/components/private-projects-section';

export const metadata: Metadata = {
  title: 'Private Projects - Vinícius Arcanjo',
  description: 'Projetos privados e trabalhos comerciais.',
};

export default function PrivateProjectsPage() {
  return (
    <main className="space-y-12">
      <Heading size="4xl" font="grunge" className="font-bold text-center mt-10">Privados</Heading>
      <section className="space-y-6">
        <PrivateProjectsSection />
      </section>
    </main>
  );
}
