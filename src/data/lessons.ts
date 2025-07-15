export interface LessonChapter {
  id: string;
  title: string;
  article: { title: string; url: string; summary: string };
  video: { title: string; url: string };
  activity: { description: string; task: string };
  quiz: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  thumbnail: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  chapters: LessonChapter[];
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of how the web works and what web development is.',
    completed: false,
    thumbnail: '/public/globe.svg',
    duration: '1h 00m',
    difficulty: 'Beginner',
    chapters: [
      {
        id: 'html-1',
        title: 'Chapter 1: Introduction to HTML',
        article: {
          title: 'What is HTML?',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          summary: 'HTML is the standard markup language for creating web pages and web applications.'
        },
        video: {
          title: 'HTML Basics',
          url: 'https://www.youtube.com/embed/pQN-pnXPaVg'
        },
        activity: {
          description: 'Write your first HTML page with a heading and a paragraph.',
          task: 'Build a basic HTML page in CodeSandbox or your editor.'
        },
        quiz: [
          {
            question: 'What does HTML stand for?',
            options: ['Hyperlinks and Text Markup Language', 'Hyper Text Markup Language', 'Home Tool Markup Language'],
            correctAnswer: 'Hyper Text Markup Language'
          },
          {
            question: 'Which tag is used for the largest heading?',
            options: ['<h6>', '<heading>', '<h1>'],
            correctAnswer: '<h1>'
          }
        ]
      },
      {
        id: 'html-2',
        title: 'Chapter 2: HTML Elements',
        article: {
          title: 'HTML Elements Reference',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
          summary: 'HTML elements are the building blocks of HTML pages.'
        },
        video: {
          title: 'HTML Elements Explained',
          url: 'https://www.youtube.com/embed/UB1O30fR-EE'
        },
        activity: {
          description: 'Add a list and a link to your HTML page.',
          task: 'Practice using <ul>, <li>, and <a> tags.'
        },
        quiz: [
          {
            question: 'Which tag creates a link in HTML?',
            options: ['<a>', '<link>', '<href>'],
            correctAnswer: '<a>'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'HTML & CSS Fundamentals',
    description: 'Understand the building blocks of web pages: HTML for structure and CSS for style.',
    completed: false,
    thumbnail: '/public/window.svg',
    duration: '1h 15m',
    difficulty: 'Beginner',
    chapters: [
      {
        id: 'css-1',
        title: 'Chapter 1: Introduction to CSS',
        article: {
          title: 'What is CSS?',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          summary: 'CSS is used to control the style and layout of web pages.'
        },
        video: {
          title: 'CSS Basics',
          url: 'https://www.youtube.com/embed/yfoY53QXEnI'
        },
        activity: {
          description: 'Style your HTML page with colors and fonts.',
          task: 'Add a <style> block or a CSS file.'
        },
        quiz: [
          {
            question: 'What does CSS stand for?',
            options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Syntax'],
            correctAnswer: 'Cascading Style Sheets'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'JavaScript Basics',
    description: 'Get started with programming in JavaScript, the language of the web.',
    completed: false,
    thumbnail: '/public/file.svg',
    duration: '1h 30m',
    difficulty: 'Beginner',
    chapters: [
      {
        id: 'js-1',
        title: 'Chapter 1: Introduction to JavaScript',
        article: {
          title: 'JavaScript Guide',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
          summary: 'JavaScript is a programming language that lets you implement complex features on web pages.'
        },
        video: {
          title: 'JavaScript Basics',
          url: 'https://www.youtube.com/embed/W6NZfCO5SIk'
        },
        activity: {
          description: 'Write a script to display an alert on your page.',
          task: 'Use <script>alert("Hello, world!")</script> in your HTML.'
        },
        quiz: [
          {
            question: 'Which keyword declares a variable in JavaScript?',
            options: ['var', 'let', 'const', 'all of the above'],
            correctAnswer: 'all of the above'
          }
        ]
      }
    ]
  }
];

export default lessons; 