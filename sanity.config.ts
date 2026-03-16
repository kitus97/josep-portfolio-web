"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
    name: "josep-escurriola-portfolio",
    title: "Josep Escurriola Portfolio",

    // ⚠️ Set via env vars or replace directly
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "YOUR_PROJECT_ID",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

    basePath: "/studio",

    plugins: [structureTool()],

    schema: {
        types: schemaTypes,
    },
});
