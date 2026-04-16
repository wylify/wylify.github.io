import { motion } from "motion/react";

export default function About() {
  return (
    <div className="px-6 md:px-12 pt-32 pb-20 space-y-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <h1 className="text-6xl md:text-9xl font-display tracking-tighter leading-none">
            ABOUT <br />
            <span className="text-outline">STUDIO.</span>
          </h1>
          <div className="max-w-md space-y-8">
            <p className="text-2xl text-white font-medium leading-tight">
              We are a creative powerhouse building the world's biggest entertainment brands.
            </p>
            <p className="text-sm text-white/40 leading-relaxed">
              A minimalist approach to digital architecture, focused on clarity and the interplay between light and structure. Our studio operates at the intersection of design and technology, crafting experiences that are as functional as they are beautiful.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/20">Location</p>
                <p className="text-sm">London, UK</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/20">Founded</p>
                <p className="text-sm">2024</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-[3/4] overflow-hidden border border-white/10"
          >
            <img 
              src="https://picsum.photos/seed/about-page/800/1200" 
              alt="About" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 border border-white/10 bg-obsidian p-6 hidden md:block">
            <div className="w-full h-full border border-white/5 flex flex-col items-center justify-center text-[10px] font-mono text-white/40 uppercase text-center gap-4">
              <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-brutal-red rounded-full" />
              </div>
              Available for <br /> new projects
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pt-32 border-t border-white/10">
        {[
          { title: "Design", desc: "Crafting visual identities that resonate and endure." },
          { title: "Development", desc: "Building robust, scalable digital products." },
          { title: "Strategy", desc: "Defining the path to digital excellence." },
        ].map((service, i) => (
          <div key={i} className="space-y-4">
            <span className="text-[10px] font-mono text-brutal-red uppercase tracking-widest">0{i + 1}</span>
            <h3 className="text-3xl font-display">{service.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
