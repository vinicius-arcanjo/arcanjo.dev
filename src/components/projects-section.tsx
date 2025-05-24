'use client'

import { ProjectCard } from "@/components/project-card";
import { Heading } from '@/components/heading';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import Link from "next/link";

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("opensource");

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

  const privateProjects: any[] = [
    // Will be populated later
  ];

  return (
    <section id="projects" className="space-y-6">
      <Heading as='h2' size='xl' className='font-bold uppercase' variant='underline'>Projetos</Heading>

      <Tabs defaultValue="opensource" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="opensource">Open Source</TabsTrigger>
          <TabsTrigger value="private">Privados</TabsTrigger>
        </TabsList>
        <TabsContent value="opensource" className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {openSourceProjects.map((project) => (
              <ProjectCard key={project.url} {...project} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/projects/opensource" className="text-primary hover:underline">
              Ver todos os projetos open source →
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="private" className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {privateProjects.map((project) => (
              <ProjectCard key={project.url} {...project} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/projects/private" className="text-primary hover:underline">
              Ver todos os projetos privados →
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
