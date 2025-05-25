'use client'

import { ProjectCard, ProjectCardProps } from "@/components/project-card";
import { Heading } from '@/components/heading';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from '@/locales/client';
import { createGitHubService } from "@/lib/services/github-service";

export function ProjectsSection() {
  const t = useI18n();
  const [activeTab, setActiveTab] = useState("opensource");
  const [openSourceProjects, setOpenSourceProjects] = useState<ProjectCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const githubService = createGitHubService('vinicius-arcanjo');
        const fetchedProjects = await githubService.getProjects();
        setOpenSourceProjects(fetchedProjects);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch GitHub projects:", err);
        setError("Não foi possível carregar os projetos do GitHub");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

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
          {isLoading && (
            <div className="text-center py-10">
              <p>Carregando projetos...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-10 text-red-500">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && openSourceProjects.length === 0 && (
            <div className="text-center py-10">
              <p>Nenhum projeto encontrado.</p>
            </div>
          )}

          {!isLoading && !error && openSourceProjects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {openSourceProjects.map((project) => (
                <ProjectCard key={project.url} {...project} />
              ))}
            </div>
          )}

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
