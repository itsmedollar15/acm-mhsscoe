import HomeHeroSection from "@/components/home/hero";
import HomeAboutSection from "@/components/home/about";
import HomeFacultySection from "@/components/home/faculty";
import HomeEventsSection from "@/components/home/events";
import HomeVideoSection from "@/components/home/video";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10 h-full">
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeEventsSection />
      <HomeVideoSection />
      <HomeFacultySection />
    </div>
  );
}
