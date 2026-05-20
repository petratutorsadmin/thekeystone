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
  editorsNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  coverImagePlaceholder: 'issue-001-cover',
};

export const sampleArticles: Article[] = [
  {
    slug: 'architecture-of-thoughtful-education',
    title: 'Lorem Ipsum Dolor',
    subtitle: 'Consectetur adipiscing elit, sed do eiusmod.',
    department: 'education',
    author: 'Lorem Ipsum',
    date: 'May 19, 2026',
    readingTime: '8 min read',
    summary: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    imagePlaceholder: 'thoughtful-education-hero',
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2>Duis Aute Irure</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <blockquote>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</blockquote>
      <p>Mollis pretium lorem primis senectus habitasse. Pretium aenean platea nisl sociosqu accumsan.</p>
    `
  },
  {
    slug: 'starting-the-keystone',
    title: 'Sed do Eiusmod Tempor',
    subtitle: 'Incididunt ut labore et dolore magna aliqua.',
    department: 'essays',
    author: 'Dolor Sit Amet',
    date: 'May 19, 2026',
    readingTime: '5 min read',
    summary: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    imagePlaceholder: 'founders-letter-hero',
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2>Duis Aute Irure</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <blockquote>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</blockquote>
    `
  },
  {
    slug: 'thinking-between-english-and-japanese',
    title: 'Ut Enim ad Minim Veniam',
    subtitle: 'Quis nostrud exercitation ullamco laboris nisi.',
    department: 'student-voices',
    author: 'Adipiscing Elit',
    date: 'May 18, 2026',
    readingTime: '6 min read',
    summary: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imagePlaceholder: 'bilingual-hero',
    content: `
      <h2>Duis Aute Irure</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h3>Excepteur Sint Occaecat</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `
  },
  {
    slug: 'what-makes-a-good-mentor',
    title: 'Duis Aute Irure Dolor',
    subtitle: 'Reprehenderit in voluptate velit esse cillum.',
    department: 'interviews',
    author: 'Tempor Incididunt',
    date: 'May 15, 2026',
    readingTime: '10 min read',
    summary: 'Mollis pretium lorem primis senectus habitasse platea nisl sociosqu accumsan.',
    imagePlaceholder: 'mentor-interview-hero',
    content: `
      <h2>Duis Aute Irure</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <blockquote>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</blockquote>
      <h3>Excepteur Sint Occaecat</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `
  },
  {
    slug: 'tokyo-after-class',
    title: 'Excepteur Sint Occaecat',
    subtitle: 'Cupidatat non proident, sunt in culpa qui.',
    department: 'photography',
    author: 'Labore Et Dolore',
    date: 'May 14, 2026',
    readingTime: 'Gallery',
    summary: 'Accumsan class donec elementum tristique facilisis platea nisl sociosqu accumsan.',
    imagePlaceholder: 'tokyo-photography-hero',
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <blockquote>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</blockquote>
    `
  },
  {
    slug: 'english-education-not-just-test-scores',
    title: 'Mollis Pretium Lorem Primis',
    subtitle: 'Senectus habitasse platea nisl sociosqu accumsan.',
    department: 'politics',
    author: 'Nisl Sociosqu',
    date: 'May 12, 2026',
    readingTime: '7 min read',
    summary: 'Elementum tristique facilisis platea nisl sociosqu accumsan class donec elementum.',
    imagePlaceholder: 'education-policy-hero',
    content: `
      <h2>Duis Aute Irure</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h3>Excepteur Sint Occaecat</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `
  },
  {
    slug: 'student-writing-matters-age-of-ai',
    title: 'Aenean Platea Nisl Sociosqu',
    subtitle: 'Accumsan class donec elementum tristique facilisis.',
    department: 'culture',
    author: 'Class Donec',
    date: 'May 10, 2026',
    readingTime: '9 min read',
    summary: 'Tristique facilisis platea nisl sociosqu accumsan class donec elementum tristique.',
    imagePlaceholder: 'ai-writing-hero',
    content: `
      <h2>Duis Aute Irure</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <blockquote>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</blockquote>
      <h3>Excepteur Sint Occaecat</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `
  }
];

export const sampleContributors: Contributor[] = [
  {
    id: 'yt',
    name: 'Lorem Ipsum',
    role: 'Placeholder Editor',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    articleCount: 3,
  },
  {
    id: 'ri',
    name: 'Dolor Sit Amet',
    role: 'Placeholder Contributor',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    articleCount: 2,
  },
  {
    id: 'ed',
    name: 'Consectetur Adipiscing',
    role: 'Placeholder Writer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    articleCount: 12,
  }
];

export const recommendations = {
  book: { title: "Lorem Ipsum Book", author: "Dolor Sit Amet", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." },
  album: { title: "Lorem Ipsum Album", author: "Adipiscing Elit", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." },
  film: { title: "Lorem Ipsum Film", author: "Tempor Incididunt", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." },
  exhibition: { title: "Lorem Ipsum Exhibition", author: "Labore Et Dolore", note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." }
};
