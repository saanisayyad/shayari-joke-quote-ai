import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="editorial-nav relative z-20 mx-auto flex w-full max-w-[1440px] items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-8 sm:py-5 lg:px-14">
      <Link to="/" aria-label="The Unquiet Mind home" className="group flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center border border-[#c7f36b]/40 bg-[#c7f36b]/[0.08] font-serif text-lg text-[#c7f36b] transition group-hover:bg-[#c7f36b]/[0.16] sm:h-10 sm:w-10">
          ∴
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#f3f0e7] sm:text-xs sm:tracking-[0.23em]">
          The Unquiet Mind
        </span>
      </Link>
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#77796d]">Est. inside your head</span>
    </nav>
  );
}
