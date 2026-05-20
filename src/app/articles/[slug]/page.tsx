import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { articleBySlugQuery, relatedArticlesQuery } from "@/sanity/queries";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import PullQuote from "@/components/PullQuote";
import ArticlePreview from "@/components/ArticlePreview";
import { type Article, sampleArticles } from "@/lib/data";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  let article: Article | null = null;
  let relatedArticles: Article[] = [];

  try {
    const rawArticle = await client.fetch(articleBySlugQuery, { slug: resolvedParams.slug });
    
    if (rawArticle) {
      article = {
        slug: rawArticle.slug,
        title: rawArticle.title,
        subtitle: rawArticle.subtitle,
        summary: rawArticle.summary,
        department: rawArticle.department || 'essays',
        author: rawArticle.author || 'Contributor',
        date: rawArticle.date ? new Date(rawArticle.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 2026',
        readingTime: rawArticle.readingTime || '5 min read',
        imagePlaceholder: rawArticle.imagePlaceholder,
        content: rawArticle.content,
      };

      const rawRelated = await client.fetch(relatedArticlesQuery, { 
        department: rawArticle.department || '', 
        slug: resolvedParams.slug 
      });

      relatedArticles = rawRelated.map((r: any) => ({
        slug: r.slug,
        title: r.title,
        subtitle: r.subtitle,
        summary: r.summary,
        department: r.department || 'essays',
        author: r.author || 'Contributor',
        date: r.date ? new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 2026',
        readingTime: r.readingTime || '5 min read',
        imagePlaceholder: r.imagePlaceholder,
      }));
    }
  } catch (error) {
    console.error("Error fetching article page content from Sanity:", error);
  }

  if (!article) {
    const matchedSample = sampleArticles.find(a => a.slug === resolvedParams.slug);
    if (matchedSample) {
      article = matchedSample;
      relatedArticles = sampleArticles.filter(
        a => a.department === matchedSample.department && a.slug !== matchedSample.slug
      );
    }
  }

  if (!article) {
    notFound();
  }

  const content = article.content || `
    <p>This article has no content preview. Please edit the content in Sanity Studio.</p>
  `;

  return (
    <article className="w-full pb-24">
      <ArticleHeader article={article} />
      
      <ArticleBody content={content} />
      
      <PullQuote 
        quote="A predictable rhythm is one of the clearest signals of polish, and rhythm breaks are one of the clearest signals of vibe coded work."
        author="Editorial Standard"
      />

      {relatedArticles.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-24 pt-12 border-t-2 border-foreground">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-foreground mb-8">
            More from {article.department}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {relatedArticles.map(related => (
              <ArticlePreview key={related.slug} article={related} hideImage={true} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  try {
    const articles = await client.fetch(`*[_type == "article"] { "slug": slug.current }`);
    return articles.map((article: any) => ({
      slug: article.slug,
    }));
  } catch (e) {
    console.error("Failed to generate static params for articles", e);
    return [];
  }
}
