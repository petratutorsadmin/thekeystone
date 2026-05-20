import { type Contributor } from "@/lib/data";

export default function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <div className="flex gap-6 items-start py-8 border-t border-border-dark first:border-t-0">
      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-border-dark flex items-center justify-center text-[10px] text-muted uppercase tracking-widest text-center rounded-full overflow-hidden">
        {contributor.imagePlaceholder || "IMG"}
      </div>
      <div>
        <h3 className="font-rollercoaster text-xl md:text-2xl font-bold text-foreground mb-1">
          {contributor.name}
        </h3>
        <p className="font-sans text-xs uppercase tracking-wider text-accent mb-3">
          {contributor.role}
        </p>
        <p className="font-sans text-sm text-muted leading-relaxed mb-4 max-w-xl">
          {contributor.bio}
        </p>
        <div className="font-sans text-[10px] uppercase tracking-wider text-muted">
          {contributor.articleCount} {contributor.articleCount === 1 ? 'Article' : 'Articles'}
        </div>
      </div>
    </div>
  );
}
