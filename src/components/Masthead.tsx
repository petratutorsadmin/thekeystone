import Link from "next/link";

export default function Masthead() {
  return (
    <div className="w-full py-10 md:py-16 px-4 md:px-8 flex flex-col items-center justify-center border-b-4 border-foreground text-center bg-background">
      <Link href="/" className="group flex justify-center items-center w-full">
        <img 
          src="/logo.png" 
          alt="The Keystone Logo" 
          className="h-24 sm:h-32 md:h-44 lg:h-52 w-auto mix-blend-multiply group-hover:opacity-80 transition-opacity select-none pointer-events-none mx-auto"
        />
      </Link>
      <div className="w-full max-w-lg mt-4 flex items-center justify-between border-y border-foreground py-2 text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-foreground">
        <span>Politics</span>
        <span>&bull;</span>
        <span>Culture</span>
        <span>&bull;</span>
        <span>Education</span>
        <span>&bull;</span>
        <span>Criticism</span>
      </div>
    </div>
  );
}
