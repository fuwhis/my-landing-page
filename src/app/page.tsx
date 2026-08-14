import { AboutSection } from '@/sections/about/about-section';
import { ContactSection } from '@/sections/contact/contact-section';
import { TimelineRecordSection } from '@/sections/experience/timeline-record-section';
import { HeroSection } from '@/sections/hero/hero-section';
import { ProjectsSection } from '@/sections/projects/projects-section';
import { SkillsSection } from '@/sections/skills/skills-section';
import { VastSection } from '@/sections/vast/vast-section';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <VastSection />
      <AboutSection />
      <TimelineRecordSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
