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
  { title: "Voices", slug: "voices" }, // Representing minorities/student perspectives
];

export default async function Navbar() {
  let departments: DeptItem[] = [];
  
  try {
    const fetched = await client.fetch(`*[_type == "department"] { title, "slug": slug.current }`);
    if (fetched && fetched.length > 0) {
      departments = fetched;
    } else {
      departments = fallbackDepts;
    }
  } catch (error) {
    console.error("Error fetching navigation departments from Sanity:", error);
    departments = fallbackDepts;
  }

  return (
    <nav className="w-full border-b-2 border-foreground sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 overflow-x-auto">
        <ul className="flex items-center justify-start md:justify-center whitespace-nowrap min-w-max md:min-w-0 py-3 md:py-4 gap-6 md:gap-8">
          {departments.map((item) => (
            <li key={item.slug}>
              <Link 
                href={`/departments/${item.slug}`}
                className="font-sans text-sm md:text-base font-bold text-foreground hover:text-accent transition-colors duration-200 uppercase tracking-wider"
              >
                {item.title}
              </Link>
            </li>
          ))}
          <li>
            <Link 
              href="/submit"
              className="font-sans text-sm md:text-base font-bold text-accent hover:text-foreground transition-colors duration-200 uppercase tracking-wider"
            >
              Submit
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
