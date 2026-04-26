import { useState, MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { path: "/about", label: "About" },
    { path: "/gallery", label: "Gallery" },
    { path: "/journal", label: "Journal" },
    { path: "/links", label: "Links" }
  ];

  return (
    <header className="fixed top-[1rem] left-[1rem] right-[1rem] z-50 pointer-events-none">
      <div className="flex h-16 md:h-20 items-stretch bg-obsidian border-b border-white/10 pointer-events-auto">
        {/* Logo Section */}
        <div className="flex items-center px-6 border-r border-white/10">
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="text-2xl font-display tracking-tighter hover:text-brutal-red transition-colors"
          >
            FILIP.
          </a>
        </div>

        {/* Status Section (Technical feel) */}
        <div className="hidden lg:flex flex-col justify-center px-6 border-r border-white/10 text-[10px] font-mono text-white/40 uppercase leading-tight">
          <div>Status: Active</div>
          <div>Location: 51.5074° N, 0.1278° W</div>
          <div className="text-brutal-red">System: Online</div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex flex-1 items-stretch">
          <div className="flex items-stretch">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative flex items-center px-8 border-r border-white/10 text-xs font-mono uppercase tracking-widest transition-all
                  ${isActive ? "bg-white text-obsidian" : "hover:bg-white/5 text-white/60 hover:text-white"}
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden flex-1 items-center justify-end px-6">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-xl font-display uppercase tracking-tighter hover:text-brutal-red transition-colors"
          >
            {isMenuOpen ? "CLOSE." : "MORE."}
          </button>
        </div>

        {/* Right Section (Brutalist details) */}
        <div className="hidden md:flex items-center px-8 border-l border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-brutal-red animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
              Next Availability: May 2024
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-obsidian border-b border-white/10 md:hidden overflow-hidden pointer-events-auto"
          >
            <div className="flex flex-col divide-y divide-white/10">
              {navLinks.map((item) => (
                <NavLink
                   key={item.path}
                   to={item.path}
                   onClick={() => setIsMenuOpen(false)}
                   className={({ isActive }) => `
                    px-6 py-8 text-sm font-mono uppercase tracking-widest transition-all
                    ${isActive ? "bg-white text-obsidian" : "text-white/60 hover:text-white"}
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
              
              {/* Mobile Status Info */}
              <div className="px-6 py-8 flex flex-col gap-2 text-[10px] font-mono text-white/40 uppercase leading-tight bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brutal-red animate-pulse" />
                  <span className="text-white">Status: Active</span>
                </div>
                <div>Location: 51.5074° N, 0.1278° W</div>
                <div className="text-brutal-red/80">System: Online</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
