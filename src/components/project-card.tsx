import { ExternalLink } from "lucide-react";

export interface ProjectCardProps {
  name: string;
  description: string;
  url: string;
  topics?: string[];
}

export function ProjectCard({ name, description, url, topics = [] }: ProjectCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-xl p-4 hover:shadow transition space-y-2"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{name}</h3>
        <ExternalLink className="w-4 h-4" />
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {topics.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-muted px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
