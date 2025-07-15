import PrivateRoute from "../../components/common/PrivateRoute";
import Header from "../../components/common/Header";
import { useRouter } from 'next/router';
import lessons, { Lesson, LessonChapter } from '../../data/lessons';
import Link from 'next/link';
import Layout from '../../components/common/Layout';
import React, { useState, useEffect } from 'react';

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;

  // Find the lesson by id
  const lesson = lessons.find((l) => l.id === id);

  // Progress tracking (local state for now)
  const [completedChapters, setCompletedChapters] = useState<{ [chapterId: string]: boolean }>({});
  const [quizScores, setQuizScores] = useState<{ [chapterId: string]: number }>({});
  const [activeChapter, setActiveChapter] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (!lesson) return;
    const storedCompleted = localStorage.getItem(`lesson-${lesson.id}-completedChapters`);
    const storedScores = localStorage.getItem(`lesson-${lesson.id}-quizScores`);
    if (storedCompleted) setCompletedChapters(JSON.parse(storedCompleted));
    if (storedScores) setQuizScores(JSON.parse(storedScores));
  }, [lesson?.id]);

  // Save progress to localStorage
  useEffect(() => {
    if (!lesson) return;
    localStorage.setItem(`lesson-${lesson.id}-completedChapters`, JSON.stringify(completedChapters));
  }, [completedChapters, lesson?.id]);
  useEffect(() => {
    if (!lesson) return;
    localStorage.setItem(`lesson-${lesson.id}-quizScores`, JSON.stringify(quizScores));
  }, [quizScores, lesson?.id]);

  if (!lesson) {
    return (
      <PrivateRoute>
        <Header />
        <Layout>
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">Lesson Not Found</h1>
            <Link href="/lesson" className="text-blue-700 underline">Back to Lessons</Link>
          </div>
        </Layout>
      </PrivateRoute>
    );
  }

  const chapters = lesson.chapters;
  const current = chapters[activeChapter];
  const isChapterComplete = completedChapters[current.id];
  const quiz = current.quiz;
  const quizScore = quizScores[current.id] || 0;

  function handleMarkComplete() {
    setCompletedChapters((prev) => ({ ...prev, [current.id]: true }));
    setQuizAnswers({});
    setQuizSubmitted(false);
    if (activeChapter < chapters.length - 1) setActiveChapter(activeChapter + 1);
  }

  function handleQuizChange(qIdx: number, value: string) {
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: value }));
  }

  function handleQuizSubmit() {
    let score = 0;
    quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) score++;
    });
    setQuizScores((prev) => ({ ...prev, [current.id]: score }));
    setQuizSubmitted(true);
  }

  return (
    <PrivateRoute>
      <Header />
      <Layout>
        <div className="lesson-ai-container">
          <Link href="/lesson" className="btn btn-secondary lesson-ai-back-btn" style={{ marginBottom: '1.5rem', alignSelf: 'flex-start' }}>
            &larr; Back to Lessons
          </Link>
          <div className="lesson-ai-header">
            <h1 className="lesson-ai-title">{lesson.title}</h1>
            <div className="lesson-ai-progress">
              {chapters.map((ch, idx) => (
                <span
                  key={ch.id}
                  className={`lesson-ai-progress-dot${idx === activeChapter ? ' active' : ''}${completedChapters[ch.id] ? ' completed' : ''}`}
                  onClick={() => setActiveChapter(idx)}
                  title={ch.title}
                  tabIndex={0}
                  role="button"
                  aria-label={`Go to ${ch.title}`}
                />
              ))}
            </div>
          </div>
          <div className="lesson-ai-chapter-card">
            <h2 className="lesson-ai-chapter-title">{current.title}</h2>
            {/* Article */}
            <div className="lesson-ai-section">
              <a href={current.article.url} target="_blank" rel="noopener noreferrer" className="lesson-ai-article-link">
                <strong>{current.article.title}</strong>
              </a>
              <p className="lesson-ai-article-summary">{current.article.summary}</p>
            </div>
            {/* Video */}
            <div className="lesson-ai-section">
              <div className="lesson-ai-video-label">{current.video.title}</div>
              <div className="lesson-ai-video-wrapper">
                <iframe
                  src={current.video.url}
                  title={current.video.title}
                  allowFullScreen
                  className="lesson-ai-video"
                />
              </div>
            </div>
            {/* Activity */}
            <div className="lesson-ai-section">
              <div className="lesson-ai-activity-label">Activity</div>
              <div className="lesson-ai-activity-desc">{current.activity.description}</div>
              <div className="lesson-ai-activity-task">{current.activity.task}</div>
            </div>
            {/* Quiz */}
            <div className="lesson-ai-section">
              <div className="lesson-ai-quiz-label">Quiz</div>
              <form
                className="lesson-ai-quiz-form"
                onSubmit={e => {
                  e.preventDefault();
                  handleQuizSubmit();
                }}
              >
                {quiz.map((q, idx) => (
                  <div key={idx} className="lesson-ai-quiz-question">
                    <div className="lesson-ai-quiz-qtext">{q.question}</div>
                    {q.options.map(opt => (
                      <label key={opt} className="lesson-ai-quiz-option">
                        <input
                          type="radio"
                          name={`quiz-q${idx}`}
                          value={opt}
                          checked={quizAnswers[idx] === opt}
                          onChange={() => handleQuizChange(idx, opt)}
                          disabled={quizSubmitted}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ))}
                {!quizSubmitted ? (
                  <button className="btn btn-primary lesson-ai-quiz-submit" type="submit">Submit Quiz</button>
                ) : (
                  <div className="lesson-ai-quiz-score">Score: {quizScore} / {quiz.length}</div>
                )}
              </form>
            </div>
            {/* Mark Complete */}
            <div className="lesson-ai-section lesson-ai-complete-section">
              {!isChapterComplete ? (
                <button className="btn btn-secondary lesson-ai-complete-btn" onClick={handleMarkComplete}>
                  Mark Chapter Complete
                </button>
              ) : (
                <span className="lesson-ai-complete-check">✔️ Chapter Complete</span>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
} 