"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SaveButtonProps {
  articleSlug: string;
  articleTitle: string;
  userEmail?: string;
}

export default function SaveButton({ articleSlug, articleTitle, userEmail }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!userEmail) return;
    try {
      const raw = localStorage.getItem(`saved_articles_${userEmail}`);
      if (raw) {
        const saved = JSON.parse(raw) as { title: string; slug: string }[];
        setIsSaved(saved.some((item) => item.slug === articleSlug));
      }
    } catch (e) {
      console.error(e);
    }
  }, [articleSlug, userEmail]);

  const handleToggleSave = () => {
    if (!userEmail) return;
    try {
      const raw = localStorage.getItem(`saved_articles_${userEmail}`);
      let saved = raw ? (JSON.parse(raw) as { title: string; slug: string }[]) : [];

      if (isSaved) {
        saved = saved.filter((item) => item.slug !== articleSlug);
        setIsSaved(false);
      } else {
        saved.push({ title: articleTitle, slug: articleSlug });
        setIsSaved(true);
      }
      localStorage.setItem(`saved_articles_${userEmail}`, JSON.stringify(saved));
      // Dispatch storage event to update Header menu
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error(e);
    }
  };

  if (!userEmail) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 border border-foreground/35 px-4 py-2.5 font-sans text-[10px] font-black uppercase tracking-widest text-muted hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
      >
        <span>☆</span>
        <span>Log in to Save</span>
      </Link>
    );
  }

  return (
    <button
      onClick={handleToggleSave}
      className={`inline-flex items-center gap-2 border px-4 py-2.5 font-sans text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${
        isSaved 
          ? "border-accent bg-accent text-background hover:bg-accent/90" 
          : "border-foreground/35 text-foreground hover:border-foreground"
      }`}
    >
      <span>{isSaved ? "★" : "☆"}</span>
      <span>{isSaved ? "Saved" : "Save Article"}</span>
    </button>
  );
}
