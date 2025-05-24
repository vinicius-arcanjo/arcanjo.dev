'use client'

import { ProjectCard } from "@/components/project-card";
import { Heading } from '@/components/heading';

export function PrivateProjectsSection() {
  const privateProjects = [
    {
      name: "E-commerce Platform",
      description: "Plataforma de e-commerce completa com gestão de produtos, pedidos e clientes.",
      url: "#",
      topics: ["react", "node.js", "mongodb"],
    },
    {
      name: "CRM System",
      description: "Sistema de gestão de relacionamento com clientes para empresa de tecnologia.",
      url: "#",
      topics: ["angular", "express", "postgresql"],
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Projetos privados e trabalhos comerciais que desenvolvi para clientes e empresas.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        {privateProjects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
}
