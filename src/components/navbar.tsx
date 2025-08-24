import { useState } from "react";
import { ButtonComp } from "./buttonComp";
import { CloseIcon, MenuIcon } from "../../public";
import { useNavigate  } from 'react-router';

const navLinks = [
  { label: "How to play", href: "#" },
  { label: "Leaderboard", href: "#" },
  { label: "About", href: "#" },
];

export const Navbar = () => {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-centerrelative">
      {/* Logo */}
      <div className="text-[20px] md:text-[24px] font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent hover:cursor-pointer">
       <span className="hidden md:inline-block">##</span>## DoodleDash
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-[#7b738c] text-[16px] font-normal">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-[#24212c]"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Buttons (Desktop) */}
      <div className="hidden md:flex gap-3">
        <ButtonComp
          label="Sign In"
          variant="bordered"
          mainClass="rounded-xl border-none text-black"
          onClick={()=>navigate("/signIn")}
        />
        <ButtonComp 
          label="Get Started" 
          variant="solid" 
          mainClass="rounded-xl" 
          onClick={()=>navigate("/signUp")}
        />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon className="w-7 h-7 fill-[#84849a]" /> : <MenuIcon className="w-7 h-7 fill-[#84849a]" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-10 left-0 w-full bg-white shadow-md p-4 flex flex-col gap-4 md:hidden z-50">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#24212c]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2">
            <ButtonComp
              label="Sign In"
              variant="bordered"
              mainClass="rounded-xl border-none text-black"
            />
            <ButtonComp label="Get Started" variant="solid" mainClass="rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};
