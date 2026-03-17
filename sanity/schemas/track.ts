import { defineField, defineType } from "sanity";

export const track = defineType({
  name: "track",
  title: "Track",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "artist",
      title: "Artist",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverArt",
      title: "Cover Art",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "audioFile",
      title: "Audio File",
      type: "file",
      options: { accept: "audio/*" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "authorComment",
      title: "Author Comment",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "artist", media: "coverArt" },
  },
});

