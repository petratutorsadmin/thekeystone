export default function SubmitPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 md:px-8 py-12 md:py-16">
      <div className="mb-12 border-b-4 border-foreground pb-6">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">
          Submissions
        </h1>
        <p className="font-sans text-lg text-muted">
          Guidelines for contributing to The Keystone Review.
        </p>
      </div>

      <div className="prose-editorial">
        <h2>Who Can Submit</h2>
        <p>
          The Keystone Review accepts submissions from current Petra students, alumni, and invited guest contributors. We are looking for thoughtful, considered writing that engages critically with its subject matter.
        </p>

        <h2>Accepted Formats</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><strong>Essays</strong> (1,500 - 3,000 words): Long-form exploration of a single idea or theme.</li>
          <li><strong>Opinion</strong> (800 - 1,200 words): Argued perspectives on current events or educational policy.</li>
          <li><strong>Interviews</strong>: Q&A format with notable figures or peers. Please pitch the subject first.</li>
          <li><strong>Reviews</strong> (600 - 1,000 words): Critical evaluations of books, films, exhibitions, or cultural phenomena.</li>
          <li><strong>Photography</strong>: Photo essays of 5-10 images with a unifying theme and brief accompanying text.</li>
          <li><strong>Student Reflections</strong> (500 - 800 words): Personal narratives about the learning experience.</li>
        </ul>

        <h2>Tone Expectations</h2>
        <p>
          Submissions should adopt a serious, intellectual, and calm tone. Avoid hyperbole, marketing language, and generic filler phrases. We value clarity over complexity, and insight over provocation. Ensure your claims are grounded in specific observations or experiences.
        </p>

        <h2>How to Submit</h2>
        <p>
          Please email your submissions as an attached Google Doc or Word document. Photography should be submitted as a low-resolution PDF or ZIP file initially. Include a brief bio (max 50 words) with your submission.
        </p>

        <div className="mt-12 text-center pt-8 border-t border-border-dark">
          <a href="mailto:editor@petra.example.com" className="inline-block bg-foreground text-background font-sans text-sm uppercase tracking-widest font-bold py-4 px-8 hover:bg-accent transition-colors">
            Submit by Email
          </a>
        </div>
      </div>
    </div>
  );
}
