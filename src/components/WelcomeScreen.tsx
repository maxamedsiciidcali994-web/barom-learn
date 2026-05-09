import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/Button';
import { BookOpen, Mic, MessageCircle, ChevronRight } from 'lucide-react';
import { THEME } from '@/constants';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-32 h-32 bg-primary rounded-[2.5rem] flex items-center justify-center mb-8 purple-glow"
      >
        <BookOpen size={64} className="text-white" />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold mb-4 tracking-tight"
      >
        Ku Soo Dhawow <span className="text-primary">Barom Learn</span>
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-white/60 mb-12 max-w-xs"
      >
        Baro English iyo Soomaali si fudud
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid gap-4 mb-12 w-full max-w-sm"
      >
        <FeatureItem 
          icon={<BookOpen size={20} className="text-primary" />} 
          text="Casharro Casri ah" 
          delay={0.5}
        />
        <FeatureItem 
          icon={<Mic size={20} className="text-accent" />} 
          text="Dhageysi & Hadal" 
          delay={0.6}
        />
        <FeatureItem 
          icon={<MessageCircle size={20} className="text-primary" />} 
          text="Chat-style Waxbarasho" 
          delay={0.7}
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-sm"
      >
        <Button size="lg" fullWidth onClick={onStart}>
          Bilow Barashada
          <ChevronRight size={20} />
        </Button>
      </motion.div>
    </div>
  );
};

const FeatureItem = ({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) => (
  <motion.div 
    initial={{ x: -20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay }}
    className="bg-white/5 rounded-2xl p-4 flex items-center gap-4 border border-white/5"
  >
    <div className="p-2 bg-white/5 rounded-xl">
      {icon}
    </div>
    <span className="font-medium">{text}</span>
  </motion.div>
);
