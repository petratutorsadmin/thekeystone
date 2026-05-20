import { recommendationsQuery, articlesQuery } from "@/sanity/queries";
import { client } from "@/sanity/client";
import LeadStory from "@/components/LeadStory";
import ArticlePreview from "@/components/ArticlePreview";
import IssueContents from "@/components/IssueContents";
import RecommendationList from "@/components/RecommendationList";
import Link from "next/link";
import { type Article } from "@/lib/data";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  let articles: Article[] = [];
  let rawRecommendations: any[] = [];

  try {
    const fetchedArticles = await client.fetch(articlesQuery);
    articles = fetchedArticles.map((article: any) => ({
      slug: article.slug,
      title: article.title,
      subtitle: article.subtitle,
      summary: article.summary,
      department: article.department || 'essays',
      author: article.author || 'Contributor',
      date: article.date ? new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 2026',
      readingTime: article.readingTime || '5 min read',
      imagePlaceholder: article.imagePlaceholder,
      content: article.content,
    }));

    rawRecommendations = await client.fetch(recommendationsQuery);
  } catch (error) {
    console.error("Error fetching homepage content from Sanity:", error);
  }

  // Format recommendations into expected dictionary
  const recommendations: Record<string, {title: string, author: string, note: string}> = {};
  rawRecommendations.forEach((rec: any) => {
    if (rec.category) {
      recommendations[rec.category] = {
        title: rec.title,
        author: rec.author,
        note: rec.note,
      };
    }
  });

  const leadArticle = articles[0];
  
  // Left Column Secondary Stories
  const leftColumnArticles = articles.slice(1, 3);
  
  // Right Column Secondary Story
  const rightColumnArticle = articles[3];
  
  // "The Scroll" Feed items (Right column widget)
  const scrollArticles = articles.slice(4, 8);

  // Simple mock timestamps for "The Scroll" feed
  const mockTimes = ["9:15 AM", "Yesterday", "2 days ago", "3 days ago"];

  const hasContent = articles.length > 0 || Object.keys(recommendations).length > 0;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-16 bg-background">
      {!hasContent ? (
        <div className="py-24 text-center border-4 border-foreground p-8 bg-background">
          <h2 className="font-serif text-4xl font-extrabold mb-4 uppercase tracking-tight">Welcome to Keystone</h2>
          <p className="font-sans text-muted mb-8 max-w-md mx-auto font-bold">
            Your publication currently has no active content. Please visit the Studio to create articles, issues, departments, and recommendations.
          </p>
          <a href="/studio" className="inline-block bg-foreground text-background font-sans text-xs uppercase tracking-widest font-black py-4 px-8 border border-foreground hover:bg-background hover:text-foreground transition-colors">
            Go to Sanity Studio
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Secondary Articles & Print Edition Widget */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div className="flex flex-col border-b border-foreground/30 pb-8">
              {leftColumnArticles.length > 0 ? (
                leftColumnArticles.map(article => (
                  <ArticlePreview key={article.slug} article={article} hideImage={false} />
                ))
              ) : (
                <p className="font-sans text-xs text-muted">No additional essays published.</p>
              )}
            </div>

            {/* Print Editions Promo Block (Double Border) */}
            <div className="border-4 border-double border-accent p-8 bg-background flex flex-col items-center text-center">
              <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent mb-2">Print Editions</span>
              <h3 className="font-serif text-xl font-black uppercase leading-tight mb-4">Keystone Issue 001</h3>
              <p className="font-serif text-xs text-muted leading-relaxed mb-6">
                Our foundational essays and dispatches in a printed, archival format.
              </p>
              <span className="inline-block border-2 border-accent text-accent font-sans text-[10px] font-black uppercase tracking-widest py-3 px-6 select-none font-bold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Center Column: Founder's Note snippet, Cover Story (Hero) & TOC */}
          <div className="lg:col-span-6 flex flex-col lg:border-x lg:border-foreground/30 lg:px-8">
            {/* Founders' Note Homepage Feature Card */}
            <div className="border-2 border-foreground p-6 mb-8 bg-background/50">
              <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent mb-2 block">
                Founders' Note
              </span>
              <h3 className="font-serif text-lg font-bold leading-snug mb-2 text-foreground">
                Welcome to the inaugural issue of Keystone.
              </h3>
              <p className="font-serif text-xs md:text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                We founded this review with a simple conviction: that student thoughts, long-form essays, and local cultural criticism deserve a platform that treats them with serious, rigorous editorial standards. Keystone is built to be a quiet room - a place where ideas can be developed fully, articulated clearly, and read without distraction.
              </p>
              <Link 
                href="/about" 
                className="font-sans text-[10px] font-black uppercase tracking-widest text-accent hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                <span>Read the full letter</span>
                <span className="font-sans">&rarr;</span>
              </Link>
            </div>

            {leadArticle ? (
              <LeadStory article={leadArticle} />
            ) : (
              <p className="font-sans text-sm text-muted">No featured story available.</p>
            )}
            
            {articles.length > 0 && (
              <div className="mt-12 pt-12 border-t border-foreground/30">
                <IssueContents articles={articles} />
              </div>
            )}
          </div>

          {/* Right Column: Secondary Article, The Scroll Widget, & Weekly Notes */}
          <div className="lg:col-span-3 flex flex-col gap-12">
            {rightColumnArticle && (
              <div className="border-b border-foreground/30 pb-8">
                <ArticlePreview article={rightColumnArticle} hideImage={false} />
              </div>
            )}

            {/* "The Scroll" Feed Widget */}
            <div className="border-4 border-double border-accent p-8 bg-background">
              <div className="border-b-2 border-foreground pb-2 mb-4">
                <h2 className="font-serif text-xl font-black uppercase tracking-wider text-accent text-center">
                  The Scroll
                </h2>
              </div>
              <div className="flex flex-col">
                {scrollArticles.length > 0 ? (
                  scrollArticles.map((article, idx) => (
                    <ArticlePreview 
                      key={article.slug} 
                      article={article} 
                      isScrollItem={true} 
                      timeLabel={mockTimes[idx] || "Updates"} 
                    />
                  ))
                ) : (
                  <p className="font-sans text-xs text-muted py-2 text-center">No recent dispatches.</p>
                )}
              </div>
            </div>

            {/* Weekly Notes */}
            {Object.keys(recommendations).length > 0 ? (
              <RecommendationList recommendations={recommendations} />
            ) : (
              <div className="border border-foreground p-8 text-center">
                <h4 className="font-sans text-xs font-black uppercase tracking-widest text-foreground mb-4 border-b border-foreground pb-2">Weekly Notes</h4>
                <p className="font-serif text-sm text-muted">No weekly notes posted yet.</p>
              </div>
            )}
            
            <div className="bg-foreground text-background p-8 text-center border border-foreground">
              <h3 className="font-serif text-2xl font-black uppercase tracking-tight mb-4">
                Submissions
              </h3>
              <p className="font-sans text-sm opacity-80 mb-6 leading-relaxed">
                We are currently accepting essays, criticism, and photography for Issue 002.
              </p>
              <a href="/submit" className="inline-block border border-background py-2.5 px-6 font-sans text-xs uppercase tracking-widest font-bold hover:bg-background hover:text-foreground transition-colors">
                Submit Work
              </a>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
