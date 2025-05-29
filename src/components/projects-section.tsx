'use client'

import { ProjectCard, ProjectCardProps } from "@/components/project-card";
import { Heading } from '@/components/heading';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from '@/locales/client';
import { createGitHubService } from "@/lib/services/github-service";
import { privateProjects as privateProjectsData } from "@/lib/data/private-projects";

export function ProjectsSection() {
  const t = useI18n();
  const [activeTab, setActiveTab] = useState("opensource");
  const [openSourceProjects, setOpenSourceProjects] = useState<ProjectCardProps[]>([]);
  const [privateProjects] = useState<ProjectCardProps[]>(privateProjectsData);
  const [isLoadingOpenSource, setIsLoadingOpenSource] = useState(true);
  const [errorOpenSource, setErrorOpenSource] = useState<string | null>(null);
  const [isLoadingPrivate] = useState(false); // No need to load private projects initially

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoadingOpenSource(true);
        const githubService = createGitHubService('vinicius-arcanjo');
        const fetchedProjects = await githubService.getProjects();
        setOpenSourceProjects(fetchedProjects);
        setErrorOpenSource(null);
      } catch (err) {
        console.error("Failed to fetch GitHub projects:", err);
        setErrorOpenSource("Não foi possível carregar os projetos do GitHub");
      } finally {
        setIsLoadingOpenSource(false);
      }
    }

    fetchProjects().then(r => r);
  }, []);


  return (
    <section id="projects" className="space-y-6">
      <Heading as='h2' size='xl' className='font-bold uppercase' variant='underline'>{t('projectsSection.title')}</Heading>

      <Tabs defaultValue="opensource" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="opensource">{t('projectsSection.tabs.openSource')}</TabsTrigger>
          <TabsTrigger value="private">{t('projectsSection.tabs.private')}</TabsTrigger>
        </TabsList>
        <TabsContent value="opensource" className="mt-6">
          {isLoadingOpenSource && (
            <div className="text-center py-10">
              <p>Carregando projetos...</p>
            </div>
          )}

          {errorOpenSource && (
            <div className="text-center py-10 text-red-500">
              <p>{errorOpenSource}</p>
            </div>
          )}

          {!isLoadingOpenSource && !errorOpenSource && openSourceProjects.length === 0 && (
            <div className="text-center py-10">
              <p>Nenhum projeto encontrado.</p>
            </div>
          )}

          {!isLoadingOpenSource && !errorOpenSource && openSourceProjects.length > 0 && (
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
          {isLoadingPrivate && (
            <div className="text-center py-10">
              <p>Carregando projetos...</p>
            </div>
          )}

          {privateProjects.length === 0 && !isLoadingPrivate && (
            <div className="text-center py-10">
              <p>Nenhum projeto encontrado.</p>
            </div>
          )}

          {privateProjects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {privateProjects.map((project) => (
                <ProjectCard key={project.name} {...project} />
              ))}
            </div>
          )}

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
