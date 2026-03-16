import { defineField, defineType } from "sanity";

export const aboutSection = defineType({
    name: "aboutSection",
    title: "About Section",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            initialValue: "Behind the Sound",
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            initialValue: "The Producer",
        }),
        defineField({
            name: "bio",
            title: "Biography",
            type: "text",
            rows: 6,
        }),
        defineField({
            name: "quote",
            title: "Quote",
            type: "string",
            description: "An italic quote displayed at the bottom of the bio",
        }),
        defineField({
            name: "profileImage",
            title: "Profile Image",
            type: "image",
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: { title: "title" },
    },
});
