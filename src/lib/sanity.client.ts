import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// ⚠️ Replace with your Sanity Project ID and dataset
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "YOUR_PROJECT_ID";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Check if Sanity is properly configured
const isSanityConfigured =
    PROJECT_ID !== "YOUR_PROJECT_ID" && /^[a-z0-9-]+$/.test(PROJECT_ID);

export const sanityClient: SanityClient | null = isSanityConfigured
    ? createClient({
        projectId: PROJECT_ID,
        dataset: DATASET,
        apiVersion: "2024-01-01",
        useCdn: true,
    })
    : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    if (!sanityClient) return { width: () => ({ url: () => "" }), url: () => "" };
    return imageUrlBuilder(sanityClient).image(source);
}
