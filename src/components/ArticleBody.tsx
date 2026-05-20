export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
      <div 
        className="prose-editorial"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
