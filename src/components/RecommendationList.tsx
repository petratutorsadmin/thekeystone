export interface Recommendation {
  _id?: string;
  category: string;
  title: string;
  author: string;
  note: string;
}

export default function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="border border-border-dark p-8">
      <h3 className="font-sans text-xs font-black uppercase tracking-widest text-foreground mb-8 text-center border-b border-border-dark pb-4">
        Weekly Notes
      </h3>
      <div className="space-y-8">
        {recommendations.map((item, index) => (
          <div key={item._id || index} className="group border-b border-foreground/10 last:border-b-0 pb-6 last:pb-0">
            <h4 className="font-sans text-[10px] md:text-xs font-black uppercase tracking-widest text-accent mb-2">
              {item.category}
            </h4>
            <h5 className="font-serif text-lg font-bold text-foreground leading-tight">
              {item.title}
            </h5>
            <p className="font-serif text-sm italic text-muted mt-2">
              {item.author}
            </p>
            <p className="font-serif text-sm text-foreground mt-4 leading-relaxed">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
