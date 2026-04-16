import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const posts = [
  {
    id: "minimalism-in-digital-age",
    title: "The Future of Minimalism in the Digital Age",
    excerpt: "How transparency and glass-morphic design are shaping the next generation of user interfaces.",
    date: "Oct 24, 2023",
    readTime: "5 min read",
  },
  {
    id: "obsidian-surfaces",
    title: "The Aesthetics of Obsidian Surfaces",
    excerpt: "Exploring the psychological impact of deep, dark, and reflective materials in digital product design.",
    date: "Sep 12, 2023",
    readTime: "8 min read",
  },
  {
    id: "crafting-clarity",
    title: "Crafting Clarity: A Guide to Visual Hierarchy",
    excerpt: "Techniques for guiding the user's eye through complex data without sacrificing aesthetic integrity.",
    date: "Aug 05, 2023",
    readTime: "6 min read",
  },
  {
    id: "brutalist-design-systems",
    title: "Brutalist Design Systems",
    excerpt: "Why the raw, unpolished aesthetic is making a comeback in modern web development.",
    date: "Jul 18, 2023",
    readTime: "7 min read",
  },
  {
    id: "future-of-interaction",
    title: "Future of Web Interaction",
    excerpt: "Predicting the next major shift in how we interact with digital surfaces.",
    date: "Jun 30, 2023",
    readTime: "10 min read",
  },
];

export default function BlogIndex() {
  return (
    <div className="px-6 md:px-12 pt-32 pb-20 space-y-20">
      <div className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-6xl md:text-8xl font-display tracking-tighter">JOURNAL.</h1>
        <p className="text-white/40 font-mono uppercase tracking-widest text-xs">Thoughts / Design / Code</p>
      </div>

      <div className="max-w-7xl mx-auto divide-y divide-white/10">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            to={`/blog/${post.id}`}
            className="flex flex-col md:flex-row md:items-center justify-between py-12 group gap-8"
          >
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                <span className="text-brutal-red">{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-display group-hover:text-brutal-red transition-colors leading-none">
                {post.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-obsidian transition-all">
                <ArrowUpRight size={32} strokeWidth={1.5} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
