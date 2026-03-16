import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { StudioGallery } from "@/components/StudioGallery";
import { Discography } from "@/components/Discography";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pb-32">
      <Hero />
      <About />
      <StudioGallery />
      <Discography />
      <Footer />
    </main>
  );
}
