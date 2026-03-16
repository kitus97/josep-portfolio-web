import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { StudioGallery } from "@/components/StudioGallery";
import { Discography } from "@/components/Discography";
import { Footer } from "@/components/Footer";
import { getAboutSection, getWorkspaceGallery, getTrackList } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.client";

export default async function Home() {
  // Fetch CMS data (returns null if CMS is empty / not configured yet)
  const [aboutData, galleryData, trackData] = await Promise.all([
    getAboutSection().catch(() => null),
    getWorkspaceGallery().catch(() => null),
    getTrackList().catch(() => null),
  ]);

  // Transform gallery images from Sanity format to { src, alt }
  const galleryImages = galleryData?.images?.map(
    (img: { asset?: { url?: string }; alt?: string }) => ({
      src: img.asset?.url ?? urlFor(img).width(1200).url(),
      alt: img.alt ?? "Studio photo",
    })
  );

  // Transform about profile image
  const profileImageUrl = aboutData?.profileImage
    ? urlFor(aboutData.profileImage).width(1200).url()
    : undefined;

  return (
    <main className="min-h-screen pb-32">
      <Hero />
      <About
        title={aboutData?.title}
        subtitle={aboutData?.subtitle}
        bio={aboutData?.bio}
        quote={aboutData?.quote}
        profileImageUrl={profileImageUrl}
      />
      <StudioGallery images={galleryImages} />
      <Discography trackIds={trackData?.tracks} />
      <Footer />
    </main>
  );
}
