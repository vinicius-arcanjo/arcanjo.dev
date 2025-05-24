import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SectionNav } from '@/components/section-nav';
// import { TimelineSection } from "@/components/timeline-section";
// import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-24">
      <HeroSection />
      <SectionNav/>
      <ProjectsSection />
      {/*<TimelineSection />*/}
      {/*<Footer />*/}
    </main>
  );
}
