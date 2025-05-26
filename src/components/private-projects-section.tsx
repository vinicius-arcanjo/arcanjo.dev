'use client'

import { ProjectCard } from "@/components/project-card";
import { Heading } from '@/components/heading';
import { privateProjects as privateProjectsData } from "@/lib/data/private-projects";

export function PrivateProjectsSection() {

  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Projetos privados e trabalhos comerciais que desenvolvi para clientes e empresas.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {privateProjectsData.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}
