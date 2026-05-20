"use client";

import { useState } from "react";
import Link from "next/link";
import { logoutUser } from "@/lib/auth";

interface ArticleItem {
  title: string;
  slug: string;
  summary: string;
  author: string;
}

interface DeptItem {
  title: string;
  slug: string;
  articles: ArticleItem[];
}

interface HeaderProps {
  departments: DeptItem[];
  session?: { email: string } | null;
}

export default function Header({ departments, session }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await logoutUser();
    window.location.reload();
  };

  return (
    <>
      {/* Full-Screen Horizontal Sections Drawer */}
      <div 
        className={`fixed inset-0 bg-background z-50 overflow-hidden flex flex-col transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? "opacity-100 pointer-events-auto visible" 
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        {/* Drawer Top Header Panel */}
        <div className="h-24 px-4 md:px-8 border-b-2 border-foreground flex justify-between items-center bg-background shrink-0">
          {/* Left Drawer Menu Icon (For symmetry) */}
          <div className="flex items-center gap-3 opacity-30 select-none">
            <div className="flex flex-col gap-2">
              <span className="w-6 h-[3px] bg-foreground"></span>
              <span className="w-6 h-[3px] bg-foreground"></span>
              <span className="w-6 h-[3px] bg-foreground"></span>
            </div>
            <span className="font-sans text-xs font-black uppercase tracking-widest text-foreground">
              Menu
            </span>
          </div>

          {/* Center: Brand Nameplate */}
          <div className="flex justify-center items-center">
            <img 
              src="/logo.png" 
              alt="The Keystone Logo" 
              className="h-10 w-auto mix-blend-multiply select-none pointer-events-none"
            />
          </div>

          {/* Right: Close Drawer Button */}
          <button 
            onClick={toggleMenu}
            className="font-sans text-3xl font-bold hover:text-accent transition-colors p-2 cursor-pointer select-none"
            aria-label="Close sections menu"
          >
            &times;
          </button>
        </div>

        {/* Structured Directory Menu (Responsive Overlay) */}
        <div className="flex-1 overflow-y-auto px-6 py-12 md:py-20 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Column 1: Sections */}
          <div className="flex flex-col space-y-4">
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent border-b border-foreground/20 pb-2">
              Sections
            </span>
            <div className="flex flex-col space-y-3.5">
              {departments.map((dept) => (
                <Link 
                  key={dept.slug}
                  href={`/departments/${dept.slug}`}
                  onClick={toggleMenu}
                  className="font-sans text-2xl md:text-3xl font-black uppercase tracking-wider hover:text-accent transition-colors flex items-center justify-between group"
                >
                  <span>{dept.title}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity font-sans text-xl">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Column 2: Pages & Information */}
          <div className="flex flex-col space-y-4">
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent border-b border-foreground/20 pb-2">
              Information
            </span>
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                onClick={toggleMenu} 
                className="font-sans text-lg md:text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
              >
                Homepage
              </Link>
              <Link 
                href="/about" 
                onClick={toggleMenu} 
                className="font-sans text-lg md:text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
              >
                Founders' Note
              </Link>
              <Link 
                href="/submit" 
                onClick={toggleMenu} 
                className="font-sans text-lg md:text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
              >
                Submissions
              </Link>
              <Link 
                href="/subscribe" 
                onClick={toggleMenu} 
                className="font-sans text-lg md:text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
              >
                Subscribe
              </Link>
              {session ? (
                <button 
                  onClick={() => { toggleMenu(); handleLogout(); }}
                  className="font-sans text-lg md:text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors text-left"
                >
                  Log Out
                </button>
              ) : (
                <Link 
                  href="/login" 
                  onClick={toggleMenu} 
                  className="font-sans text-lg md:text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
                >
                  Reader Log In
                </Link>
              )}
            </div>
          </div>

          {/* Column 3: Brand Statement */}
          <div className="flex flex-col space-y-4">
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent border-b border-foreground/20 pb-2">
              The Keystone
            </span>
            <div className="space-y-6">
              <p className="font-serif text-sm md:text-base text-muted leading-relaxed">
                A publication of politics, culture, education, criticism, and student thought. Published digitally in Tokyo, Japan.
              </p>
              <p className="font-sans text-xs text-muted leading-relaxed font-bold">
                Inquiries & Submissions:<br />
                <a href="mailto:admin@petratutors.com" className="underline hover:text-accent transition-colors">
                  admin@petratutors.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Header Block */}
      <header className="w-full bg-background border-b-2 border-foreground">
        {/* Top Header Panel - Grid based to prevent logo collision */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          {/* Left: Hamburger menu */}
          <div className="flex justify-start">
            <button 
              onClick={toggleMenu}
              className="flex items-center gap-3 group focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Drawer"
            >
              <div className="flex flex-col gap-2 justify-center">
                <span className="w-6 h-[3px] bg-foreground group-hover:bg-accent transition-colors"></span>
                <span className="w-6 h-[3px] bg-foreground group-hover:bg-accent transition-colors"></span>
                <span className="w-6 h-[3px] bg-foreground group-hover:bg-accent transition-colors"></span>
              </div>
              <span className="font-sans text-xs font-black uppercase tracking-widest text-foreground group-hover:text-accent transition-colors">
                Menu
              </span>
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="flex justify-center text-center">
            <Link href="/" className="group flex justify-center items-center">
              <img 
                src="/logo.png" 
                alt="The Keystone Logo" 
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto mix-blend-multiply group-hover:opacity-80 transition-opacity select-none pointer-events-none"
              />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-4">
            {session ? (
              <>
                <span className="hidden lg:inline-block font-sans text-[10px] uppercase tracking-wider text-muted font-bold">
                  {session.email}
                </span>
                <button 
                  onClick={handleLogout}
                  className="font-sans text-xs font-bold uppercase tracking-widest border border-foreground px-4 py-2.5 hover:bg-foreground hover:text-background transition-all cursor-pointer"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="hidden md:inline-block font-sans text-xs font-bold uppercase tracking-widest border border-foreground px-4 py-2.5 hover:bg-foreground hover:text-background transition-all"
                >
                  Log In
                </Link>
                <Link 
                  href="/subscribe" 
                  className="bg-accent text-white font-sans text-xs font-extrabold uppercase tracking-widest px-4 py-2.5 rounded-full hover:bg-foreground transition-all"
                >
                  Subscribe
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Bounded Date Line */}
        <div className="w-full border-t border-foreground py-3 px-4 text-center">
          <p className="font-sans text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-muted">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}{" • "}Tokyo
          </p>
        </div>
      </header>

      {/* Floating Sticky Browse Button */}
      <button 
        onClick={toggleMenu}
        className="hidden md:flex fixed top-0 bottom-0 right-0 w-[32px] h-screen bg-background border-l border-foreground z-40 font-sans text-[9px] font-black uppercase tracking-[0.25em] text-accent hover:bg-foreground hover:text-white transition-all cursor-pointer select-none text-center writing-vertical items-center justify-center"
      >
        Browse Our Sections &nbsp; &uarr;
      </button>
    </>
  );
}
