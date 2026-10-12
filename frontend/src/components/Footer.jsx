import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-auto flex w-full items-center justify-center gap-5 px-5 py-7 text-xs text-stone-500">
      <a
        href="https://github.com/saanisayyad?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="transition hover:text-rose-300"
      >
        <FaGithub className="size-5" />
      </a>
      <span>© {new Date().getFullYear()} The Unquiet Mind</span>
      <a
        href="https://www.linkedin.com/in/mohammadsaani-sayyad-4b7936236/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="transition hover:text-rose-300"
      >
        <FaLinkedin className="size-5" />
      </a>
    </footer>
  );
};

export default Footer;
