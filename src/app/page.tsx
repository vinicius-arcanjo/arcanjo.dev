import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SectionNav } from '@/components/section-nav';
// import { TimelineSection } from "@/components/timeline-section";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      <HeroSection />
      <SectionNav/>
      <ProjectsSection />
      {/*<TimelineSection />*/}
    </main>
  );
}
