import { Metadata } from 'next';
import { Code, Lock } from 'lucide-react';
import { Heading } from '@/components/heading';
import { HoverEffect } from '@/components/ui/card-hover-effect';

export const metadata: Metadata = {
  title: 'Projetos - Vinícius Arcanjo',
  description: 'Meus projetos de desenvolvimento de software.',
};

export default function ProjectsPage() {
  const projectItems = [
    {
      title: "Open Source",
      description: "Projetos de código aberto que desenvolvi ou contribuí",
      link: "/projects/opensource",
      icon: <Code className="w-12 h-12" />
    },
    {
      title: "Privados",
      description: "Projetos privados e trabalhos comerciais",
      link: "/projects/private",
      icon: <Lock className="w-12 h-12" />
    }
  ];

  return (
    <main className="space-y-12">
      <Heading size="4xl" font="round" className="text-center mt-10">Meus Projetos</Heading>
      <HoverEffect items={projectItems} className="max-w-5xl mx-auto" variant="outline" />
    </main>
  );
}
