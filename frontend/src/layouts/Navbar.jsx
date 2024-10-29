import { Link} from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent text-slate-600 shadow-md bg-opacity-50 backdrop-blur-md p-2">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
      <Link to="/" className="hover:text-slate-600 hover:font-bold">
        <div className="text-2xl font-bold flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 mt-1 my-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          FindPh
        </div>
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-emerald-950 hover:font-bold">
              Home
            </Link>
          </li>

          <li>
            <Link to="/project" className="hover:text-emerald-950 hover:font-bold">
              Project
            </Link>
          </li>

          <li>
            <a href="#about" className="hover:text-emerald-950 hover:font-bold">
              About
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-emerald-950 hover:font-bold">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
