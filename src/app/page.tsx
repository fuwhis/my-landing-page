import { AboutSection } from '@/sections/about/about-section';
import { ExperienceSection } from '@/sections/experience/experience-section';
import { HeroSection } from '@/sections/hero/hero-section';
import { ProjectsSection } from '@/sections/projects/projects-section';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
    </main>
  );
}
