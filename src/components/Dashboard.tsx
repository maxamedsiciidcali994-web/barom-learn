import React from 'react';
import { motion } from 'motion/react';
import { BentoCard } from './ui/BentoCard';
import { 
  Book, 
  Mic, 
  Brain, 
  Trophy, 
  Users, 
  Settings,
  Flame,
  Star,
  ChevronRight
} from 'lucide-react';
import { UserProfile, Language } from '@/types';
import { cn } from '@/src/lib/utils';

interface DashboardProps {
  user: UserProfile;
  onAction: (action: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onAction }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto pb-24">
      <header className="flex justify-between items-center mb-8 pt-6">
        <div>
          <h1 className="text-3xl font-bold">Maalin wanaagsan,</h1>
          <p className="text-white/60">{user.displayName || 'Arday'}</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/5">
            <Flame size={20} className="text-orange-500" />
            <span className="font-bold">{user.stats.streak}</span>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/5">
            <Star size={20} className="text-yellow-400" />
            <span className="font-bold">{user.stats.xp}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {/* Main Lesson Card */}
        <BentoCard 
          variant="primary" 
          className="col-span-2 h-48 flex flex-col justify-end gap-2 overflow-hidden relative"
          onClick={() => onAction('lessons')}
        >
          <Book className="absolute top-6 right-6 opacity-20" size={80} />
          <div className="relative z-10">
            <span className="text-white/60 text-sm font-semibold uppercase tracking-wider">Casharka Maanta</span>
            <h3 className="text-2xl font-bold">Introduction to {user.targetLanguage}</h3>
            <div className="w-full bg-white/20 h-2 rounded-full mt-4">
              <div className="bg-white h-full rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </BentoCard>

        {/* Vocabulary */}
        <BentoCard onClick={() => onAction('vocabulary')}>
          <Brain className="text-accent mb-4" size={32} />
          <h3 className="text-lg font-bold">Vocabulary</h3>
          <p className="text-white/40 text-sm">12 new words</p>
        </BentoCard>

        {/* Pronunciation */}
        <BentoCard onClick={() => onAction('pronunciation')}>
          <Mic className="text-primary mb-4" size={32} />
          <h3 className="text-lg font-bold">Pronunciation</h3>
          <p className="text-white/40 text-sm">5 exercises</p>
        </BentoCard>

        {/* Daily Challenges */}
        <BentoCard className="col-span-1" onClick={() => onAction('challenges')}>
          <Flame className="text-orange-500 mb-4" size={32} />
          <h3 className="text-lg font-bold">Challenges</h3>
          <p className="text-white/40 text-sm">3 active</p>
        </BentoCard>

        {/* Achievements */}
        <BentoCard onClick={() => onAction('achievements')}>
          <Trophy className="text-yellow-400 mb-4" size={32} />
          <h3 className="text-lg font-bold">Badges</h3>
          <p className="text-white/40 text-sm">4 unlocked</p>
        </BentoCard>

        {/* Progress Tracker (Full Width) */}
        <BentoCard className="col-span-2 flex items-center justify-between" onClick={() => onAction('stats')}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <Star className="text-accent" />
            </div>
            <div>
              <h3 className="font-bold">Progress Tracking</h3>
              <p className="text-white/40 text-sm">Level {user.stats.skillLevel}</p>
            </div>
          </div>
          <ChevronRight className="text-white/20" />
        </BentoCard>
      </div>

      {/* Navigation Bar (Floating) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm glass rounded-full p-2 flex justify-between items-center shadow-2xl border border-white/10 z-50">
         <NavButton icon={<Book />} active />
         <NavButton icon={<Trophy />} />
         <NavButton icon={<Users />} />
         <NavButton icon={<Settings />} />
      </nav>
    </div>
  );
};

const NavButton = ({ icon, active }: { icon: React.ReactNode, active?: boolean }) => (
  <button className={cn(
    "p-4 rounded-full transition-all",
    active ? "bg-primary text-white scale-110 shadow-lg shadow-primary/40" : "text-white/40 hover:text-white"
  )}>
    {React.cloneElement(icon as React.ReactElement, { size: 24 })}
  </button>
);
