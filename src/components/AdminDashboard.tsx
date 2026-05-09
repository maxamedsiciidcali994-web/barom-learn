import React from 'react';
import { motion } from 'motion/react';
import { BentoCard } from './ui/BentoCard';
import { Users, BookOpen, BarChart3, Plus, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/src/lib/utils';

export const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto pb-24">
      <header className="flex justify-between items-center mb-12 pt-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <button onClick={onBack} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <Plus className="rotate-45" size={24} />
            </button>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-white/40">Manage lessons and students</p>
        </div>
        <Button variant="accent">
          <Plus size={20} />
          New Lesson
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         <StatsCard icon={<Users className="text-primary" />} label="Active Users" value="1,248" />
         <StatsCard icon={<BookOpen className="text-accent" />} label="Total Lessons" value="156" />
         <StatsCard icon={<BarChart3 className="text-green-500" />} label="Avg. Score" value="84%" />
      </div>

      <BentoCard className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Recent Lessons</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              type="text" 
              placeholder="Search content..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
           <LessonRow name="Greetings & Basics" level="Beginner" status="Published" />
           <LessonRow name="Daily Objects" level="Beginner" status="Published" />
           <LessonRow name="Family Relations" level="Intermediate" status="Draft" />
        </div>
      </BentoCard>
    </div>
  );
};

const StatsCard = ({ icon, label, value }: any) => (
  <BentoCard className="flex flex-col items-center text-center">
    <div className="p-4 bg-white/5 rounded-2xl mb-4">{icon}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-white/40 text-xs font-bold uppercase tracking-wider">{label}</div>
  </BentoCard>
);

const LessonRow = ({ name, level, status }: any) => (
  <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
        <BookOpen size={20} className="text-primary" />
      </div>
      <div>
        <div className="font-bold">{name}</div>
        <div className="text-xs text-white/40">{level}</div>
      </div>
    </div>
    <div className={cn(
      "text-xs font-bold px-3 py-1 rounded-full",
      status === 'Published' ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
    )}>
      {status}
    </div>
  </div>
);

// End of file
