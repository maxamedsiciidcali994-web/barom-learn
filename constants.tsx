export const THEME = {
  colors: {
    primary: '#6C4AB6',    // Deep Purple
    secondary: '#121212',  // Soft Black
    accent: '#34B7F1',     // Neon Blue
    background: '#1C1C1E', // Dark Gray
    surface: '#2C2C2E',    // Slightly Lighter Gray for cards
    text: '#FFFFFF',
    textMuted: '#A1A1A6',
  },
  animation: {
    spring: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export const ACHIEVEMENTS = [
  { id: 'first_step', title: 'First Step', description: 'Complete your first lesson', icon: '🎯' },
  { id: 'streak_3', title: 'On Fire', description: 'Maintain a 3-day streak', icon: '🔥' },
  { id: 'vocab_master', title: 'Vocab Master', description: 'Learn 50 new words', icon: '📚' },
  { id: 'local_speaker', title: 'Local Speaker', description: 'Master 10 pronunciation exercises', icon: '🗣️' },
];

export const DAILY_CHALLENGES = [
  { id: '1', title: 'Learn 5 phrases', xp: 50 },
  { id: '2', title: 'Complete a Quiz', xp: 100 },
  { id: '3', title: 'Practice Speaking', xp: 75 },
];
