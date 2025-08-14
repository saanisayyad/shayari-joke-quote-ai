import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" flex items-center rounded-full justify-between mt-10 py-4 px-10 gap-5">
      <Link to="/joke">
        <div className='bg-white/10 px-3 py-2 text-center rounded-full hover:scale-105 duration-300 cursor-pointer text-white/70'>
          Joke
        </div>
      </Link>
      <Link to="/shayari">
        <div className='bg-white/10 px-3 py-2 text-center rounded-full hover:scale-105 duration-300 cursor-pointer text-white/70'>
      Shayari
    </div>
      </Link>
      <Link to="/quote">
        <div className='bg-white/10 px-3 py-2 text-center rounded-full hover:scale-105 duration-300 cursor-pointer text-white/70'>
      Quote
    </div>
      </Link>
    </nav>
  );
}
