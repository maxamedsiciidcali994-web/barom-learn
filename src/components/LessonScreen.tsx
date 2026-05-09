import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Volume2, 
  Mic, 
  ChevronRight, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/Button';
import { Lesson, LessonPart } from '@/types';
import { cn } from '@/src/lib/utils';

interface LessonScreenProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: (xp: number) => void;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({ lesson, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentPart = lesson.content[currentIndex];
  const progress = ((currentIndex + 1) / lesson.content.length) * 100;

  const handleNext = () => {
    if (currentIndex < lesson.content.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsDone(true);
    }
  };

  const handleFinish = () => {
    onComplete(lesson.content.length * 10);
  };

  return (
    <div className="min-h-screen flex flex-col pt-6 bg-dark-gray overflow-hidden">
      {/* Header */}
      <div className="px-6 flex items-center justify-between mb-8">
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <X />
        </button>
        <div className="flex-1 mx-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary"
            />
          </div>
        </div>
        <div className="font-bold text-primary">{Math.round(progress)}%</div>
      </div>

      <main className="flex-1 px-6 flex flex-col justify-center max-w-xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {/* Chat-style Bubble */}
              <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-primary p-8 rounded-[2rem] rounded-bl-none shadow-2xl relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-white/60 text-sm font-bold uppercase tracking-widest">English</span>
                    <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                      <Volume2 size={20} />
                    </button>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight">{currentPart.english}</h2>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-surface p-8 rounded-[2rem] rounded-br-none shadow-2xl border border-white/5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Somali</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                       <Mic size={16} className="text-accent" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight text-white/90">{currentPart.somali}</h2>
                </motion.div>
              </div>

              {/* Interaction Area */}
              <div className="pt-12 text-center space-y-8">
                <p className="text-white/40 font-medium">Talk to practice pronunciation</p>
                
                <div className="flex justify-center items-center gap-8">
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSpeaking(!isSpeaking)}
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl",
                      isSpeaking ? "bg-accent scale-110 neon-glow" : "bg-white/5"
                    )}
                  >
                    <Mic size={32} className={cn(isSpeaking ? "text-white" : "text-accent")} />
                  </motion.button>
                </div>

                <Button fullWidth size="lg" onClick={handleNext}>
                  Casharka Xiga
                  <ChevronRight />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-8"
            >
              <div className="w-24 h-24 bg-accent rounded-full mx-auto flex items-center justify-center neon-glow">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">Hambalyo!</h2>
                <p className="text-white/60">Waxaad dhamaysatay casharkii maanta.</p>
              </div>
              <div className="bg-surface p-6 rounded-3xl border border-white/5 inline-block min-w-48">
                <div className="text-4xl font-bold text-accent">+ {lesson.content.length * 10}</div>
                <div className="text-white/40 text-sm font-bold uppercase tracking-widest mt-1">XP Points Earned</div>
              </div>
              <Button fullWidth size="lg" variant="accent" onClick={handleFinish}>
                Ku noqo Dashboard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
