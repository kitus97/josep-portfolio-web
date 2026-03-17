import { defineField, defineType } from "sanity";

export const trackList = defineType({
    name: "trackList",
    title: "Track List",
    type: "document",
    fields: [
        defineField({
            name: "tracks",
            title: "Tracks",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "track" }],
                },
            ],
            description: "Ordered list for Selected Works carousel.",
        }),
    ],
    preview: {
        prepare() {
            return { title: "Selected Works" };
        },
    },
});
