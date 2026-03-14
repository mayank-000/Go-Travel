import Hero from "@/components/home/Hero";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import UpcomingJourneys from "@/components/home/UpcomingJourneys";
import Testimonials from "@/components/home/Testimonials";
import ClosingCTA from "@/components/home/ClosingCTA";
import FeaturedJourneys from "@/components/home/FeaturedJourneys";
import NarrativeBlock from "@/components/home/NarrativeBlock";
import Philosophy from "@/components/home/Philosophy";
import ScrollFader from "@/components/layout/ScrollFader";
import FAQSection from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      {/* Hero — no id needed, logo click scrolls to top */}
      <Hero />

      <ScrollFader>
        <div id="about">
          <NarrativeBlock />
        </div>

        <FeaturedJourneys />
        <div id="trips">
          <UpcomingJourneys />
        </div>

        <div id="gallery">
          <GalleryTeaser />
        </div>

        <div id="blog">
          {/* Blog teaser — placeholder until Blog page is built */}
          <Philosophy />
        </div>

        <div id="faq">
          <FAQSection />
        </div>

        <Testimonials />
        <div id="contact">
          <ClosingCTA />
        </div>
      </ScrollFader>
    </>
  );
}