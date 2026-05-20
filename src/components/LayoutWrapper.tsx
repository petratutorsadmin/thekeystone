"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";

interface LayoutWrapperProps {
  children: React.ReactNode;
  departments: any[];
  footer: React.ReactNode;
  session: { email: string } | null;
}

export default function LayoutWrapper({ children, departments, footer, session }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return (
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
    );
  }

  return (
    <PageTransition>
      <Header departments={departments} session={session} />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      {footer}
    </PageTransition>
  );
}
