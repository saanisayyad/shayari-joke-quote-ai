import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-center gap-5 border-t border-white/[0.08] px-5 py-4 text-[10px] text-[#77796d] sm:py-5 sm:text-xs">
      <a
        href="https://github.com/saanisayyad?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="rounded-full p-2 transition hover:bg-white/[0.05] hover:text-[#c7f36b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c7f36b]"
      >
        <FaGithub className="size-4 sm:size-[18px]" />
      </a>
      <span>© {new Date().getFullYear()} The Unquiet Mind</span>
      <a
        href="https://www.linkedin.com/in/mohammadsaani-sayyad-4b7936236/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="rounded-full p-2 transition hover:bg-white/[0.05] hover:text-[#c7f36b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c7f36b]"
      >
        <FaLinkedin className="size-4 sm:size-[18px]" />
      </a>
    </footer>
  );
};

export default Footer;
