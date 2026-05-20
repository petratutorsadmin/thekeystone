export type Department =
  | 'politics'
  | 'education'
  | 'culture'
  | 'essays'
  | 'interviews'
  | 'student-voices'
  | 'photography'
  | 'reviews';

export type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  department: Department;
  author: string;
  date: string;
  readingTime: string;
  summary: string;
  content?: string;
  imagePlaceholder?: string;
};

export type Issue = {
  id: string;
  title: string;
  date: string;
  location: string;
  editorsNote: string;
  coverImagePlaceholder?: string;
};

export type Contributor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  articleCount: number;
  imagePlaceholder?: string;
  rank?: number;
};

export const currentIssue: Issue = {
  id: '001',
  title: 'Issue 001',
  date: 'May 2026',
  location: 'Tokyo / International',
  editorsNote: 'Welcome to the inaugural issue of The Keystone. In this edition, we explore the foundations of a thoughtful education and present perspectives from our students and editors.',
  coverImagePlaceholder: 'issue-001-cover',
};

export const sampleArticles: Article[] = [
  {
    slug: 'architecture-of-thoughtful-education',
    title: 'The Architecture of a Thoughtful Education',
    subtitle: 'Reimagining the structures that support authentic learning.',
    department: 'education',
    author: 'Petra Editorial Desk',
    date: 'May 19, 2026',
    readingTime: '8 min read',
    summary: 'An exploration of how physical and intellectual spaces shape the way students engage with complex ideas.',
    imagePlaceholder: 'thoughtful-education-hero',
    content: `
      <p>Education is often spoken of as a journey, but it is equally an architecture. The structures we build - both physical and intellectual - determine the shape of the learning that happens within them.</p>
      <h2>The Foundation of Inquiry</h2>
      <p>True learning begins not with answers, but with a carefully cultivated environment of inquiry. When students are given the space to ask questions without the immediate pressure of a standardized metric, their engagement shifts from performative to authentic.</p>
      <blockquote>"A thoughtful education does not merely fill the mind; it builds the scaffolding for future thought."</blockquote>
      <p>In our experience at Petra, the most profound moments of understanding occur in the quiet spaces between structured lessons. These are the moments when a student connects a concept from literature to an observation in the real world.</p>
      <h3>Building for the Future</h3>
      <p>As we consider the future of education, we must prioritize flexibility and depth. The architecture of our curricula must be robust enough to challenge, yet porous enough to allow for unexpected discoveries.</p>
      <p>Ultimately, a thoughtful education is one that respects the student's agency, providing the tools and the space to construct their own understanding of the world.</p>
    `
  },
  {
    slug: 'starting-the-keystone',
    title: 'Why We Are Starting The Keystone',
    subtitle: 'A space for student thought and critical review.',
    department: 'essays',
    author: 'Yutaka Takaku & Riku Ishida',
    date: 'May 19, 2026',
    readingTime: '5 min read',
    summary: 'The founders of Petra discuss the need for a dedicated space for student voices and intellectual discourse.',
    imagePlaceholder: 'founders-letter-hero',
    content: `
      <p>Keystone was not created because we believed that the world needed another media platform. It was created because we increasingly felt that most modern institutions have lost the ability to speak about people as human beings.</p>
      <h2>The Abstraction of Human Life</h2>
      <p>The larger an institution becomes, the more human life is transformed into abstractions: metrics, performance, demographics, efficiency, and outcomes. Culture is no longer something practiced by people, but something for branding and politics. We want to resist this reduction.</p>
      <blockquote>"Our motto is: Make Education Human Again."</blockquote>
      <p>We believe strongly that students, workers, artists, tutors, and ordinary people whose voices are never heard, deserve spaces where everyone can think slowly and seriously, not as content for profit, but as human beings.</p>
    `
  },
  {
    slug: 'thinking-between-english-and-japanese',
    title: 'Thinking Between English and Japanese',
    subtitle: 'The cognitive space between languages.',
    department: 'student-voices',
    author: 'Student Contributor',
    date: 'May 18, 2026',
    readingTime: '6 min read',
    summary: 'A reflection on the challenges and nuances of navigating complex ideas across two languages.',
    imagePlaceholder: 'bilingual-hero',
    content: `
      <h2>The Threshold of Translation</h2>
      <p>To move between languages is not simply to swap words; it is to shift one's cognitive framework. When writing in Japanese, there is a certain spatial orientation and relationship-driven grammar that defines how a thought unfolds. In English, the structure demands an immediate declaration of agency.</p>
      <h3>The Double Vision</h3>
      <p>Navigating complex philosophical ideas across this linguistic boundary forces a student to see their own thoughts from the outside. You learn that what is self-evident in one language requires deep conceptual translation in another. This double vision is a profound intellectual advantage.</p>
    `
  },
  {
    slug: 'what-makes-a-good-mentor',
    title: 'What Makes a Good Mentor?',
    subtitle: 'Perspectives from the front lines of tutoring.',
    department: 'interviews',
    author: 'Petra Tutor Interview',
    date: 'May 15, 2026',
    readingTime: '10 min read',
    summary: 'An interview with a senior tutor on the art of guiding students rather than simply instructing them.',
    imagePlaceholder: 'mentor-interview-hero',
    content: `
      <h2>Beyond Instruction</h2>
      <p>In our conversation with a veteran mentor, we explore the subtle boundary between teaching and guiding. A teacher often sees their role as transmitting a body of knowledge. A mentor, however, is concerned with the student's relationship to that knowledge.</p>
      <blockquote>"The goal is not to solve the problem for them, but to help them tolerate the discomfort of not knowing."</blockquote>
      <h3>Cultivating Curiosity</h3>
      <p>Standardized learning systems condition students to seek the correct answer as quickly as possible. Mentorship is the antidote to this rush. It is about slowing down, tracing the lineage of a student's mistake, and turning it into an invitation for deeper investigation.</p>
    `
  },
  {
    slug: 'tokyo-after-class',
    title: 'Tokyo After Class',
    subtitle: 'Visual fragments of the city at dusk.',
    department: 'photography',
    author: 'Visual Desk',
    date: 'May 14, 2026',
    readingTime: 'Gallery',
    summary: 'A photographic essay capturing the quiet moments of students navigating Tokyo in the evening.',
    imagePlaceholder: 'tokyo-photography-hero',
    content: `
      <p>A series of visual observations capturing the city as classes end and the sun dips behind the high-rises. In the quiet backstreets of Shibuya and the neon corridors of Shinjuku, student life continues outside the bounds of the curriculum.</p>
      <blockquote>"The city is a silent text, waiting to be read."</blockquote>
      <p>We present these photographs not as marketing assets, but as quiet fragments of the everyday lives of our contributors under the weight of Tokyo's neon shadow.</p>
    `
  },
  {
    slug: 'english-education-not-just-test-scores',
    title: 'English Education Should Not Be Reduced to Test Scores',
    subtitle: 'A critique of current assessment paradigms.',
    department: 'politics',
    author: 'Guest Contributor',
    date: 'May 12, 2026',
    readingTime: '7 min read',
    summary: 'An argument for a more holistic approach to language education that values communication over standardized metrics.',
    imagePlaceholder: 'education-policy-hero',
    content: `
      <h2>The Measurement Fallacy</h2>
      <p>In the contemporary educational landscape, language proficiency is increasingly reduced to a score on a standardized test. This paradigm assumes that communication is a mechanical skill that can be quantified. In reality, it is a deeply human relationship.</p>
      <h3>The Limits of Metrics</h3>
      <p>When students are trained exclusively to pass examinations, they learn to avoid risk. They stick to memorized formulas and fear error. But error is the very place where learning occurs. We must move toward assessment models that value critical reading, translation, and genuine voice.</p>
    `
  },
  {
    slug: 'student-writing-matters-age-of-ai',
    title: 'Why Student Writing Still Matters in the Age of AI',
    subtitle: 'The enduring value of human thought.',
    department: 'culture',
    author: 'Petra Editorial Desk',
    date: 'May 10, 2026',
    readingTime: '9 min read',
    summary: 'Examining the role of original student writing when artificial intelligence can generate competent prose.',
    imagePlaceholder: 'ai-writing-hero',
    content: `
      <h2>The Prose Generator</h2>
      <p>With the advent of large language models capable of producing grammatically flawless essays in seconds, the traditional writing assignment has been thrown into crisis. Some suggest writing is obsolete. We suggest the opposite: it has never been more vital.</p>
      <blockquote>"Writing is not the recording of pre-existing thoughts; it is the very process of thinking itself."</blockquote>
      <h3>The Authentic Voice</h3>
      <p>An AI can synthesize patterns, but it cannot experience alienation, hope, or contradiction. When a student writes, they are wrestling with their own place in the world. Reclaiming writing as a slow, human practice is a vital act of intellectual resistance.</p>
    `
  }
];

export const sampleContributors: Contributor[] = [
  {
    id: 'yt',
    name: 'Yutaka Takaku',
    role: 'Founder & Editor',
    bio: 'Co-founder of Petra. Focuses on educational philosophy and systems design.',
    articleCount: 3,
  },
  {
    id: 'ri',
    name: 'Riku Ishida',
    role: 'Co-founder',
    bio: 'Co-founder of Petra. Writes on culture, language, and technology.',
    articleCount: 2,
  },
  {
    id: 'ed',
    name: 'Editorial Desk',
    role: 'Staff Writers',
    bio: 'The collective voice of the Petra editorial team.',
    articleCount: 12,
  }
];

export const recommendations = {
  book: { title: "The Dispossessed", author: "Ursula K. Le Guin", note: "A brilliant exploration of political systems and human nature." },
  album: { title: "Promises", author: "Floating Points, Pharoah Sanders & The London Symphony Orchestra", note: "A masterclass in restraint and collaboration." },
  film: { title: "Perfect Days", author: "Wim Wenders", note: "Finding poetry in the routine of everyday life in Tokyo." },
  exhibition: { title: "Architecture of Tomorrow", author: "Mori Art Museum", note: "Provocative concepts for future living spaces." }
};
