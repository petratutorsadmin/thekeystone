import { type Article } from "@/lib/data";

export default function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="mb-12 border-b border-border-dark pb-12">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center pt-16 pb-12">
        <div className="mb-6">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-accent border-b border-accent pb-1">
            {article.department}
          </span>
        </div>
        
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-6">
          {article.title}
        </h1>
        
        {article.subtitle && (
          <p className="font-serif text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed mb-10">
            {article.subtitle}
          </p>
        )}
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 font-sans text-xs uppercase tracking-wider text-muted">
          <span>By <strong className="text-foreground">{article.author}</strong></span>
          <span className="hidden md:inline">&bull;</span>
          <span>{article.date}</span>
          <span className="hidden md:inline">&bull;</span>
          <span>{article.readingTime}</span>
        </div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="w-full aspect-[21/9] bg-border-dark flex items-center justify-center text-sm font-sans tracking-widest uppercase text-muted">
          {article.imagePlaceholder || "Hero Image Placeholder"}
        </div>
      </div>
    </header>
  );
}
