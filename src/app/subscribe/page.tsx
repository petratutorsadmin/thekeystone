"use client";

import { useState } from "react";
import Link from "next/link";
import { subscribeUser } from "@/lib/auth";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await subscribeUser(email);
      if (res.success) {
        setSuccess(true);
        // Refresh page to update header state and redirect to home
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        setError(res.error || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToDispatch = () => {
    const el = document.getElementById("dispatch-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const input = el.querySelector("input");
      if (input) input.focus();
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 md:px-8 py-12 md:py-16 bg-background">
      {/* Header */}
      <div className="mb-12 border-b-4 border-foreground pb-6 text-center">
        <span className="font-sans text-xs font-black uppercase tracking-widest text-accent mb-2 block">
          Keystone is, and always will be, 100% free.
        </span>
        <h1 className="font-rollercoaster text-5xl md:text-6xl font-black text-foreground uppercase tracking-normal">
          Read & Support
        </h1>
        <p className="font-sans text-base text-muted max-w-xl mx-auto mt-4 leading-relaxed font-bold">
          We believe high-quality essays, criticism, and art should be accessible to everyone. Our operations are supported entirely by voluntary contributions.
        </p>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* Tier 1: Free Digital */}
        <div className="border border-foreground p-8 flex flex-col justify-between bg-background">
          <div>
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-muted">Option 01</span>
            <h3 className="font-rollercoaster text-2xl font-black uppercase mt-2 mb-1">Digital</h3>
            <span className="font-sans text-xs font-bold text-accent">Free Forever</span>
            <p className="font-serif text-sm text-muted mt-6 leading-relaxed">
              Full access to all online essays, archives, and our weekly chronological newsletter dispatches from "The Surf".
            </p>
          </div>
          <div className="mt-8">
            <button 
              onClick={scrollToDispatch}
              className="w-full bg-foreground text-background font-sans text-xs uppercase tracking-widest font-black py-3 hover:bg-accent transition-colors"
            >
              Access Now
            </button>
          </div>
        </div>

        {/* Tier 2: Free Print (Double Border) */}
        <div className="border-4 border-double border-accent p-8 flex flex-col justify-between bg-background relative opacity-85">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white px-3 py-1 font-sans text-[8px] font-black uppercase tracking-widest">
            Print Issue
          </div>
          <div>
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-accent">Option 02</span>
            <h3 className="font-rollercoaster text-2xl font-black uppercase mt-2 mb-1">Print Edition</h3>
            <span className="font-sans text-xs font-bold text-accent">Free for Students</span>
            <p className="font-serif text-sm text-foreground mt-6 leading-relaxed">
              Get a physical copy of our quarterly publication. Free for local Petra students/members. Optional $15 postage contribution for external readers.
            </p>
          </div>
          <div className="mt-8">
            <button disabled className="w-full bg-accent/10 border-2 border-accent text-accent font-sans text-xs uppercase tracking-widest font-black py-3 cursor-not-allowed select-none">
              Coming Soon
            </button>
          </div>
        </div>

        {/* Tier 3: Optional Patron Support */}
        <div className="border border-foreground p-8 flex flex-col justify-between bg-background opacity-85">
          <div>
            <span className="font-sans text-[10px] font-black uppercase tracking-widest text-muted">Option 03</span>
            <h3 className="font-rollercoaster text-2xl font-black uppercase mt-2 mb-1">Keystone Patron</h3>
            <span className="font-sans text-xs font-bold text-accent">Voluntary Supporter</span>
            <p className="font-serif text-sm text-muted mt-6 leading-relaxed">
              Fund printing costs and student journalism. Patrons receive print issues automatically and special recognition in the masthead.
            </p>
          </div>
          <div className="mt-8">
            <button disabled className="w-full bg-foreground/10 border-2 border-foreground text-foreground font-sans text-xs uppercase tracking-widest font-black py-3 cursor-not-allowed select-none">
              Coming Soon
            </button>
          </div>
        </div>

      </div>

      {/* Simple Newsletter Sign Up Input Form */}
      <div id="dispatch-form" className="border border-foreground p-8 md:p-12 text-center bg-background max-w-2xl mx-auto">
        <h3 className="font-rollercoaster text-2xl font-black uppercase mb-3">Keystone Dispatch</h3>
        <p className="font-serif text-sm text-muted mb-8 leading-relaxed max-w-md mx-auto">
          Enter your email to join our mailing list and receive the weekly digital dispatches.
        </p>

        {success && (
          <div className="bg-foreground text-background text-xs font-sans p-3 mb-6 text-center uppercase tracking-wide">
            Thank you for subscribing! Logging you in...
          </div>
        )}

        {error && (
          <div className="bg-accent/10 border border-accent text-accent text-xs font-sans p-3 mb-6 text-center uppercase tracking-wide">
            {error}
          </div>
        )}

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-background border border-foreground px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent text-foreground"
            required
            disabled={loading || success}
          />
          <button 
            type="submit" 
            disabled={loading || success}
            className="bg-foreground text-background font-sans text-xs uppercase tracking-widest font-black py-3 px-6 hover:bg-accent hover:text-white transition-colors disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
