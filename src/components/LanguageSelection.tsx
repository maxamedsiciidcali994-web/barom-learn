import React from 'react';
import { motion } from 'motion/react';
import { BentoCard } from './ui/BentoCard';
import { Language } from '@/types';
import { ChevronRight } from 'lucide-react';

interface LanguageSelectionProps {
  onSelect: (lang: Language) => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen p-6 flex flex-col justify-center max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-2">Dooro Luqadda</h2>
        <p className="text-white/60">Waa tee luqadda aad rabto in aad barato?</p>
      </motion.div>

      <div className="grid gap-6">
        <LanguageCard 
          title="English" 
          subtitle="Learn from Somali" 
          flag="🇬🇧" 
          onClick={() => onSelect(Language.ENGLISH)}
          delay={0.1}
        />
        <LanguageCard 
          title="Somali" 
          subtitle="Learn from English" 
          flag="🇸🇴" 
          onClick={() => onSelect(Language.SOMALI)}
          delay={0.2}
        />
      </div>
    </div>
  );
};

const LanguageCard = ({ title, subtitle, flag, onClick, delay }: any) => (
  <BentoCard 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className="flex items-center justify-between group"
  >
    <div className="flex items-center gap-6">
      <div className="text-5xl">{flag}</div>
      <div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-white/40">{subtitle}</p>
      </div>
    </div>
    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
      <ChevronRight className="text-white/40 group-hover:text-white" />
    </div>
  </BentoCard>
);
