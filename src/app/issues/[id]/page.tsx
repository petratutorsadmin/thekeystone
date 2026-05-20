import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { issueByIdQuery } from "@/sanity/queries";
import ArticlePreview from "@/components/ArticlePreview";
import IssueContents from "@/components/IssueContents";
import { type Article } from "@/lib/data";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function IssuePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  let issue: any = null;
  let articles: Article[] = [];

  try {
    const rawIssue = await client.fetch(issueByIdQuery, { id: resolvedParams.id });
    
    if (rawIssue) {
      issue = {
        title: rawIssue.title,
        issueId: rawIssue.issueId,
        date: rawIssue.date,
        location: rawIssue.location,
        editorsNote: rawIssue.editorsNote,
        coverImagePlaceholder: rawIssue.coverImagePlaceholder,
      };

      if (rawIssue.articles) {
        articles = rawIssue.articles.map((a: any) => ({
          slug: a.slug,
          title: a.title,
          subtitle: a.subtitle,
          summary: a.summary,
          department: a.department || 'essays',
          author: a.author || 'Contributor',
          date: a.date ? new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 2026',
          readingTime: a.readingTime || '5 min read',
          imagePlaceholder: a.imagePlaceholder,
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching issue from Sanity:", error);
  }

  if (!issue) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-12 md:py-16">
      {/* Issue Header */}
      <div className="mb-16 border-b-4 border-foreground pb-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
        <div className="w-full md:w-1/3 aspect-[3/4] bg-border-dark flex flex-col items-center justify-center text-center p-8 shrink-0">
          <span className="font-sans text-xs uppercase tracking-widest text-muted mb-4">Cover Image</span>
          <h2 className="font-serif text-3xl font-bold text-foreground">
            {issue.title}
          </h2>
          <span className="font-sans text-sm text-muted mt-2">
            {issue.date}
          </span>
        </div>
        
        <div className="flex-1 flex flex-col justify-center h-full">
          <div className="mb-4">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent border-b border-accent pb-1">
              {issue.title}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
            The Foundations of a Thoughtful Education
          </h1>
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted mb-4">
            Editor's Note
          </h3>
          <p className="font-serif text-lg md:text-xl text-foreground leading-relaxed max-w-2xl">
            {issue.editorsNote || "No editor's note added yet."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
        <div className="lg:col-span-8 flex flex-col">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-foreground mb-8 border-b border-border-dark pb-4">
            Featured Articles
          </h3>
          <div className="flex flex-col gap-8">
             {articles.length > 0 ? (
               articles.map((article) => (
                 <ArticlePreview key={article.slug} article={article} />
               ))
             ) : (
               <p className="font-sans text-sm text-muted">No articles in this issue yet.</p>
             )}
          </div>
        </div>
        <div className="lg:col-span-4">
          {articles.length > 0 && <IssueContents articles={articles} />}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const issues = await client.fetch(`*[_type == "issue"] { "id": issueId }`);
    return issues.map((issue: any) => ({
      id: issue.id,
    }));
  } catch (e) {
    console.error("Failed to generate static params for issues", e);
    return [];
  }
}
