import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Check, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import { Quiz, Question } from '@/types';
import { cn } from '@/src/lib/utils';

interface QuizScreenProps {
  quiz: Quiz;
  onClose: () => void;
  onComplete: (score: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ quiz, onClose, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  const handleCheck = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setIsDone(true);
    }
  };

  const handleFinish = () => {
    onComplete(score * 20);
  };

  return (
    <div className="min-h-screen pt-6 bg-dark-gray flex flex-col">
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
              className="h-full bg-accent"
            />
          </div>
        </div>
        <div className="font-bold text-accent">{currentIndex + 1}/{quiz.questions.length}</div>
      </div>

      <main className="flex-1 px-6 max-w-xl mx-auto w-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isDone ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold text-center mb-12">{currentQuestion.text}</h2>

              <div className="grid gap-4">
                {currentQuestion.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => isCorrect === null && setSelectedOption(idx)}
                    className={cn(
                      "p-6 rounded-3xl text-left border-2 transition-all font-semibold text-lg",
                      selectedOption === idx 
                        ? "border-accent bg-accent/10" 
                        : "border-white/5 bg-surface",
                      isCorrect !== null && idx === currentQuestion.correctAnswer && "border-green-500 bg-green-500/10",
                      isCorrect !== null && selectedOption === idx && idx !== currentQuestion.correctAnswer && "border-red-500 bg-red-500/10"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option}</span>
                      {isCorrect !== null && idx === currentQuestion.correctAnswer && <Check className="text-green-500" />}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="pt-8">
                {isCorrect === null ? (
                  <Button 
                    fullWidth 
                    size="lg" 
                    variant="accent" 
                    disabled={selectedOption === null}
                    onClick={handleCheck}
                  >
                    Hubi Jawaabta
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className={cn(
                      "p-4 rounded-2xl flex items-center gap-4 font-bold text-lg",
                      isCorrect ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    )}>
                      {isCorrect ? <Check /> : <AlertTriangle />}
                      {isCorrect ? 'Waa sax!' : 'Waa khalad!'}
                    </div>
                    <Button fullWidth size="lg" onClick={handleNext}>
                      Sii wad
                      <ChevronRight />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-8"
            >
              <div className="text-8xl mb-8">🏆</div>
              <div>
                <h2 className="text-4xl font-bold mb-2">Shaqo Wanaagsan!</h2>
                <p className="text-white/60">Waxaad keentay {score} ka mid ah {quiz.questions.length}</p>
              </div>
              <div className="bg-surface p-8 rounded-[2.5rem] border border-white/5">
                 <div className="text-6xl font-bold text-accent">{Math.round((score / quiz.questions.length) * 100)}%</div>
                 <p className="text-white/40 font-bold uppercase tracking-widest mt-2">Dhibcaha Guud</p>
              </div>
              <Button fullWidth size="lg" onClick={handleFinish}>
                Ku noqo Dashboard
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
