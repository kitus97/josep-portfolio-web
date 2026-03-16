import { sanityClient } from "./sanity.client";

// --- About Section ---
const aboutSectionQuery = `*[_type == "aboutSection"][0]{
  title,
  subtitle,
  bio,
  quote,
  profileImage
}`;

export async function getAboutSection() {
    if (!sanityClient) return null;
    return sanityClient.fetch(aboutSectionQuery);
}

// --- Workspace Gallery ---
const workspaceGalleryQuery = `*[_type == "workspaceGallery"][0]{
  images[]{
    asset->{url},
    alt
  }
}`;

export async function getWorkspaceGallery() {
    if (!sanityClient) return null;
    return sanityClient.fetch(workspaceGalleryQuery);
}

// --- Track List ---
const trackListQuery = `*[_type == "trackList"][0]{
  tracks
}`;

export async function getTrackList() {
    if (!sanityClient) return null;
    return sanityClient.fetch(trackListQuery);
}
