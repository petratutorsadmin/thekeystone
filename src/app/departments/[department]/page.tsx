import { client } from "@/sanity/client";
import { articlesByDepartmentQuery, departmentQuery } from "@/sanity/queries";
import DepartmentGrid from "@/components/DepartmentGrid";
import { type Article } from "@/lib/data";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function DepartmentPage({ params }: { params: Promise<{ department: string }> }) {
  const resolvedParams = await params;
  const department = resolvedParams.department;
  
  let articles: Article[] = [];
  let deptInfo: { title: string, description: string } | null = null;

  try {
    const rawArticles = await client.fetch(articlesByDepartmentQuery, { department });
    articles = rawArticles.map((a: any) => ({
      slug: a.slug,
      title: a.title,
      subtitle: a.subtitle,
      summary: a.summary,
      department: a.department || 'essays',
      author: a.author || 'Contributor',
      date: a.date ? new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'May 2026',
      readingTime: a.readingTime || '5 min read',
      imagePlaceholder: a.imagePlaceholder,
    }));

    deptInfo = await client.fetch(departmentQuery, { department });
  } catch (error) {
    console.error("Error fetching department articles from Sanity:", error);
  }

  const title = deptInfo?.title || department;
  const description = deptInfo?.description || `Articles published under the ${department.replace('-', ' ')} department.`;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-12 md:py-16">
      {articles.length > 0 ? (
        <DepartmentGrid 
          title={title} 
          description={description}
          articles={articles} 
        />
      ) : (
        <div className="text-center py-24 border border-dashed border-foreground/30 p-8">
          <h1 className="font-rollercoaster text-4xl md:text-5xl font-bold mb-4 capitalize">
            {title.replace('-', ' ')}
          </h1>
          <p className="font-sans text-muted max-w-md mx-auto font-bold">
            There are currently no articles in this department. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const departments = await client.fetch(`*[_type == "department"] { "slug": slug.current }`);
    return departments.map((dept: any) => ({
      department: dept.slug,
    }));
  } catch (e) {
    console.error("Failed to generate static params for departments", e);
    return [];
  }
}
