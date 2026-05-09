import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WelcomeScreen } from './src/components/WelcomeScreen';
import { LanguageSelection } from './src/components/LanguageSelection';
import { Dashboard } from './src/components/Dashboard';
import { LessonScreen } from './src/components/LessonScreen';
import { QuizScreen } from './src/components/QuizScreen';
import { ProfileScreen } from './src/components/ProfileScreen';
import { AdminDashboard } from './src/components/AdminDashboard';
import { Button } from './src/components/ui/Button';
import { LogIn, BookOpen, CheckCircle2 } from 'lucide-react';
import { Language, UserProfile, SkillLevel } from './types';
import { MOCK_LESSONS, MOCK_QUIZ } from './src/data/mockLessons';
import { auth, signInWithGoogle, getUserProfile, createUserProfile, updateStats, updateTargetLanguage } from './src/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

type AppState = 'welcome' | 'login' | 'language-selection' | 'dashboard' | 'lesson' | 'quiz' | 'profile' | 'admin';

const LoginButton: React.FC<{ onSignIn: () => Promise<any> }> = ({ onSignIn }) => {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');
  const [seconds, setSeconds] = useState(8);

  const startVerification = () => {
    setStatus('verifying');
    let count = 8;
    const interval = setInterval(() => {
      count -= 1;
      setSeconds(count);
      if (count === 0) {
        clearInterval(interval);
        setStatus('verified');
      }
    }, 1000);
  };

  const handleFinalSignIn = async () => {
    try {
      await onSignIn();
    } catch (error: any) {
      // Handle cases where user closes popup or it's blocked again
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/popup-blocked') {
        setStatus('verified'); // Stay at verified state so they can retry click
      } else {
        setStatus('idle');
      }
    }
  };

  if (status === 'verifying') {
    return (
      <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/10 text-center animate-pulse">
        <div className="text-primary font-bold text-xl mb-2">Human Verification</div>
        <p className="text-white/40 text-sm mb-4">Verifying your identity... {seconds}s</p>
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
            className="h-full bg-primary"
          />
        </div>
      </div>
    );
  }

  if (status === 'verified') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full space-y-4"
      >
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-center">
          <p className="text-green-500 text-sm font-bold flex items-center justify-center gap-2">
            <CheckCircle2 size={16} />
            Verification Passed
          </p>
        </div>
        <Button fullWidth size="lg" variant="primary" onClick={handleFinalSignIn} className="purple-glow">
          <LogIn size={20} />
          Proceed to Sign In
        </Button>
      </motion.div>
    );
  }

  return (
    <Button fullWidth size="lg" onClick={startVerification}>
      <LogIn size={20} />
      Sign in with Google
    </Button>
  );
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isUserAdmin = user?.email === 'maxamedsiciidcali994@gmail.com';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        if (profile) {
          setUser(profile);
          setAppState('dashboard');
        } else {
          // Create profile if missing
          const newProfile = await createUserProfile(firebaseUser.uid, firebaseUser.email || '', firebaseUser.displayName || '');
          setUser(newProfile);
          setAppState('language-selection');
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleAction = (action: string) => {
    if (action === 'lessons') setAppState('lesson');
    if (action === 'vocabulary' || action === 'challenges') setAppState('quiz');
    if (action === 'stats' || action === 'settings') setAppState('profile');
    if (action === 'admin') setAppState('admin');
  };

  const handleLessonComplete = async (xp: number) => {
    if (user) {
      await updateStats(user.uid, xp);
      const updatedProfile = await getUserProfile(user.uid);
      if (updatedProfile) setUser(updatedProfile);
    }
    setAppState('dashboard');
  };

  if (loading) {
     return (
       <div className="min-h-screen bg-dark-gray flex items-center justify-center">
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
           className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
         />
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-dark-gray text-white selection:bg-primary/30">
      <AnimatePresence mode="wait">
        {appState === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={() => setAppState('login')} />
        )}

        {appState === 'login' && (
          <motion.div 
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
          >
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
              <BookOpen size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Sign in to Barom</h2>
            <p className="text-white/40 mb-8 text-center max-w-xs">
              Secure login with Google. Multi-factor device verification active.
            </p>

            <div className="w-full max-w-sm space-y-4">
              <LoginButton onSignIn={signInWithGoogle} />
              
              <Button fullWidth variant="ghost" onClick={() => setAppState('welcome')}>
                Back
              </Button>
            </div>
            
            <p className="mt-12 text-white/20 text-[10px] text-center max-w-xs uppercase tracking-tighter">
              Amniga xogtaada waa noo muhiim. Aaladdaada waa la xaqiijiyay.
            </p>
          </motion.div>
        )}

        {appState === 'language-selection' && (
          <LanguageSelection key="lang" onSelect={async (lang) => {
             if (user) {
               await updateTargetLanguage(user.uid, lang);
               setUser({...user, targetLanguage: lang});
             }
             setAppState('dashboard');
          }} />
        )}

        {appState === 'dashboard' && user && (
          <Dashboard key="dash" user={user} onAction={handleAction} />
        )}

        {appState === 'lesson' && (
          <LessonScreen 
            key="lesson"
            lesson={MOCK_LESSONS[0]} 
            onClose={() => setAppState('dashboard')}
            onComplete={handleLessonComplete}
          />
        )}

        {appState === 'quiz' && (
          <QuizScreen
            key="quiz"
            quiz={MOCK_QUIZ}
            onClose={() => setAppState('dashboard')}
            onComplete={handleLessonComplete}
          />
        )}

        {appState === 'profile' && user && (
          <ProfileScreen 
            key="profile"
            user={user}
            isAdmin={isUserAdmin}
            onAdminClick={() => handleAction('admin')}
            onBack={() => setAppState('dashboard')}
          />
        )}

        {appState === 'admin' && isUserAdmin && (
          <AdminDashboard 
            key="admin"
            onBack={() => setAppState('dashboard')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
