"use client";

import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await loginUser(email);
      if (res.success) {
        // Redirect to homepage and refresh state
        window.location.href = "/";
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full px-4 py-16 md:py-24 bg-background">
      {/* Editorial Border Box */}
      <div className="border-4 border-double border-foreground p-8 bg-background">
        <div className="text-center mb-8 border-b border-foreground pb-6">
          <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent mb-2 block">
            Reader Portal
          </span>
          <h1 className="font-rollercoaster text-3xl font-black text-foreground uppercase tracking-normal">
            Log In
          </h1>
          <p className="font-serif text-xs text-muted mt-2 leading-relaxed">
            Enter your subscribed email address to access your subscription.
          </p>
        </div>

        {error && (
          <div className="bg-accent/10 border border-accent text-accent text-xs font-sans p-3 mb-6 text-center uppercase tracking-wide">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-sans text-[10px] font-black uppercase tracking-widest text-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border border-foreground px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent text-foreground w-full"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background font-sans text-xs uppercase tracking-widest font-black py-4 border border-foreground hover:bg-background hover:text-foreground transition-colors disabled:opacity-55 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Authenticating..." : "Log In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-foreground/30 text-center">
          <p className="font-sans text-xs text-muted">
            New reader?{" "}
            <Link href="/subscribe" className="underline font-bold text-foreground hover:text-accent transition-colors">
              Subscribe for Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
