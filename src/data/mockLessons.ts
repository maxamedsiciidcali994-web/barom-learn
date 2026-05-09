import { Lesson, SkillLevel, Quiz } from '@/types';

export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'intro_1',
    title: 'Greetings & Basics',
    description: 'Learn common greetings in English and Somali',
    level: SkillLevel.BEGINNER,
    type: 'conversation',
    content: [
      { id: '1', english: 'Hello, how are you?', somali: 'Salaan, sidee tahay?' },
      { id: '2', english: 'I am fine, thank you.', somali: 'Waan fiicanahay, mahadsanid.' },
      { id: '3', english: 'What is your name?', somali: 'Magacaa?' },
      { id: '4', english: 'My name is Ali.', somali: 'Magacaygu waa Cali.' },
      { id: '5', english: 'Nice to meet you.', somali: 'Kula kulan wanaagsan.' },
    ]
  },
  {
    id: 'intro_2',
    title: 'Daily Objects',
    description: 'Learn names of common objects',
    level: SkillLevel.BEGINNER,
    type: 'vocabulary',
    content: [
      { id: '1', english: 'Table', somali: 'Miis' },
      { id: '2', english: 'Chair', somali: 'Kursi' },
      { id: '3', english: 'Book', somali: 'Buug' },
      { id: '4', english: 'Pen', somali: 'Qalin' },
      { id: '5', english: 'Computer', somali: 'Kumbuyuutar' },
    ]
  }
];

export const MOCK_QUIZ: Quiz = {
  id: 'quiz_1',
  title: 'Greetings Quiz',
  lessonId: 'intro_1',
  questions: [
    {
      id: 'q1',
      text: 'How do you say "Hello" in Somali?',
      options: ['Salaan', 'Mahadsanid', 'Nabad', 'Fiican'],
      correctAnswer: 0,
      type: 'multiple-choice'
    },
    {
      id: 'q2',
      text: 'What does "Magacaa?" mean?',
      options: ['How are you?', 'Where are you?', 'What is your name?', 'Nice to meet you'],
      correctAnswer: 2,
      type: 'multiple-choice'
    },
    {
      id: 'q3',
      text: 'Complete: "Salaan, sidee ______?"',
      options: ['tahay', 'yahay', 'nahay', 'tahayna'],
      correctAnswer: 0,
      type: 'multiple-choice'
    }
  ]
};
