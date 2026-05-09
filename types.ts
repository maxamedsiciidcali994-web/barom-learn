export enum Language {
  ENGLISH = 'English',
  SOMALI = 'Somali'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface UserStats {
  xp: number;
  streak: number;
  completedLessons: number;
  skillLevel: SkillLevel;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  targetLanguage: Language;
  stats: UserStats;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: SkillLevel;
  type: 'vocabulary' | 'grammar' | 'pronunciation' | 'conversation';
  content: LessonPart[];
}

export interface LessonPart {
  id: string;
  english: string;
  somali: string;
  audioUrl?: string;
  context?: string;
}

export interface Quiz {
  id: string;
  title: string;
  lessonId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  type: 'multiple-choice' | 'matching' | 'translation';
}
