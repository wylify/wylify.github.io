import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  tagId: string;
}

interface Tag {
  id: string;
  label: string; // "01"
  short: string; // "Ph"
  title: string; // "Photography"
  subtitle: string; // "ART"
}

const tags: Tag[] = [
  { id: "photography", label: "01", short: "Ph", title: "Photography", subtitle: "ART" },
  { id: "travels", label: "02", short: "Tr", title: "Travels", subtitle: "MEMORIES" },
  { id: "projects", label: "03", short: "Pr", title: "Projects", subtitle: "WORK" },
  { id: "journal", label: "04", short: "Jo", title: "Journal", subtitle: "THOUGHTS" },
  { id: "experiments", label: "05", short: "Ex", title: "Experiments", subtitle: "RESEARCH" },
];

const rawImages: GalleryImage[] = [
  // Photography (9 images)
  { id: "ph-1", tagId: "photography", url: "https://res.cloudinary.com/dwdjqhjs4/image/upload/v1777184682/2026-02-20_15-09-58_u2ye8z.jpg", title: "Shibuya" },
  { id: "ph-2", tagId: "photography", url: "https://picsum.photos/seed/ph2/800/800", title: "Street Life" },
  { id: "ph-3", tagId: "photography", url: "https://picsum.photos/seed/ph3/800/800", title: "Neon Nights" },
  { id: "ph-4", tagId: "photography", url: "https://picsum.photos/seed/ph4/800/800", title: "Morning Mist" },
  { id: "ph-5", tagId: "photography", url: "https://picsum.photos/seed/ph5/800/800", title: "Shadows" },
  { id: "ph-6", tagId: "photography", url: "https://picsum.photos/seed/ph6/800/800", title: "Urban Soul" },
  { id: "ph-7", tagId: "photography", url: "https://picsum.photos/seed/ph7/800/800", title: "Grit" },
  { id: "ph-8", tagId: "photography", url: "https://picsum.photos/seed/ph8/800/800", title: "Contrast" },
  { id: "ph-9", tagId: "photography", url: "https://picsum.photos/seed/ph9/800/800", title: "Grain" },

  // Travels (6 images)
  { id: "tr-1", tagId: "travels", url: "https://picsum.photos/seed/tr1/800/800", title: "Kyoto Temple" },
  { id: "tr-2", tagId: "travels", url: "https://picsum.photos/seed/tr2/800/800", title: "Osaka Food" },
  { id: "tr-3", tagId: "travels", url: "https://picsum.photos/seed/tr3/800/800", title: "Nara Deer" },
  { id: "tr-4", tagId: "travels", url: "https://picsum.photos/seed/tr4/800/800", title: "Fuji Peak" },
  { id: "tr-5", tagId: "travels", url: "https://picsum.photos/seed/tr5/800/800", title: "Market Stroll" },
  { id: "tr-6", tagId: "travels", url: "https://picsum.photos/seed/tr6/800/800", title: "Train Ride" },

  // Projects (4 images)
  { id: "pr-1", tagId: "projects", url: "https://picsum.photos/seed/pr1/800/800", title: "Brutal Web" },
  { id: "pr-2", tagId: "projects", url: "https://picsum.photos/seed/pr2/800/800", title: "Glass UI" },
  { id: "pr-3", tagId: "projects", url: "https://picsum.photos/seed/pr3/800/800", title: "Dark System" },
  { id: "pr-4", tagId: "projects", url: "https://picsum.photos/seed/pr4/800/800", title: "Creative Deck" },

  // Journal (7 images)
  { id: "jo-1", tagId: "journal", url: "https://picsum.photos/seed/jo1/800/800", title: "Desk Setup" },
  { id: "jo-2", tagId: "journal", url: "https://picsum.photos/seed/jo2/800/800", title: "Sketchbook" },
  { id: "jo-3", tagId: "journal", url: "https://picsum.photos/seed/jo3/800/800", title: "Code Snippet" },
  { id: "jo-4", tagId: "journal", url: "https://picsum.photos/seed/jo4/800/800", title: "Evening Coffee" },
  { id: "jo-5", tagId: "journal", url: "https://picsum.photos/seed/jo5/800/800", title: "New Lens" },
  { id: "jo-6", tagId: "journal", url: "https://picsum.photos/seed/jo6/800/800", title: "Reading List" },
  { id: "jo-7", tagId: "journal", url: "https://picsum.photos/seed/jo7/800/800", title: "Studio Light" },

  // Experiments (5 images)
  { id: "ex-1", tagId: "experiments", url: "https://picsum.photos/seed/ex1/800/800", title: "Glitch Study" },
  { id: "ex-2", tagId: "experiments", url: "https://picsum.photos/seed/ex2/800/800", title: "Particle Flow" },
  { id: "ex-3", tagId: "experiments", url: "https://picsum.photos/seed/ex3/800/800", title: "Noise Field" },
  { id: "ex-4", tagId: "experiments", url: "https://picsum.photos/seed/ex4/800/800", title: "Color Bleed" },
  { id: "ex-5", tagId: "experiments", url: "https://picsum.photos/seed/ex5/800/800", title: "Motion Blur" },
];

export default function Gallery() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredTags = useMemo(() => {
    if (!activeTag) return tags;
    return tags.filter(t => t.id === activeTag);
  }, [activeTag]);

  const allFilteredImages = useMemo(() => {
    if (!activeTag) return rawImages;
    return rawImages.filter(img => img.tagId === activeTag);
  }, [activeTag]);

  const handleImageClick = (imgId: string) => {
    const index = allFilteredImages.findIndex(img => img.id === imgId);
    if (index !== -1) setLightboxIndex(index);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % allFilteredImages.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + allFilteredImages.length) % allFilteredImages.length);
    }
  };

  const handleClose = () => setLightboxIndex(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, allFilteredImages.length]);

  return (
    <div className="px-4 md:px-12 pt-32 pb-20 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-display tracking-tighter">GALLERY.</h1>
          <p className="text-white/40 font-mono uppercase tracking-widest text-xs">Curated visual studies / 2026</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-white/5">
          <button 
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${!activeTag ? 'bg-white text-obsidian border-white' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
          >
            All
          </button>
          {tags.map(tag => (
            <button 
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${activeTag === tag.id ? 'bg-white text-obsidian border-white' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
            >
              {tag.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12 items-start border-t border-l border-white/10">
        {filteredTags.map((tag) => {
          const tagImages = rawImages.filter(img => img.tagId === tag.id);
          const imageCount = tagImages.length;
          
          const totalOccupied = 2 + imageCount;
          const totalSlots = Math.ceil(totalOccupied / 3) * 3;
          const emptySlotsCount = totalSlots - totalOccupied;

          return (
            <div key={tag.id} className="col-span-3 grid grid-cols-3 border-white/10">
              {/* Tag Header: Spans 2 squares */}
              <div className="col-span-2 bg-obsidian border-b border-r border-white/10 p-6 md:p-6 flex flex-col justify-between group overflow-hidden">
                <span className="text-[12px] font-mono text-white/30 uppercase tracking-widest leading-none">{tag.label}</span>
                <div>
                  <h2 className="text-xl md:text-xl lg:text-xl xl:text-xl font-display tracking-tighter leading-[0.8] text-white group-hover:text-brutal-red transition-colors uppercase">
                    {tag.title}
                  </h2>
                  <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/20 mt-2">{tag.subtitle}</p>
                </div>
              </div>

              {/* Tag Images */}
              {tagImages.map((img) => (
                <div 
                  key={img.id}
                  className="aspect-square border-b border-r border-white/10 overflow-hidden cursor-pointer group"
                  onClick={() => handleImageClick(img.id)}
                >
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-full object-cover block group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}

              {/* Empty Fillers to complete the 3-column group grid */}
              {Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div 
                  key={`empty-${i}`} 
                  className="aspect-square border-b border-r border-white/10"
                />
              ))}
            </div>
          );
        })}
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
              <motion.img 
                key={allFilteredImages[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={allFilteredImages[lightboxIndex].url} 
                alt={allFilteredImages[lightboxIndex].title} 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
              
              <button 
                className="absolute top-4 right-4 md:top-10 md:right-10 text-white hover:text-brutal-red transition-colors z-[110] bg-black/20 rounded-full p-2"
                onClick={handleClose}
              >
                <X size={32} />
              </button>
              
              <div className="absolute top-1/2 left-0 md:left-4 -translate-y-1/2">
                <button 
                  className="p-4 hover:text-brutal-red transition-colors text-white/50"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={48} />
                </button>
              </div>
              <div className="absolute top-1/2 right-0 md:right-4 -translate-y-1/2">
                <button 
                  className="p-4 hover:text-brutal-red transition-colors text-white/50"
                  onClick={handleNext}
                >
                  <ChevronRight size={48} />
                </button>
              </div>
              
              <div className="absolute bottom-8 left-0 right-0 text-center space-y-2">
                <h4 className="text-xl font-display tracking-tighter text-white">{allFilteredImages[lightboxIndex].title}</h4>
                <div className="inline-block px-3 py-1 bg-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                  {tags.find(t => t.id === allFilteredImages[lightboxIndex].tagId)?.title}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
