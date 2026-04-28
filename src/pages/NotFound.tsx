import { motion } from "motion/react";
import { MoveLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-obsidian px-6">
      <div className="max-w-xl w-full text-center space-y-12">
        {/* Large 404 with glitch effect feel */}
        <div className="relative inline-block">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12rem] md:text-[16rem] font-display font-black leading-none tracking-tighter text-white/5 select-none"
          >
            404
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tighter text-white uppercase italic">
              Lost in <span className="text-brutal-red">Obsidian</span>
            </h2>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <p className="text-white/40 font-mono text-sm md:text-base uppercase tracking-widest max-w-md mx-auto leading-relaxed">
            The page you are looking for has been swallowed by the dark or never existed in this dimension.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-tighter hover:bg-brutal-red hover:text-white transition-all group w-full sm:w-auto justify-center"
            >
              <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Return Home
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-3 px-8 py-4 border border-white/10 text-white font-bold uppercase tracking-tighter hover:border-brutal-red transition-all group w-full sm:w-auto justify-center"
            >
              <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="pt-20 flex justify-center gap-20 opacity-10 pointer-events-none">
          <div className="w-px h-32 bg-gradient-to-b from-white to-transparent" />
          <div className="w-px h-32 bg-gradient-to-b from-brutal-red to-transparent" />
          <div className="w-px h-32 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* Grid Pattern Background - matching site aesthetic */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </div>
  );
}
