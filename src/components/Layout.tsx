import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, useScroll, useTransform } from "motion/react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { scrollYProgress } = useScroll();
  
  // Transition from brutal-red (#ff0033) to black (#050505)
  const dynamicColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#ff0033", "#050505"]
  );

  return (
    <div className="min-h-screen bg-obsidian selection:bg-brutal-red selection:text-white relative flex flex-col">
      {/* Global Frame - Fixed components (Top and Sides) */}
      <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col">
        {/* Top Border - Travel with scroll while changing color */}
        <motion.div 
          style={{ backgroundColor: dynamicColor }}
          className="h-[0.7rem] w-full shrink-0" 
        />
        
        <div className="flex-1 flex justify-between">
          {/* Left Border - Gradient starts at current Top color to maintain seamless transition */}
          <motion.div 
            style={{ 
              background: useTransform(dynamicColor, (c) => `linear-gradient(to bottom, ${c}, #050505)`)
            }}
            className="w-[0.7rem] h-full" 
          />
          {/* Right Border */}
          <motion.div 
            style={{ 
              background: useTransform(dynamicColor, (c) => `linear-gradient(to bottom, ${c}, #050505)`)
            }}
            className="w-[0.7rem] h-full" 
          />
        </div>
      </div>
      
      <Navbar />
      <main className="flex-1 relative">
        {children}
      </main>
      
      {/* Bottom Border - Only visible at bottom of page (relative to content) */}
      <div className="h-[0.7rem] w-full bg-black shrink-0 relative z-[101]" />
      
      <Footer />
    </div>
  );
}
