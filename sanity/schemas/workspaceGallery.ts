import { defineField, defineType } from "sanity";

export const workspaceGallery = defineType({
    name: "workspaceGallery",
    title: "Workspace Gallery",
    type: "document",
    fields: [
        defineField({
            name: "images",
            title: "Studio Images",
            type: "array",
            of: [
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                            description: "Describe the image for accessibility",
                        }),
                    ],
                },
            ],
            validation: (rule) => rule.max(8),
        }),
    ],
    preview: {
        prepare() {
            return { title: "Studio Gallery" };
        },
    },
});
