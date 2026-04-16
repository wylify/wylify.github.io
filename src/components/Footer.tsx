import { NavLink } from "react-router-dom";
import { Github, Twitter, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/10 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-display tracking-tighter">STUDIO.</h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              A creative powerhouse dedicated to building high-fidelity digital experiences and innovative brand identities.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/20">Navigation</h4>
            <ul className="space-y-3">
              {["About", "Gallery", "Blog", "Links"].map((label) => (
                <li key={label}>
                  <NavLink to={`/${label.toLowerCase()}`} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                    {label} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/20">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map((social) => (
                <a key={social.label} href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:bg-white hover:text-obsidian transition-all">
                  <social.icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/20">Say Hello</h4>
            <a href="mailto:hello@studio.com" className="text-xl font-display hover:text-brutal-red transition-colors flex items-center gap-2 group">
              hello@studio.com <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6 relative">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/20">
            © 2024 STUDIO. All Rights Reserved.
          </div>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-widest text-white/20">
            <NavLink to="/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink to="/terms" className="hover:text-white transition-colors">Terms of Service</NavLink>
          </div>
          
          {/* Grainy Gradient Merge */}
          <div className="absolute -bottom-10 left-0 right-0 h-10 bg-gradient-to-t from-brutal-red to-transparent opacity-20 pointer-events-none grain" />
        </div>
      </div>
    </footer>
  );
}
