import Link from "next/link";
import { client } from "@/sanity/client";

interface DeptItem {
  title: string;
  slug: string;
}

const fallbackDepts: DeptItem[] = [
  { title: "Current Affairs", slug: "current-affairs" },
  { title: "Politics", slug: "politics" },
  { title: "Opinions", slug: "opinions" },
  { title: "Philosophy", slug: "philosophy" },
  { title: "Science", slug: "science" },
  { title: "Art", slug: "art" },
  { title: "Music", slug: "music" },
  { title: "Poetry", slug: "poetry" },
  { title: "Photography", slug: "photography" },
  { title: "Voices", slug: "voices" },
];

export default async function Footer() {
  let departments: DeptItem[] = [];
  
  try {
    const fetched = await client.fetch(`*[_type == "department"] { title, "slug": slug.current }`);
    if (fetched && fetched.length > 0) {
      departments = fetched;
    } else {
      departments = fallbackDepts;
    }
  } catch (error) {
    console.error("Error fetching footer departments from Sanity:", error);
    departments = fallbackDepts;
  }

  return (
    <footer className="w-full border-t-2 border-foreground mt-24 py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-rollercoaster text-3xl font-black uppercase tracking-normal text-foreground mb-4">
            Keystone
          </h2>
          <p className="font-sans text-sm text-muted max-w-sm leading-relaxed font-bold">
            A Petra review of politics, culture, education, criticism, and student thought. Published digitally in Tokyo by{" "}
            <a 
              href="https://petratutors.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-accent transition-colors"
            >
              Petra Education
            </a>.
          </p>
        </div>
        
        {/* Render all departments, split into two columns for layout balance */}
        <div className="col-span-1">
          <h3 className="font-sans text-xs font-black uppercase tracking-widest text-foreground mb-4">
            Sections & Departments
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {departments.map((dept) => (
              <li key={dept.slug}>
                <Link 
                  href={`/departments/${dept.slug}`}
                  className="font-sans text-sm text-muted hover:text-accent font-bold transition-colors block"
                >
                  {dept.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-xs font-black uppercase tracking-widest text-foreground mb-4">
            Information
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="font-sans text-sm text-muted hover:text-accent font-bold transition-colors">
                About & Founder's Note
              </Link>
            </li>
            <li>
              <Link href="/issues/001" className="font-sans text-sm text-muted hover:text-accent font-bold transition-colors">
                Current Issue
              </Link>
            </li>
            <li>
              <Link href="/contributors" className="font-sans text-sm text-muted hover:text-accent font-bold transition-colors">
                Contributors
              </Link>
            </li>
            <li>
              <Link href="/submit" className="font-sans text-sm text-muted hover:text-accent font-bold transition-colors">
                Submissions
              </Link>
            </li>
            <li className="pt-2 border-t border-foreground/10">
              <a 
                href="https://petratutors.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-sans text-sm text-accent hover:text-foreground font-bold transition-colors block"
              >
                Petra Education &rarr;
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-foreground/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-xs text-muted font-bold">
          &copy; {new Date().getFullYear()} Petra Education. All rights reserved.
        </p>
        <p className="font-sans text-xs text-muted font-bold">
          Design System: Broadside Editorial Standard
        </p>
      </div>
    </footer>
  );
}
