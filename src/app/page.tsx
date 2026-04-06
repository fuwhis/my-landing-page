import { AboutSection } from '@/sections/about/about-section';
import { ContactSection } from '@/sections/contact/contact-section';
import { ExperienceSection } from '@/sections/experience/experience-section';
import { HeroSection } from '@/sections/hero/hero-section';
import { ProjectsSection } from '@/sections/projects/projects-section';
import { SkillsSection } from '@/sections/skills/skills-section';
import { TechStackSection } from '@/sections/tech-stack/tech-stack-section';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TechStackSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
