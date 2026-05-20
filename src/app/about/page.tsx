"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 md:px-8 py-12 md:py-16 bg-background">
      {/* Editorial Header */}
      <div className="border-b-4 border-foreground pb-6 mb-10 text-center md:text-left">
        <span className="font-sans text-xs font-black uppercase tracking-widest text-accent mb-2 block">
          FOUNDERS' NOTE
        </span>
        <h1 className="font-rollercoaster text-4xl md:text-5xl font-black text-foreground uppercase tracking-normal leading-none">
          Why We Built Keystone
        </h1>
        <p className="font-sans text-sm text-muted mt-3 font-bold uppercase tracking-wider">
          Published May 2026 &bull; Tokyo, Japan
        </p>
      </div>

      {/* Main Letter Body */}
      <article className="font-serif text-base md:text-lg text-foreground leading-relaxed space-y-6">
        <p className="first-letter:text-5xl first-letter:font-black first-letter:font-rollercoaster first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-accent">
          Keystone was not created because we believed that the world needed another media platform. 
        </p>
        
        <p>
          It was created because we increasingly felt that most modern institutions, whether that was corporations or universities or media organisations or even education systems, have lost the ability to speak about people as human beings. The new trend, or the new fad, is to look at people as the relations of relationships they have with other people or what they are relative to some abstract ideal.
        </p>

        <p>
          The larger an institution becomes, the more human life can be transformed into abstractions. Abstractions of metrics, of performance, demographics, efficiency, profitability, outcomes and engagement, labor and content. Students tend to become numbers and workers turn into replaceable units. Culture no longer becomes something practiced by people, but something for branding and politics. We all know that politics, as it is now, is nothing more than a spectacle. And even education is becoming like that. Increasingly, and we feel it being university students and founders of an education company, that it feels less like a relationship between people, and more like an industrial process that is being optimised for profitability and output.
        </p>

        {/* Elegant Pull Quote block */}
        <blockquote className="border-y border-foreground py-6 my-8 font-rollercoaster text-lg md:text-xl text-accent text-center px-4">
          "Make Education Human Again."
        </blockquote>

        <p className="font-bold">
          Our company, Petra, exists inside of this contradiction.
        </p>

        <p>
          As a company which prides itself on education, we participate exactly in the exact same systems that we criticise. We understand, however, that to survive inside of capitalism; a system with inherent contradictions, a system within which ethical consumption is not possible, requires compromise. It requires operational efficiency and profitability. Without this, institutions cannot exist. We cannot exist. But also, without sustainability, it could not exist either. However, without the resources possible to turn ideals into reality, they remain a fantasy. Yet still, the logic of scaling, optimisation, and institutionalisation, slowly erodes the human relationships that education is supposed to protect.
        </p>

        <p>
          Our motto is: Make Education Human Again. It is not an appeal to nostalgia, nor a wish to bring back something from the past, but resistance against the reduction of human beings being turned into systems or markets or numbers.
        </p>

        <p>
          Keystone exists because Petra should not become immune from criticism. We don't believe that institutions should remain neutral. We don't believe that you can be objective either within the systems which are already structured to uphold inequality, increasing capital and power among the elite of that system. Keystone is an anti-capitalist, feminist, anti-racist, and pro-worker publication. We don't want to reproduce the language of the both sides discourse pushed by neoliberals and liberals, and we don't want to act like we are perfect either. We also want to ensure that we do not treat all positions to be equally humane, equally serious, or equally harmless.
        </p>

        <p>
          At the same time, Keystone is not going to become some sort of ideological branding for the company or for people who work in it, or propaganda for a company. We want to make sure that we can find a space that allows people and contributors to show the contradictions within the system, to criticise, to reflect, to observe art, to present their political opinions or their philosophical findings or even photography and their lived experiences for the world to see. We don't want to theorise or to think about these abstractions that many theologists or theoreticians or historians or economists or sociologists think about, but we want people to read about the ordinary lives and the realisations that come with it that people feel every day while living under capitalism, whether that's alienation or exhaustion, precarity, performance, loneliness, aspiration, resentment, and the eternal search for meaning which seems impossible under this system.
        </p>

        <p>
          We believe strongly that students, workers, artists, tutors, and ordinary people whose voices are never heard, deserve spaces where everyone can think slowly and seriously, not to be content, not for profit, not for branding, but as human beings.
        </p>

        {/* Signatures */}
        <div className="pt-12 border-t border-foreground/30 mt-12">
          <p className="font-sans text-xs uppercase tracking-widest text-muted font-bold mb-4">
            Sincerely,
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <p className="font-serif text-base font-bold text-foreground">The Editorial Board</p>
              <p className="font-sans text-xs text-muted">The Keystone</p>
            </div>
          </div>
        </div>
      </article>

      {/* Back to home */}
      <div className="mt-16 text-center">
        <Link 
          href="/" 
          className="inline-block border-2 border-foreground py-3 px-6 font-sans text-xs uppercase tracking-widest font-black hover:bg-foreground hover:text-background transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
