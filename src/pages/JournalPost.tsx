import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from "lucide-react";

export default function JournalPost() {
  const { id } = useParams();

  return (
    <div className="px-6 md:px-12 pt-32 pb-20 space-y-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link to="/journal" className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back to Journal
        </Link>

        <article className="space-y-16">
          <header className="space-y-8">
            <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-white/40">
              <span className="flex items-center gap-2 text-brutal-red"><Calendar size={14} /> Oct 24, 2023</span>
              <span className="flex items-center gap-2"><Clock size={14} /> 5 min read</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display tracking-tighter leading-none">
              The Future of Minimalism in the Digital Age
            </h1>
          </header>

          <div className="aspect-video overflow-hidden border border-white/10">
            <img 
              src="https://picsum.photos/seed/journal-hero/1200/800" 
              alt="Hero" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="max-w-2xl mx-auto space-y-8 text-lg text-white/60 leading-relaxed">
            <p className="text-2xl text-white font-medium">
              Minimalism has always been about more than just "less." It's about the intentionality of what remains.
            </p>
            <p>
              In the digital landscape, this philosophy is evolving from flat, sterile surfaces to rich, atmospheric environments that leverage depth, transparency, and light.
            </p>
            
            <h2 className="text-4xl font-display text-white pt-8 tracking-tight">The Rise of Glassmorphism</h2>
            <p>
              Glassmorphism is the latest evolution of this trend. By using background blurs and semi-transparent layers, we create a sense of physical presence in a digital space. It feels tangible, yet ethereal.
            </p>

            <blockquote className="border-l-4 border-brutal-red pl-8 py-4 italic text-white text-2xl font-display tracking-tight">
              "Design is not just what it looks like and feels like. Design is how it works."
            </blockquote>

            <p>
              As we look forward, the challenge for designers will be to maintain this level of visual sophistication while ensuring accessibility and performance.
            </p>
          </div>

          <footer className="max-w-2xl mx-auto pt-20 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                  <img src="https://picsum.photos/seed/author/100/100" alt="Author" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-sm font-bold">Studio Team</p>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/20">Creative Direction</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                Share <ArrowUpRight size={14} />
              </button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
