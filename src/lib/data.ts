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
