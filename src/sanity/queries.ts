// Fetch all articles with their references mapped
export const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  subtitle,
  summary,
  "department": department->slug.current,
  "author": author->name,
  "date": publishedAt,
  readingTime,
  imagePlaceholder,
  content
}`;

// Fetch a single article by slug
export const articleBySlugQuery = `*[_type == "article" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  subtitle,
  summary,
  "department": department->slug.current,
  "author": author->name,
  "date": publishedAt,
  readingTime,
  imagePlaceholder,
  content
}`;

// Fetch related articles by department (excluding current article)
export const relatedArticlesQuery = `*[_type == "article" && department->slug.current == $department && slug.current != $slug] | order(publishedAt desc)[0...3] {
  title,
  "slug": slug.current,
  subtitle,
  summary,
  "department": department->slug.current,
  "author": author->name,
  "date": publishedAt,
  readingTime,
  imagePlaceholder
}`;

// Fetch all issues
export const issuesQuery = `*[_type == "issue"] | order(issueId desc) {
  title,
  issueId,
  date,
  location,
  editorsNote,
  coverImagePlaceholder
}`;

// Fetch a single issue by ID and its articles
export const issueByIdQuery = `*[_type == "issue" && issueId == $id][0] {
  title,
  issueId,
  date,
  location,
  editorsNote,
  coverImagePlaceholder,
  "articles": *[_type == "article" && references(^._id)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    subtitle,
    summary,
    "department": department->slug.current,
    "author": author->name,
    "date": publishedAt,
    readingTime,
    imagePlaceholder
  }
}`;

// Fetch articles by department slug
export const articlesByDepartmentQuery = `*[_type == "article" && department->slug.current == $department] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  subtitle,
  summary,
  "department": department->slug.current,
  "author": author->name,
  "date": publishedAt,
  readingTime,
  imagePlaceholder
}`;

// Fetch department info
export const departmentQuery = `*[_type == "department" && slug.current == $department][0] {
  title,
  description
}`;

// Fetch all contributors with their article count
export const contributorsQuery = `*[_type == "contributor"] | order(rank asc, name asc) {
  name,
  "slug": slug.current,
  role,
  bio,
  rank,
  imagePlaceholder,
  "articleCount": count(*[_type == "article" && references(^._id)])
}`;

// Fetch all weekly notes (recommendations)
export const recommendationsQuery = `*[_type == "recommendation"] {
  category,
  title,
  author,
  note
}`;
