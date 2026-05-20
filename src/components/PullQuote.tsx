export default function PullQuote({ quote, author }: { quote: string, author?: string }) {
  return (
    <figure className="my-12 py-8 border-y border-border-dark max-w-4xl mx-auto px-4 md:px-12 text-center">
      <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground leading-snug mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {author && (
        <figcaption className="font-sans text-xs uppercase tracking-widest text-muted">
          - {author}
        </figcaption>
      )}
    </figure>
  );
}
