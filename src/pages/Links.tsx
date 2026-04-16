import GlassCard from "../components/GlassCard";
import { Github, Twitter, Instagram, Linkedin, Mail, Globe, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Official Website", icon: Globe, url: "#" },
  { label: "GitHub Portfolio", icon: Github, url: "#" },
  { label: "Twitter / X", icon: Twitter, url: "#" },
  { label: "Instagram", icon: Instagram, url: "#" },
  { label: "LinkedIn", icon: Linkedin, url: "#" },
  { label: "Contact Me", icon: Mail, url: "#" },
];

export default function Links() {
  return (
    <div className="px-6 md:px-12 pt-32 pb-20 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-16">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 mx-auto">
            <img
              src="https://picsum.photos/seed/avatar/200/200"
              alt="Avatar"
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-display tracking-tighter">CONNECT.</h1>
            <p className="text-sm text-white/40 font-mono uppercase tracking-widest">Digital Presence / 2024</p>
          </div>
        </div>

        <div className="space-y-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full"
            >
              <div className="relative overflow-hidden bg-white/2 border border-white/5 p-6 flex items-center justify-between transition-all hover:bg-white hover:text-obsidian">
                <div className="flex items-center gap-6">
                  <link.icon size={20} strokeWidth={1.5} className="group-hover:text-brutal-red transition-colors" />
                  <span className="text-sm font-mono uppercase tracking-widest font-bold">{link.label}</span>
                </div>
                <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-all" />
                
                {/* Brutalist hover line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brutal-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <p className="text-[10px] font-mono text-white/10 uppercase tracking-[0.3em]">
            © 2024 STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}
