'use client'

import { ProjectCard } from "@/components/project-card";
import { Heading } from '@/components/heading';

export function OpenSourceProjectsSection() {
  const openSourceProjects = [
    {
      name: "meu-portfólio",
      description: "Meu site pessoal com Next.js, Tailwind e shadcn/ui.",
      url: "https://github.com/seuusuario/meu-portfolio",
      topics: ["nextjs", "tailwind", "typescript"],
    },
    {
      name: "github-scraper",
      description: "Script para coletar dados públicos do GitHub.",
      url: "https://github.com/seuusuario/github-scraper",
      topics: ["crawler", "github-api"],
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Projetos de código aberto que desenvolvi ou contribuí. Todos estão disponíveis no GitHub.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {openSourceProjects.map((project) => (
          <ProjectCard key={project.url} {...project} />
        ))}
      </div>
    </div>
  );
}
