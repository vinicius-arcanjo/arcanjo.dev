'use client'

import { useEffect, useState } from "react";
import { ProjectCard, ProjectCardProps } from "@/components/project-card";
import { createGitHubService } from "@/lib/services/github-service";

export function OpenSourceProjectsSection() {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const githubService = createGitHubService('vinicius-arcanjo');
        const fetchedProjects = await githubService.getProjects();
        setProjects(fetchedProjects);
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

  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Projetos de código aberto que desenvolvi ou contribuí. Todos estão disponíveis no GitHub.
      </p>

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

      {!isLoading && !error && projects.length === 0 && (
        <div className="text-center py-10">
          <p>Nenhum projeto encontrado.</p>
        </div>
      )}

      {!isLoading && !error && projects.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.url} {...project} />
          ))}
        </div>
      )}
    </div>
  );
}
