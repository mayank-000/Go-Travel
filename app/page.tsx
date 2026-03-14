import Hero from "@/components/home/Hero";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import UpcomingJourneys from "@/components/home/UpcomingJourneys";
import Testimonials from "@/components/home/Testimonials";
import ClosingCTA from "@/components/home/ClosingCTA";
import FeaturedJourneys from "@/components/home/FeaturedJourneys";
import NarrativeBlock from "@/components/home/NarrativeBlock";
import Philosophy from "@/components/home/Philosophy";

export default function Home() {
  return (
    <>
      <Hero />
      <GalleryTeaser />
      <FeaturedJourneys />
      <UpcomingJourneys />
      <NarrativeBlock />
      <Philosophy />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}