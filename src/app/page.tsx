import HeroScene from "@/components/3d/HeroScene";
import { LearningTimeline } from "@/components/timeline/LearningTimeline";
import AiMentorChat from "@/components/ai/AiMentorChat";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black overflow-x-hidden">
      <HeroScene />
      <div className="relative z-10 bg-black">
        <LearningTimeline />
      </div>
      <AiMentorChat />
    </main>
  );
}
