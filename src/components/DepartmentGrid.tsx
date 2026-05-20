import { type Article } from "@/lib/data";
import ArticlePreview from "./ArticlePreview";

export default function DepartmentGrid({ articles, title, description }: { articles: Article[], title: string, description?: string }) {
  return (
    <div className="w-full">
      <div className="mb-12 border-b-4 border-foreground pb-6">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground capitalize mb-4">
          {title.replace('-', ' ')}
        </h1>
        {description && (
          <p className="font-sans text-lg text-muted max-w-2xl">
            {description}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {articles.map((article) => (
          <div key={article.slug} className="h-full border-t border-border-dark pt-6">
             <ArticlePreview article={article} hideImage={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
