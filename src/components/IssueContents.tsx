import Link from "next/link";
import { type Article } from "@/lib/data";

export default function IssueContents({ articles }: { articles: Article[] }) {
  // Group articles by department
  const grouped = articles.reduce((acc, article) => {
    const dept = article.department;
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(article);
    return acc;
  }, {} as Record<string, Article[]>);

  return (
    <div className="bg-border-subtle/30 p-6 md:p-8">
      <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-foreground mb-8 border-b border-border-dark pb-4">
        In This Issue
      </h3>
      <div className="space-y-8">
        {Object.entries(grouped).map(([dept, deptArticles]) => (
          <div key={dept}>
            <h4 className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent mb-4">
              {dept}
            </h4>
            <ul className="space-y-4">
              {deptArticles.map(article => (
                <li key={article.slug} className="group">
                  <Link href={`/articles/${article.slug}`} className="flex flex-col">
                    <span className="font-rollercoaster text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {article.title}
                    </span>
                    <span className="font-sans text-xs text-muted mt-1">
                      {article.author}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
