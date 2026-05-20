import Link from "next/link";
import { type Article } from "@/lib/data";

interface ArticlePreviewProps {
  article: Article;
  hideImage?: boolean;
  isScrollItem?: boolean;
  timeLabel?: string;
}

export default function ArticlePreview({ article, hideImage = false, isScrollItem = false, timeLabel }: ArticlePreviewProps) {
  if (isScrollItem) {
    return (
      <div className="group py-4 border-b border-foreground/30 last:border-0 flex flex-col items-start bg-transparent">
        <div className="flex items-center gap-2 mb-2">
          {timeLabel && (
            <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded-sm">
              {timeLabel}
            </span>
          )}
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-muted">
            {article.department}
          </span>
        </div>
        
        <Link href={`/articles/${article.slug}`}>
          <h4 className="font-rollercoaster text-base md:text-lg font-bold leading-snug text-foreground group-hover:text-accent transition-colors">
            {article.title}
          </h4>
        </Link>
        
        {article.summary && (
          <p className="font-serif text-xs md:text-sm text-muted mt-2 leading-relaxed line-clamp-2">
            {article.summary}
          </p>
        )}
        
        <span className="font-sans text-[10px] text-muted uppercase tracking-wider mt-2 font-semibold">
          By {article.author}
        </span>
      </div>
    );
  }

  return (
    <article className="flex flex-col group py-8 border-b border-foreground/30 last:border-0">
      <div className="flex gap-8">
        <div className="flex-1">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-2">
            <span className="font-sans text-[10px] md:text-xs font-black uppercase tracking-widest text-accent">
              {article.department}
            </span>
          </div>
          
          {/* Title */}
          <Link href={`/articles/${article.slug}`}>
            <h3 className="font-rollercoaster text-xl md:text-2xl lg:text-3xl font-black leading-snug text-foreground mb-2 group-hover:text-accent transition-colors tracking-normal">
              {article.title}
            </h3>
          </Link>
          
          {/* Summary */}
          <p className="font-serif text-sm md:text-base text-muted mb-4 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
          
          {/* Byline */}
          <div className="font-sans text-[10px] md:text-xs text-foreground uppercase tracking-widest font-bold">
            By {article.author}
          </div>
        </div>

        {/* Thumbnail with grayscale transition */}
        {!hideImage && (
          <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-border-dark overflow-hidden flex items-center justify-center text-[10px] text-muted uppercase tracking-widest text-center border border-foreground">
             <Link href={`/articles/${article.slug}`} className="w-full h-full flex items-center justify-center">
               <div className="w-full h-full bg-border-dark flex items-center justify-center text-muted uppercase tracking-widest tablet-hover-img text-xs">
                 IMG
               </div>
             </Link>
          </div>
        )}
      </div>
    </article>
  );
}
