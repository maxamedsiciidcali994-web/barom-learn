import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { THEME } from '@/constants';

interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'accent' | 'glass';
}

export const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: "bg-surface",
    primary: "bg-primary purple-glow",
    accent: "bg-accent neon-glow",
    glass: "glass"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-[2.5rem] p-6 shadow-xl border border-white/5",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
