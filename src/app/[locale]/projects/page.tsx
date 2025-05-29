import { Metadata } from 'next';
import { Code, Lock } from 'lucide-react';
import { Heading } from '@/components/heading';
import { CardHoverEffect } from '@/components/ui/card-hover-effect';

// Force static generation for this page
export const dynamic = 'force-static';
export const revalidate = false; // Never revalidate, use build time data

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
    <main>
      <Heading size="8xl" font="minimal" className="text-center mt-10">Projetos</Heading>
      <CardHoverEffect items={projectItems} className="max-w-5xl mx-auto" variant="outline" />
    </main>
  );
}
