import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-auto flex w-full items-center justify-center gap-5 border-t border-white/[0.045] px-5 py-5 text-[10px] text-stone-600 sm:py-6 sm:text-xs">
      <a
        href="https://github.com/saanisayyad?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="rounded-full p-2 transition hover:bg-white/[0.05] hover:text-rose-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-200"
      >
        <FaGithub className="size-4 sm:size-[18px]" />
      </a>
      <span>© {new Date().getFullYear()} The Unquiet Mind</span>
      <a
        href="https://www.linkedin.com/in/mohammadsaani-sayyad-4b7936236/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="rounded-full p-2 transition hover:bg-white/[0.05] hover:text-rose-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-200"
      >
        <FaLinkedin className="size-4 sm:size-[18px]" />
      </a>
    </footer>
  );
};

export default Footer;
