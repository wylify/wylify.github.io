import { motion, HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  shine?: boolean;
}

export default function GlassCard({ children, className = "", shine = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      {...props}
      className={`
        relative overflow-hidden rounded-2xl bg-white/5 glass-blur glass-border
        ${shine ? "glass-shine-anim" : ""}
        ${className}
      `}
    >
      {/* Specularity overlay */}
      <div className="absolute inset-0 glass-specularity pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
