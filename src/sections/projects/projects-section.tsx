import { FadeInOnView } from '@/components/motion/fade-in-on-view';
import { WaveDivider } from '@/components/motion/wave-divider';
import { ProjectCard } from '@/components/shared/project-card';
import { SectionContainer } from '@/components/shared/section-container';
import { SectionHeading } from '@/components/shared/section-heading';
import { projects } from '@/data/projects';

export function ProjectsSection() {
  return (
    <SectionContainer
      id="projects"
      decoration={<WaveDivider className="section-continuity__section-wave-divider" />}
    >
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="Projects that demonstrate ownership, product thinking, and scalable frontend execution."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <FadeInOnView key={project.title} delay={index * 0.08}>
              <ProjectCard project={project} />
            </FadeInOnView>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
