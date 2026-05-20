import { client } from "@/sanity/client";
import { contributorsQuery } from "@/sanity/queries";
import ContributorCard from "@/components/ContributorCard";
import { type Contributor, sampleContributors } from "@/lib/data";

import type { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Contributors",
  description: "Meet the editors, writers, and students who contribute to The Keystone.",
  keywords: ["Contributors", "Keystone writers", "editorial desk", "student contributors"],
};

export default async function ContributorsPage() {
  let contributors: Contributor[] = [];

  try {
    const rawContributors = await client.fetch(contributorsQuery);
    contributors = rawContributors.map((c: any) => ({
      id: c.slug,
      name: c.name,
      role: c.role,
      bio: c.bio || "No biography available.",
      articleCount: c.articleCount || 0,
      imagePlaceholder: c.imagePlaceholder,
      rank: c.rank,
    }));
  } catch (error) {
    console.error("Error fetching contributors from Sanity:", error);
  }

  if (contributors.length === 0) {
    contributors = sampleContributors;
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 md:px-8 py-12 md:py-16">
      <div className="mb-16 border-b-4 border-foreground pb-6">
        <h1 className="font-rollercoaster text-5xl md:text-6xl font-bold text-foreground mb-4">
          Contributors
        </h1>
        <p className="font-sans text-lg text-muted max-w-2xl">
          The editors, writers, and students who make The Keystone possible.
        </p>
      </div>

      <div className="flex flex-col">
        {contributors.length > 0 ? (
          contributors.map(contributor => (
            <ContributorCard key={contributor.id} contributor={contributor} />
          ))
        ) : (
          <div className="text-center py-16 border border-dashed border-foreground/30 p-8 w-full">
            <p className="font-sans text-muted font-bold">
              No contributors found. Check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
