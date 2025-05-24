// components/projects-section.tsx
import { ProjectCard } from "@/components/project-card";

export function ProjectsSection() {
  const projects = [
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
    <section id="projects" className="space-y-6">
      <h2 className="text-2xl font-bold">Projetos</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.url} {...project} />
        ))}
      </div>
    </section>
  );
}
