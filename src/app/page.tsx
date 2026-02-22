import HeroScene from "@/components/3d/HeroScene";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { LearningTimeline } from "@/components/timeline/LearningTimeline";
import { Suspense } from "react";
import AiMentorChat from "@/components/ai/AiMentorChat";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-transparent overflow-x-hidden">
      <HeroScene />

      <div className="relative z-10 bg-transparent">
        <AboutSection />
        <ProjectsSection />
        <div id="journey">
          <LearningTimeline />
        </div>
      </div>

      <Suspense fallback={null}>
        <AiMentorChat />
      </Suspense>
    </main>
  );
}
