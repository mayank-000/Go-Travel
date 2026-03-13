import Hero from "@/components/home/Hero";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import UpcomingJourneys from "@/components/home/UpcomingJourneys";
import Testimonials from "@/components/home/Testimonials";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <GalleryTeaser />
      <UpcomingJourneys />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}