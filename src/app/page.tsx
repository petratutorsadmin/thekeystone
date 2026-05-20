import { recommendationsQuery, articlesQuery } from "@/sanity/queries";
import { client } from "@/sanity/client";
import ArticlePreview from "@/components/ArticlePreview";
import RecommendationList from "@/components/RecommendationList";
import Link from "next/link";
import { type Article, sampleArticles } from "@/lib/data";

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

  if (articles.length === 0) {
    articles = sampleArticles;
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

  if (Object.keys(recommendations).length === 0) {
    recommendations["Books"] = {
      title: "Lorem Ipsum Book",
      author: "Dolor Sit Amet",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    };
    recommendations["Essays"] = {
      title: "Lorem Ipsum Essay",
      author: "Consectetur Adipiscing",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    };
    recommendations["Ideas"] = {
      title: "Lorem Ipsum Idea",
      author: "Tempor Incididunt",
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    };
  }

  // Take the first 3 articles for "The Surf" preview
  const surfPreviewArticles = articles.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-16 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
        
        {/* Left Column: Founders' Note & The Surf Preview (spans 8 columns on large screens) */}
        <div className="lg:col-span-8 flex flex-col space-y-16">
          
          {/* Founders' Note section */}
          <div>
            <div className="border-b-4 border-foreground pb-6 mb-10 text-center md:text-left">
              <span className="font-sans text-xs font-black uppercase tracking-widest text-accent mb-2 block">
                FOUNDERS' NOTE
              </span>
              <h1 className="font-rollercoaster text-4xl md:text-5xl font-black text-foreground uppercase tracking-normal leading-none">
                Why We Built The Keystone
              </h1>
              <p className="font-sans text-sm text-muted mt-3 font-bold uppercase tracking-wider">
                Published May 2026 &bull; Tokyo, Japan
              </p>
            </div>

            <article className="font-serif text-base md:text-lg text-foreground leading-relaxed space-y-6">
              <p className="first-letter:text-5xl first-letter:font-black first-letter:font-rollercoaster first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-accent">
                Keystone was not created because we believed that the world needed another media platform. 
              </p>
              
              <p>
                It was created because we increasingly felt that most modern institutions, whether that was corporations or universities or media organisations or even education systems, have lost the ability to speak about people as human beings. The new trend, or the new fad, is to look at people as the relations of relationships they have with other people or what they are relative to some abstract ideal.
              </p>

              <p>
                The larger an institution becomes, the more human life can be transformed into abstractions. Abstractions of metrics, of performance, demographics, efficiency, profitability, outcomes and engagement, labor and content. Students tend to become numbers and workers turn into replaceable units. Culture no longer becomes something practiced by people, but something for branding and politics. We all know that politics, as it is now, is nothing more than a spectacle. And even education is becoming like that. Increasingly, and we feel it being university students and founders of an education company, that it feels less like a relationship between people, and more like an industrial process that is being optimised for profitability and output.
              </p>

              <blockquote className="border-y border-foreground py-6 my-8 font-rollercoaster text-lg md:text-xl text-accent text-center px-4">
                "Make Education Human Again."
              </blockquote>

              <p className="font-bold">
                Our company, Petra, exists inside of this contradiction.
              </p>

              <p>
                As a company which prides itself on education, we participate exactly in the exact same systems that we criticise. We understand, however, that to survive inside of capitalism; a system with inherent contradictions, a system within which ethical consumption is not possible, requires compromise. It requires operational efficiency and profitability. Without this, institutions cannot exist. We cannot exist. But also, without sustainability, it could not exist either. However, without the resources possible to turn ideals into reality, they remain a fantasy. Yet still, the logic of scaling, optimisation, and institutionalisation, slowly erodes the human relationships that education is supposed to protect.
              </p>

              <p>
                Our motto is: Make Education Human Again. It is not an appeal to nostalgia, nor a wish to bring back something from the past, but resistance against the reduction of human beings being turned into systems or markets or numbers.
              </p>

              <p>
                Keystone exists because Petra should not become immune from criticism. We don't believe that institutions should remain neutral. We don't believe that you can be objective either within the systems which are already structured to uphold inequality, increasing capital and power among the elite of that system. Keystone is an anti-capitalist, feminist, anti-racist, and pro-worker publication. We don't want to reproduce the language of the both sides discourse pushed by neoliberals and liberals, and we don't want to act like we are perfect either. We also want to ensure that we do not treat all positions to be equally humane, equally serious, or equally harmless.
              </p>

              <p>
                We believe strongly that students, workers, artists, tutors, and ordinary people whose voices are never heard, deserve spaces where everyone can think slowly and seriously, not to be content, not for profit, not for branding, but as human beings.
              </p>

              <div className="pt-12 border-t border-foreground/30 mt-12">
                <p className="font-sans text-xs uppercase tracking-widest text-muted font-bold mb-4">
                  Sincerely,
                </p>
                <div className="flex flex-col sm:flex-row gap-8">
                  <div>
                    <p className="font-serif text-base font-bold text-foreground">The Editorial Board</p>
                    <p className="font-sans text-xs text-muted font-bold">The Keystone</p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="border-t-2 border-foreground/30 pt-16">
            {/* The Surf section */}
            <div className="border-b-4 border-foreground pb-4 mb-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="font-rollercoaster text-3xl font-black text-accent uppercase tracking-normal">
                The Surf
              </h2>
              <Link 
                href="/surf" 
                className="font-sans text-xs font-black uppercase tracking-widest text-foreground hover:text-accent transition-colors mt-2 sm:mt-0"
              >
                Read all dispatches on The Surf &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {surfPreviewArticles.length > 0 ? (
                surfPreviewArticles.map((article) => (
                  <div key={article.slug} className="border-b border-foreground/20 md:border-b-0 pb-8 md:pb-0 md:pr-4 md:border-r last:border-r-0 last:pr-0 border-foreground/20">
                    <ArticlePreview article={article} hideImage={false} />
                  </div>
                ))
              ) : (
                <p className="font-sans text-sm text-muted">No essays published yet.</p>
              )}
            </div>

            <div className="mt-12 text-center">
              <Link 
                href="/surf" 
                className="inline-block border-2 border-foreground bg-foreground text-background px-8 py-4 font-sans text-xs uppercase tracking-widest font-black hover:bg-background hover:text-foreground transition-all duration-300"
              >
                Go to The Surf (Read without stopping)
              </Link>
            </div>
          </div>

        </div>

        {/* Right Column: Print Edition Coming Soon & Book Recommendations */}
        <div className="lg:col-span-4 flex flex-col space-y-12 lg:sticky lg:top-8 lg:border-l lg:border-foreground/20 lg:pl-10">
          
          {/* Print Editions Promo Block */}
          <div className="border-4 border-double border-accent p-8 bg-background flex flex-col items-center text-center">
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent mb-2">Print Editions</span>
            <h3 className="font-rollercoaster text-xl font-black uppercase leading-tight mb-4">Keystone Issue 001</h3>
            <p className="font-serif text-xs text-muted leading-relaxed mb-6">
              Our foundational essays and dispatches in a printed, archival format.
            </p>
            <span className="inline-block border-2 border-accent text-accent font-sans text-[10px] font-black uppercase tracking-widest py-3 px-6 select-none font-bold">
              Coming Soon
            </span>
          </div>

          {/* Book / Weekly Recommendations list */}
          <div className="border-t border-foreground/20 pt-8">
            <RecommendationList recommendations={recommendations} />
          </div>

        </div>

      </div>
    </div>
  );
}
