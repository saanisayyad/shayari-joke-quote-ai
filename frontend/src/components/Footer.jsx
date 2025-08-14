import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-white/70 text-center absolute bottom-6 flex items-center gap-5">
        <a href="https://github.com/saanisayyad?tab=repositories" target="_blank" rel="noopener noreferrer">
            <FaGithub className="size-5"/>
        </a>
      <div>
        &copy; {new Date().getFullYear()} GenieAI
      </div>
      <a href="https://www.linkedin.com/in/mohammadsaani-sayyad-4b7936236/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="size-5"/>
      </a>
    </div>
  )
}

export default Footer
