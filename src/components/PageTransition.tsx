"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  // Fade out the blank overlay to reveal the new page once the route changes
  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position to top of page
    setIsOverlayActive(false);
  }, [pathname]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      
      // Traverse up to find the anchor tag if clicked inside a nested element
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (target && target.tagName === "A") {
        const anchor = target as HTMLAnchorElement;
        const href = anchor.getAttribute("href");

        // Intercept only standard internal routes
        if (
          href &&
          href.startsWith("/") &&
          !href.startsWith("#") &&
          anchor.target !== "_blank" &&
          !e.metaKey && 
          !e.ctrlKey
        ) {
          const targetPathname = href.split("?")[0].split("#")[0];
          if (targetPathname === pathname) {
            // Already on this page, let it be a no-op instead of locking the screen
            return;
          }

          e.preventDefault();
          
          // 1. Fade in the blank beige overlay over the current page
          setIsOverlayActive(true);

          // 2. Perform page routing after overlay covers everything (120ms)
          setTimeout(() => {
            router.push(href);
          }, 120);
        }
      }
    };

    // Trigger overlay transition briefly during browser back/forward buttons
    const handlePopState = () => {
      setIsOverlayActive(true);
      setTimeout(() => {
        setIsOverlayActive(false);
      }, 120);
    };

    document.addEventListener("click", handleLinkClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router, pathname]);

  return (
    <>
      {/* Full-Screen Blank Newsprint Beige Overlay */}
      <div 
        className={`fixed inset-0 bg-background z-[9999] pointer-events-none transition-opacity duration-200 ease-in-out ${
          isOverlayActive ? "opacity-100" : "opacity-0"
        }`}
      />
      
      {/* Page Content underneath */}
      <div className="flex-1 flex flex-col w-full">
        {children}
      </div>
    </>
  );
}
