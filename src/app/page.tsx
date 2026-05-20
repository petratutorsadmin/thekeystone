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

  if (Object.keys(recommendations).length === 0) {
    recommendations["Books"] = {
      title: "Pedagogy of the Oppressed",
      author: "Paulo Freire",
      note: "A classic work of critical pedagogy that argues for education as a practice of freedom, stressing the dialogue between teacher and student as equals in discovering the world."
    };
    recommendations["Essays"] = {
      title: "The Death of the Author",
      author: "Roland Barthes",
      note: "A foundational post-structuralist essay that dismantles the traditional reliance on biographical authorial intent, inviting the reader to become the true locus of meaning."
    };
    recommendations["Ideas"] = {
      title: "Capitalist Realism",
      author: "Mark Fisher",
      note: "Fisher explores the widespread acceptance that capitalism is the only viable political and economic system, examining its effects on mental health, education, and public institutions."
    };
  }

  const leadArticle = articles[0];
  
  // Left Column Secondary Stories
  const leftColumnArticles = articles.slice(1, 3);
  
  // Right Column Secondary Story
  const rightColumnArticle = articles[3];
  
  // "The Scroll" Feed items (Right column widget)
  const scrollArticles = articles.slice(4, 8);

  // Simple mock timestamps for "The Scroll" feed
  const mockTimes = ["9:15 AM", "Yesterday", "2 days ago", "3 days ago"];

  const showNewspaperLayout = articles.length > 0;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-16 bg-background">
      {!showNewspaperLayout ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start py-8 md:py-12 bg-background">
          {/* Left Column: Founders' Letter */}
          <div className="lg:col-span-8 w-full">
            {/* Editorial Header */}
            <div className="border-b-4 border-foreground pb-6 mb-10 text-center md:text-left">
              <span className="font-sans text-xs font-black uppercase tracking-widest text-accent mb-2 block">
                FOUNDERS' NOTE
              </span>
              <h1 className="font-rollercoaster text-4xl md:text-5xl font-black text-foreground uppercase tracking-normal leading-none">
                Why We Built Keystone
              </h1>
              <p className="font-sans text-sm text-muted mt-3 font-bold uppercase tracking-wider">
                Published May 2026 &bull; Tokyo, Japan
              </p>
            </div>

            {/* Main Letter Body */}
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

              {/* Elegant Pull Quote block */}
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
                At the same time, Keystone is not going to become some sort of ideological branding for the company or for people who work in it, or propaganda for a company. We want to make sure that we can find a space that allows people and contributors to show the contradictions within the system, to criticise, to reflect, to observe art, to present their political opinions or their philosophical findings or even photography and their lived experiences for the world to see. We don't want to theorise or to think about these abstractions that many theologists or theoreticians or historians or economists or sociologists think about, but we want people to read about the ordinary lives and the realisations that come with it that people feel every day while living under capitalism, whether that's alienation or exhaustion, precarity, performance, loneliness, aspiration, resentment, and the eternal search for meaning which seems impossible under this system.
              </p>

              <p>
                We believe strongly that students, workers, artists, tutors, and ordinary people whose voices are never heard, deserve spaces where everyone can think slowly and seriously, not to be content, not for profit, not for branding, but as human beings.
              </p>

              {/* Signatures */}
              <div className="pt-12 border-t border-foreground/30 mt-12">
                <p className="font-sans text-xs uppercase tracking-widest text-muted font-bold mb-4">
                  Sincerely,
                </p>
                <div className="flex flex-col sm:flex-row gap-8">
                  <div>
                    <p className="font-serif text-base font-bold text-foreground">The Editorial Board</p>
                    <p className="font-sans text-xs text-muted">The Keystone</p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Right Column: Weekly Recommendations */}
          <div className="lg:col-span-4 w-full space-y-8 lg:sticky lg:top-8 order-last">
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Secondary Articles & Print Edition Widget */}
          <div className="lg:col-span-3 flex flex-col gap-8 order-2 lg:order-1">
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
            <div className="hidden md:flex border-4 border-double border-accent p-8 bg-background flex flex-col items-center text-center">
              <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent mb-2">Print Editions</span>
              <h3 className="font-rollercoaster text-xl font-black uppercase leading-tight mb-4">Keystone Issue 001</h3>
              <p className="font-serif text-xs text-muted leading-relaxed mb-6">
                Our foundational essays and dispatches in a printed, archival format.
              </p>
              <span className="inline-block border-2 border-accent text-accent font-sans text-[10px] font-black uppercase tracking-widest py-3 px-6 select-none font-bold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Center Column: Founder's Note snippet, Cover Story (Hero) & TOC */}
          <div className="lg:col-span-6 flex flex-col lg:border-x lg:border-foreground/30 lg:px-8 order-1 lg:order-2">
            {/* Founders' Note Homepage Feature Card */}
            <div className="border-2 border-foreground p-6 mb-8 bg-background/50">
              <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent mb-2 block">
                Founders' Note
              </span>
              <h3 className="font-serif text-lg font-bold leading-snug mb-2 text-foreground">
                Welcome to the inaugural issue of Keystone.
              </h3>
              <p className="font-serif text-xs md:text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                We founded this publication with a simple conviction: that student thoughts, long-form essays, and local cultural criticism deserve a platform that treats them with serious, rigorous editorial standards. Keystone is built to be a quiet room - a place where ideas can be developed fully, articulated clearly, and read without distraction.
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
          <div className="lg:col-span-3 flex flex-col gap-12 order-3">
            {rightColumnArticle && (
              <div className="border-b border-foreground/30 pb-8">
                <ArticlePreview article={rightColumnArticle} hideImage={false} />
              </div>
            )}

            {/* "The Scroll" Feed Widget */}
            <div className="hidden md:block border-4 border-double border-accent p-8 bg-background">
              <div className="border-b-2 border-foreground pb-2 mb-4">
                <h2 className="font-rollercoaster text-xl font-black uppercase tracking-normal text-accent text-center">
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
            <div className="hidden md:block">
              {Object.keys(recommendations).length > 0 ? (
                <RecommendationList recommendations={recommendations} />
              ) : (
                <div className="border border-foreground p-8 text-center">
                  <h4 className="font-sans text-xs font-black uppercase tracking-widest text-foreground mb-4 border-b border-foreground pb-2">Weekly Notes</h4>
                  <p className="font-serif text-sm text-muted">No weekly notes posted yet.</p>
                </div>
              )}
            </div>
            
            <div className="hidden md:block bg-foreground text-background p-8 text-center border border-foreground">
              <h3 className="font-rollercoaster text-2xl font-black uppercase tracking-normal mb-4">
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
