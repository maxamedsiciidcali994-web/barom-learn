import React from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '@/types';
import { ACHIEVEMENTS } from '@/constants';
import { BentoCard } from './ui/BentoCard';
import { Button } from './ui/Button';
import { Settings, LogOut, ChevronLeft, Award } from 'lucide-react';
import { auth } from '@/src/services/firebase';

interface ProfileScreenProps {
  user: UserProfile;
  onBack: () => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onBack, isAdmin, onAdminClick }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto pb-24">
      <header className="flex items-center gap-4 mb-8 pt-6">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
          <ChevronLeft />
        </button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>

      <div className="flex flex-col items-center mb-12">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary shadow-2xl">
           <img 
             src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`} 
             alt={user.displayName}
             className="w-full h-full object-cover"
           />
        </div>
        <h2 className="text-2xl font-bold">{user.displayName}</h2>
        <p className="text-white/40">{user.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <BentoCard className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold text-accent">{user.stats.xp}</div>
          <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Total XP</div>
        </BentoCard>
        <BentoCard className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold text-primary">{user.stats.streak}</div>
          <div className="text-white/40 text-xs font-bold uppercase tracking-widest">Day Streak</div>
        </BentoCard>
      </div>

      <h3 className="text-lg font-bold mb-4 px-2">Achievements</h3>
      <div className="grid gap-4 mb-12">
        {ACHIEVEMENTS.map(achievement => (
          <BentoCard key={achievement.id} className="flex items-center gap-4">
             <div className="text-3xl">{achievement.icon}</div>
             <div>
               <h4 className="font-bold">{achievement.title}</h4>
               <p className="text-white/40 text-sm">{achievement.description}</p>
             </div>
          </BentoCard>
        ))}
      </div>

      <div className="space-y-4">
        {isAdmin && (
          <Button fullWidth variant="accent" onClick={onAdminClick}>
            <Award size={20} />
            Admin Panel
          </Button>
        )}
        <Button fullWidth variant="secondary">
          <Settings size={20} />
          Settings
        </Button>
        <Button fullWidth variant="ghost" className="text-red-500" onClick={() => auth.signOut()}>
          <LogOut size={20} />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
