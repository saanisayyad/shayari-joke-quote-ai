import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="relative z-20 flex w-full max-w-7xl items-center justify-between px-4 pb-3 pt-5 sm:px-8 sm:pt-7">
      <Link to="/" aria-label="The Unquiet Mind home" className="group flex items-center gap-2.5 sm:gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200/20 bg-rose-200/[0.07] font-serif text-lg text-rose-200 transition duration-200 group-hover:border-rose-200/40 group-hover:bg-rose-200/[0.12] sm:h-10 sm:w-10 sm:rounded-2xl">
          ∴
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-300 transition group-hover:text-stone-100 sm:text-xs sm:tracking-[0.22em]">
          The Unquiet Mind
        </span>
      </Link>
      <span className="hidden items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-600 sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-200/80" />
        A quiet corner of the internet
      </span>
    </nav>
  );
}
