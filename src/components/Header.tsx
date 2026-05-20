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

        {/* Mega-menu columns container (Desktop Only) */}
        <div className="hidden md:flex flex-1 overflow-x-auto bg-background divide-x divide-foreground/30 items-stretch overflow-y-hidden select-none">
          {departments.map((dept, index) => (
            <div 
              key={dept.slug} 
              className={`w-80 md:w-96 shrink-0 p-8 flex flex-col justify-start hover:bg-foreground/[0.01] transition-colors overflow-y-auto ${
                isMenuOpen ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: isMenuOpen ? `${index * 60}ms` : "0ms" }}
            >
              {/* Department Header */}
              <Link 
                href={`/departments/${dept.slug}`}
                onClick={toggleMenu}
                className="font-sans text-xl font-black uppercase tracking-wider mb-6 flex items-center justify-between border-b-2 border-foreground pb-3 group/title"
              >
                <span className="group-hover/title:text-accent transition-colors">{dept.title}</span>
                <span className="group-hover/title:translate-x-1 transition-transform font-sans">&rarr;</span>
              </Link>

              {/* Articles Feed inside department */}
              <div className="space-y-8 select-text">
                {dept.articles && dept.articles.length > 0 ? (
                  dept.articles.map((art, idx) => (
                    <div key={art.slug} className="group/art flex flex-col">
                      {idx === 0 ? (
                        // Main article in column (shows image placeholder + detailed text)
                        <>
                          <Link 
                            href={`/articles/${art.slug}`} 
                            onClick={toggleMenu}
                            className="block w-full aspect-video bg-border-subtle border border-foreground/30 mb-4 overflow-hidden relative"
                          >
                            <div className="w-full h-full flex items-center justify-center text-muted text-[10px] uppercase tracking-widest font-black tablet-hover-img">
                              IMG
                            </div>
                          </Link>
                          <Link href={`/articles/${art.slug}`} onClick={toggleMenu}>
                            <h4 className="font-rollercoaster text-lg font-bold text-foreground group-hover/art:text-accent transition-colors leading-tight mb-2 tracking-normal">
                              {art.title}
                            </h4>
                          </Link>
                          <p className="font-serif text-xs text-muted leading-relaxed line-clamp-3 mb-2">
                            {art.summary}
                          </p>
                          <span className="font-sans text-[10px] text-foreground uppercase tracking-widest font-bold">
                            By {art.author}
                          </span>
                        </>
                      ) : (
                        // Secondary text-only article in column
                        <div className="border-t border-foreground/15 pt-6">
                          <Link href={`/articles/${art.slug}`} onClick={toggleMenu}>
                            <h4 className="font-rollercoaster text-base font-bold text-foreground group-hover/art:text-accent transition-colors leading-tight mb-1.5 tracking-normal">
                              {art.title}
                            </h4>
                          </Link>
                          <p className="font-serif text-xs text-muted leading-relaxed line-clamp-2 mb-2">
                            {art.summary}
                          </p>
                          <span className="font-sans text-[10px] text-foreground uppercase tracking-widest font-bold">
                            By {art.author}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  // Empty column submission invite
                  <div className="py-8 text-center border-2 border-dashed border-foreground/30 p-4">
                    <p className="font-serif text-xs text-muted mb-4">No dispatches in this section yet.</p>
                    <Link 
                      href="/submit" 
                      onClick={toggleMenu} 
                      className="inline-block font-sans text-[9px] font-black uppercase tracking-widest border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-all"
                    >
                      Submit Writing
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Simplified Mobile Drawer Menu */}
        <div className="flex md:hidden flex-1 flex-col overflow-y-auto px-6 py-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent border-b border-foreground/20 pb-2">
              Sections
            </span>
            {departments.map((dept) => (
              <Link 
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                onClick={toggleMenu}
                className="font-sans text-2xl font-black uppercase tracking-wider hover:text-accent transition-colors flex items-center justify-between"
              >
                <span>{dept.title}</span>
                <span>&rarr;</span>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col space-y-4 pt-6 border-t border-foreground/20">
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent pb-2">
              Information
            </span>
            <Link 
              href="/about" 
              onClick={toggleMenu} 
              className="font-sans text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
            >
              Founders' Note & About
            </Link>
            <Link 
              href="/submit" 
              onClick={toggleMenu} 
              className="font-sans text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
            >
              Submissions
            </Link>
            <Link 
              href="/subscribe" 
              onClick={toggleMenu} 
              className="font-sans text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
            >
              Subscribe
            </Link>
            {session ? (
              <button 
                onClick={() => { toggleMenu(); handleLogout(); }}
                className="font-sans text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors text-left"
              >
                Log Out
              </button>
            ) : (
              <Link 
                href="/login" 
                onClick={toggleMenu} 
                className="font-sans text-xl font-bold uppercase tracking-wider hover:text-accent transition-colors"
              >
                Reader Log In
              </Link>
            )}
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
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto mix-blend-multiply group-hover:opacity-80 transition-opacity select-none pointer-events-none"
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
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} &bull; Tokyo Review
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
