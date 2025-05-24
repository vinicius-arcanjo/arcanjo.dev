import { Metadata } from 'next';
import Link from 'next/link';
import { Code, Lock } from 'lucide-react';
import { Heading } from '@/components/heading';

export const metadata: Metadata = {
  title: 'Projetos - Vinícius Arcanjo',
  description: 'Meus projetos de desenvolvimento de software.',
};

export default function ProjectsPage() {
  return (
    <main className="space-y-12">
      <Heading size="4xl" font="round" className="text-center mt-10">Meus Projetos</Heading>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/projects/opensource"
          className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
        >
          <Code className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold">Open Source</h2>
          <p className="text-center text-muted-foreground mt-2">
            Projetos de código aberto que desenvolvi ou contribuí
          </p>
        </Link>

        <Link
          href="/projects/private"
          className="flex flex-col items-center p-6 border rounded-lg hover:bg-muted transition-colors"
        >
          <Lock className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold">Privados</h2>
          <p className="text-center text-muted-foreground mt-2">
            Projetos privados e trabalhos comerciais
          </p>
        </Link>
      </section>
    </main>
  );
}
