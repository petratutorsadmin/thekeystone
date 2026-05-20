import { defineType, defineField } from "sanity";

export const recommendation = defineType({
  name: "recommendation",
  title: "Weekly Note (Recommendation)",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category (e.g. book, album, film, exhibition)",
      type: "string",
      options: {
        list: [
          { title: "Book", value: "book" },
          { title: "Album", value: "album" },
          { title: "Film", value: "film" },
          { title: "Exhibition", value: "exhibition" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Creator / Author (e.g. Ursula K. Le Guin)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "note",
      title: "Note / Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
