import { ArrowUpRight, Code2 } from 'lucide-react';
import Link from 'next/link';

import { TechStackList } from '@/components/shared/tech-stack-list';
import type { ProjectItem } from '@/types/content';

type ProjectCardProps = {
  project: ProjectItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border-border bg-surface flex h-full flex-col rounded-2xl border p-6 sm:p-7">
      <p className="text-subtle-foreground text-xs font-semibold tracking-wide uppercase">
        {project.category}
      </p>
      <h3 className="text-surface-foreground text-lg font-semibold">
        {project.title}
      </h3>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
        {project.description}
      </p>
      <p className="text-surface-foreground mt-4 text-sm font-medium">
        {project.impact}
      </p>

      <div className="mt-5">
        <TechStackList items={project.stack} />
      </div>

      <div className="mt-6 flex items-center gap-3">
        {project.href ? (
          <Link
            href={project.href}
            className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:text-sky-500"
          >
            Live Preview <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : null}

        {project.repoHref ? (
          <Link
            href={project.repoHref}
            className="text-muted-foreground hover:text-subtle-foreground inline-flex items-center gap-1 text-sm font-medium"
          >
            Source <Code2 className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
