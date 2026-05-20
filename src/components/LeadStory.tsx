import Link from "next/link";
import { type Article } from "@/lib/data";

export default function LeadStory({ article }: { article: Article }) {
  return (
    <article className="flex flex-col group pb-8">
      {/* Grayscale hover transition image */}
      <Link href={`/articles/${article.slug}`} className="block mb-6 overflow-hidden bg-border-dark aspect-[16/9] w-full border border-foreground">
        <div className="w-full h-full bg-border-dark flex items-center justify-center text-muted font-sans text-xs tracking-widest uppercase tablet-hover-img">
          {article.imagePlaceholder || "Hero Image"}
        </div>
      </Link>
      
      {/* Meta Department */}
      <div className="mb-3">
        <span className="font-sans text-xs font-black uppercase tracking-widest text-accent">
          {article.department}
        </span>
      </div>
      
      {/* Title */}
      <Link href={`/articles/${article.slug}`}>
        <h2 className="font-rollercoaster text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground mb-4 group-hover:text-accent transition-colors tracking-normal">
          {article.title}
        </h2>
      </Link>
      
      {/* Summary */}
      <p className="font-serif text-lg md:text-xl text-muted mb-6 leading-relaxed">
        {article.summary}
      </p>
      
      {/* Byline */}
      <div className="mt-auto pt-4 border-t-2 border-foreground flex items-center justify-between font-sans text-xs text-foreground uppercase tracking-widest font-bold">
        <span>By {article.author}</span>
        <span>{article.readingTime}</span>
      </div>
    </article>
  );
}
