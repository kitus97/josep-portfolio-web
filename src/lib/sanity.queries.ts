import { sanityClient } from "./sanity.client";

export type Track = {
    _id: string;
    title: string;
    artist: string;
    coverArtUrl?: string;
    audioUrl?: string;
    authorComment?: string;
};

export type TrackList = {
    tracks: Track[];
};

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
  tracks[]->{
    _id,
    title,
    artist,
    authorComment,
    "coverArtUrl": coverArt.asset->url,
    "audioUrl": audioFile.asset->url
  }
}`;

export async function getTrackList(): Promise<TrackList | null> {
    if (!sanityClient) return null;
    return sanityClient.fetch(trackListQuery);
}
