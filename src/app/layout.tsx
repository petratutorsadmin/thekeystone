import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import LayoutWrapper from "@/components/LayoutWrapper";
import { client } from "@/sanity/client";
import { getSession } from "@/lib/auth";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const rollercoaster = localFont({
  src: "../../public/fonts/roller-coaster.ttf",
  variable: "--font-rollercoaster",
});

export const metadata: Metadata = {
  title: "The Keystone",
  description: "A publication of politics, culture, education, criticism, and student thought.",
  openGraph: {
    title: "The Keystone",
    description: "A publication of politics, culture, education, criticism, and student thought.",
    type: "website",
  },
};

const fallbackDepts = [
  { 
    title: "Current Affairs", 
    slug: "current-affairs",
    articles: [
      {
        title: "Tokyo's Shifting Urban Architecture",
        slug: "tokyo-shifting-urban-architecture",
        summary: "Exploring how post-pandemic developments are transforming the micro-neighborhoods of the capital.",
        author: "Kenji Sato"
      }
    ]
  },
  { 
    title: "Politics", 
    slug: "politics",
    articles: [
      {
        title: "The Future of Coalition Governance in Japan",
        slug: "future-coalition-governance-japan",
        summary: "An in-depth look at changing voter coalitions and legislative dynamics in Tokyo.",
        author: "Yuki Tanaka"
      }
    ]
  },
  { 
    title: "Opinions", 
    slug: "opinions",
    articles: [
      {
        title: "The Slow Death of the Printed Word",
        slug: "slow-death-printed-word",
        summary: "Why print media's tactile friction remains essential for deep democratic engagement.",
        author: "Erika Mori"
      }
    ]
  },
  { 
    title: "Philosophy", 
    slug: "philosophy",
    articles: [
      {
        title: "Why Reading Slowly is a Political Act",
        slug: "why-reading-slowly-political-act",
        summary: "On the active resistance against speed-fetishism and short-form algorithms.",
        author: "Ryu Handa"
      }
    ]
  },
  { 
    title: "Science", 
    slug: "science",
    articles: [
      {
        title: "The Ethics of Artificial Cognition",
        slug: "ethics-artificial-cognition",
        summary: "Tracing the philosophical boundary lines of agency, creativity, and model alignment.",
        author: "Dr. S. Watanabe"
      }
    ]
  },
  { 
    title: "Art", 
    slug: "art",
    articles: [
      {
        title: "Post-War Avant-Garde in Tokyo Galleries",
        slug: "postwar-avantgarde-tokyo-galleries",
        summary: "How contemporary artists are referencing the visual language of Gutai group and radical movements.",
        author: "Mari Suzuki"
      }
    ]
  },
  { 
    title: "Music", 
    slug: "music",
    articles: [
      {
        title: "Soundscapes of Shibuya: A Modern Review",
        slug: "soundscapes-shibuya-modern-review",
        summary: "A critical listening journey through ambient sounds, field recordings, and local electronica.",
        author: "Kento Ito"
      }
    ]
  },
  { 
    title: "Poetry", 
    slug: "poetry",
    articles: [
      {
        title: "Rain and Concrete: New Tokyo Poetry",
        slug: "rain-and-concrete-tokyo-poetry",
        summary: "A selection of lyrical works exploring city isolation and the geometry of railway platforms.",
        author: "Saki Sato"
      }
    ]
  },
  { 
    title: "Photography", 
    slug: "photography",
    articles: [
      {
        title: "Visual Archives: The Quiet Side of Shinjuku",
        slug: "visual-archives-quiet-side-shinjuku",
        summary: "A photography spread documenting early morning alleyways before the city awakens.",
        author: "Takeshi Aoki"
      }
    ]
  },
  { 
    title: "Voices", 
    slug: "voices",
    articles: [
      {
        title: "Minority Perspectives in Public Education",
        slug: "minority-perspectives-public-education",
        summary: "How local language programs are addressing the educational needs of international students.",
        author: "Mei Yamada"
      }
    ]
  },
];

export const revalidate = 60; // Revalidate dynamic layouts every minute

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let departments = [];
  const session = await getSession();

  try {
    const fetched = await client.fetch(`
      *[_type == "department"] | order(title asc) {
        title,
        "slug": slug.current,
        "articles": *[_type == "article" && references(^._id)] | order(date desc)[0...2] {
          title,
          "slug": slug.current,
          summary,
          "author": author->name
        }
      }
    `);
    
    if (fetched && fetched.length > 0) {
      // Map data and ensure nested articles exist
      departments = fetched.map((d: any) => ({
        title: d.title,
        slug: d.slug,
        articles: d.articles || []
      }));
    } else {
      departments = fallbackDepts;
    }
  } catch (error) {
    console.error("Error fetching navigation departments from Sanity:", error);
    departments = fallbackDepts;
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${rollercoaster.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent selection:text-white">
        <LayoutWrapper departments={departments} footer={<Footer />} session={session}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
