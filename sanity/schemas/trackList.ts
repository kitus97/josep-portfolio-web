import { defineField, defineType } from "sanity";

export const trackList = defineType({
    name: "trackList",
    title: "Track List",
    type: "document",
    fields: [
        defineField({
            name: "tracks",
            title: "Tidal Track IDs",
            type: "array",
            of: [{ type: "string" }],
            description: "Paste Tidal Track IDs here (e.g. 501330996)",
        }),
    ],
    preview: {
        prepare() {
            return { title: "Tidal Tracks" };
        },
    },
});
