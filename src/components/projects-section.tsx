'use client'

import { ProjectCard } from "@/components/project-card";
import { Heading } from '@/components/heading';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import Link from "next/link";
import { useI18n } from '@/locales/client';

export function ProjectsSection() {
  const t = useI18n();
  const [activeTab, setActiveTab] = useState("opensource");

  const openSourceProjects = [
    {
      name: t('projectsSection.projects.portfolio.name'),
      description: t('projectsSection.projects.portfolio.description'),
      url: "https://github.com/seuusuario/meu-portfolio",
      topics: ["nextjs", "tailwind", "typescript"],
    },
    {
      name: t('projectsSection.projects.githubScraper.name'),
      description: t('projectsSection.projects.githubScraper.description'),
      url: "https://github.com/seuusuario/github-scraper",
      topics: ["crawler", "github-api"],
    },
  ];

  const privateProjects: any[] = [
    // Will be populated later
  ];

  return (
    <section id="projects" className="space-y-6">
      <Heading as='h2' size='xl' className='font-bold uppercase' variant='underline'>{t('projectsSection.title')}</Heading>

      <Tabs defaultValue="opensource" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="opensource">{t('projectsSection.tabs.openSource')}</TabsTrigger>
          <TabsTrigger value="private">{t('projectsSection.tabs.private')}</TabsTrigger>
        </TabsList>
        <TabsContent value="opensource" className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {openSourceProjects.map((project) => (
              <ProjectCard key={project.url} {...project} />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link href="/projects/opensource" className="text-primary hover:underline">
              {t('projectsSection.viewAll.openSource')}
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
              {t('projectsSection.viewAll.private')}
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
