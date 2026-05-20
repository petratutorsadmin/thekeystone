import { defineType, defineField } from "sanity";

export const issue = defineType({
  name: "issue",
  title: "Issue",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (e.g. Issue 001)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issueId",
      title: "Issue ID (e.g. 001)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date (e.g. May 2026)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location (e.g. Tokyo / International)",
      type: "string",
    }),
    defineField({
      name: "editorsNote",
      title: "Editor's Note",
      type: "text",
    }),
    defineField({
      name: "coverImagePlaceholder",
      title: "Cover Image Placeholder Text",
      type: "string",
    }),
  ],
});
