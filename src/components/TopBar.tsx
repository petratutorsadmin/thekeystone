import Link from "next/link";
import { currentIssue } from "@/lib/data";

export default function TopBar() {
  return (
    <div className="w-full border-b border-border-dark py-2 px-4 md:px-8 text-xs md:text-sm font-sans text-muted flex justify-between items-center tracking-wide uppercase">
      <div>{currentIssue.title}</div>
      <div>{currentIssue.date}</div>
      <div className="hidden sm:block">{currentIssue.location}</div>
    </div>
  );
}
