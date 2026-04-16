import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { url: "https://picsum.photos/seed/obsidian1/1200/800", title: "Monolith" },
  { url: "https://picsum.photos/seed/obsidian2/1200/800", title: "Refraction" },
  { url: "https://picsum.photos/seed/obsidian3/1200/800", title: "Void" },
  { url: "https://picsum.photos/seed/obsidian4/1200/800", title: "Lustre" },
  { url: "https://picsum.photos/seed/obsidian5/1200/800", title: "Depth" },
  { url: "https://picsum.photos/seed/obsidian6/1200/800", title: "Clarity" },
  { url: "https://picsum.photos/seed/obsidian7/1200/800", title: "Structure" },
  { url: "https://picsum.photos/seed/obsidian8/1200/800", title: "Light" },
  { url: "https://picsum.photos/seed/obsidian9/1200/800", title: "Form" },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="px-6 md:px-12 pt-32 pb-20 space-y-20">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-display tracking-tighter">GALLERY.</h1>
        <p className="text-white/40 font-mono uppercase tracking-widest text-xs">Curated visual studies / 2024</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {images.map((img, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square overflow-hidden group cursor-pointer border border-white/5"
            onClick={() => setLightboxIndex(index)}
          >
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brutal-red/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs font-mono uppercase tracking-widest font-bold">View Project</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 flex items-center justify-center p-6 md:p-12"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={images[lightboxIndex].url} 
                alt={images[lightboxIndex].title} 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
              
              <button 
                className="absolute top-4 right-4 md:top-10 md:right-10 text-white hover:text-brutal-red transition-colors z-[110] bg-black/20 rounded-full p-2"
                onClick={() => setLightboxIndex(null)}
              >
                <X size={32} />
              </button>
              <div className="absolute top-1/2 -left-12 -translate-y-1/2">
                <button 
                  className="p-4 hover:text-brutal-red transition-colors"
                  onClick={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
                >
                  <ChevronLeft size={40} />
                </button>
              </div>
              <div className="absolute top-1/2 -right-12 -translate-y-1/2">
                <button 
                  className="p-4 hover:text-brutal-red transition-colors"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
                >
                  <ChevronRight size={40} />
                </button>
              </div>
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <h4 className="text-xl font-display tracking-tighter">{images[lightboxIndex].title}</h4>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
