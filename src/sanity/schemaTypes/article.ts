import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary (Excerpt)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "reference",
      to: [{ type: "department" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author (Contributor)",
      type: "reference",
      to: [{ type: "contributor" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issue",
      title: "Issue",
      type: "reference",
      to: [{ type: "issue" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (e.g. 5 min read)",
      type: "string",
      initialValue: "5 min read",
    }),
    defineField({
      name: "content",
      title: "Content (HTML/Text)",
      type: "text",
      description: "Write raw text or HTML block for the article content",
    }),
    defineField({
      name: "imagePlaceholder",
      title: "Image Placeholder Text",
      type: "string",
    }),
  ],
});
