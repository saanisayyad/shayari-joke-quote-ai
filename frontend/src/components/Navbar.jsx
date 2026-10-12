import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="relative z-10 flex w-full max-w-6xl items-center justify-center px-6 pt-7 sm:justify-start sm:px-10">
      <Link to="/" className="group flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-300/30 bg-rose-300/10 text-lg text-rose-200 transition group-hover:bg-rose-300/20">
          ∴
        </span>
        <span className="text-sm font-bold uppercase tracking-[0.22em] text-stone-200">
          The Unquiet Mind
        </span>
      </Link>
    </nav>
  );
}
