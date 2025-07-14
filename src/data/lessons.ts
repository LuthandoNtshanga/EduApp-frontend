export interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of how the web works and what web development is.',
    completed: false,
  },
  {
    id: '2',
    title: 'HTML & CSS Fundamentals',
    description: 'Understand the building blocks of web pages: HTML for structure and CSS for style.',
    completed: false,
  },
  {
    id: '3',
    title: 'JavaScript Basics',
    description: 'Get started with programming in JavaScript, the language of the web.',
    completed: false,
  },
];

export default lessons; 