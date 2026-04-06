import Link from 'next/link';
import { ArrowUpRight, Code2 } from 'lucide-react';

import { TechStackList } from '@/components/shared/tech-stack-list';
import type { ProjectItem } from '@/types/content';

type ProjectCardProps = {
  project: ProjectItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 sm:p-7">
      <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">{project.category}</p>
      <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">{project.description}</p>
      <p className="mt-4 text-sm font-medium text-neutral-800">{project.impact}</p>

      <div className="mt-5">
        <TechStackList items={project.stack} />
      </div>

      <div className="mt-6 flex items-center gap-3">
        {project.href ? (
          <Link
            href={project.href}
            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Live Preview <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : null}

        {project.repoHref ? (
          <Link
            href={project.repoHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-500"
          >
            Source <Code2 className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
