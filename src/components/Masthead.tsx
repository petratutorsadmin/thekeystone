import Link from "next/link";

export default function Masthead() {
  return (
    <div className="w-full py-10 md:py-16 px-4 md:px-8 flex flex-col items-center justify-center border-b-4 border-foreground text-center bg-background">
      <Link href="/" className="group">
        <h1 className="font-rollercoaster text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-normal text-foreground group-hover:text-accent transition-colors duration-300 uppercase leading-none">
          Keystone
        </h1>
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
