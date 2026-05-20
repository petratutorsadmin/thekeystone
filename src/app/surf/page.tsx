import { client } from "@/sanity/client";
import { articlesQuery } from "@/sanity/queries";
import { type Article, sampleArticles } from "@/lib/data";
import { getSession } from "@/lib/auth";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleBody from "@/components/ArticleBody";
import PullQuote from "@/components/PullQuote";

export const revalidate = 60;

export default async function SurfPage() {
  let articles: Article[] = [];
  const session = await getSession();

  try {
    const rawArticles = await client.fetch(articlesQuery);
    articles = rawArticles.map((a: any) => ({
      slug: a.slug,
      title: a.title,
      subtitle: a.subtitle,
      department: a.department,
      author: a.authorName,
      date: new Date(a.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readingTime: a.readingTime,
      summary: a.summary,
      content: a.content,
    }));
  } catch (error) {
    console.error("Error fetching articles for The Surf:", error);
  }

  if (articles.length === 0) {
    articles = sampleArticles;
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 md:px-8 py-12 md:py-16">
      <div className="text-center mb-16 border-b-4 border-foreground pb-6">
        <h1 className="font-rollercoaster text-5xl md:text-6xl font-bold text-foreground mb-4">
          The Surf
        </h1>
        <p className="font-sans text-xs uppercase tracking-widest text-accent font-black">
          Read without stopping
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {articles.map((article, idx) => {
          const content = article.content || `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          `;
          return (
            <div key={article.slug} className="flex flex-col">
              <ArticleHeader article={article} sessionEmail={session?.email} />
              
              <div className="max-w-3xl mx-auto w-full mb-12">
                <ArticleBody content={content} />
              </div>
              
              {idx % 2 === 0 && (
                <div className="my-4">
                  <PullQuote 
                    quote="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor."
                    author="The Keystone"
                  />
                </div>
              )}

              {idx < articles.length - 1 && (
                <div className="mt-16 border-b-4 border-double border-foreground/30 w-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
