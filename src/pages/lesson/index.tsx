import lessons, { Lesson } from '../../data/lessons';
import Card from '../../components/common/Card';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import React from 'react';
import { useRouter } from 'next/router';

const sidebarItems = [
  { href: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { href: '/lesson', icon: '📘', label: 'My Lessons' },
  // { href: '/ai', icon: '🧠', label: 'AI Recommendations' }, // Remove this
  { href: '/progress', icon: '📊', label: 'Progress' },
  { href: '/settings', icon: '⚙️', label: 'Settings' },
  { href: '/logout', icon: '🚪', label: 'Logout' },
];

function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

  // My Scores summary state
  const [myScores, setMyScores] = useState<{ completed: number; total: number; avgScore: number }>({ completed: 0, total: 0, avgScore: 0 });
  const [perLessonScores, setPerLessonScores] = useState<Array<{ id: string; title: string; completed: number; total: number; avgScore: number }>>([]);
  const [showScores, setShowScores] = useState(false);

  // Helper to recalculate scores
  const recalcScores = () => {
    let completed = 0, total = 0, scoreSum = 0, scoreCount = 0;
    const perLesson: Array<{ id: string; title: string; completed: number; total: number; avgScore: number }> = [];
    lessons.forEach(lesson => {
      const chapters = lesson.chapters || [];
      const storedCompleted = typeof window !== 'undefined' ? localStorage.getItem(`lesson-${lesson.id}-completedChapters`) : null;
      const storedScores = typeof window !== 'undefined' ? localStorage.getItem(`lesson-${lesson.id}-quizScores`) : null;
      const completedChapters = storedCompleted ? JSON.parse(storedCompleted) : {};
      const quizScores = storedScores ? JSON.parse(storedScores) : {};
      let lessonCompleted = 0, lessonScoreSum = 0, lessonScoreCount = 0;
      chapters.forEach(ch => {
        total++;
        if (completedChapters[ch.id]) {
          completed++;
          lessonCompleted++;
        }
        if (quizScores[ch.id] !== undefined) {
          scoreSum += quizScores[ch.id];
          scoreCount++;
          lessonScoreSum += quizScores[ch.id];
          lessonScoreCount++;
        }
      });
      // Only include if enrolled (has any completedChapters or quizScores)
      const isEnrolled = Object.keys(completedChapters).length > 0 || Object.keys(quizScores).length > 0;
      if (isEnrolled) {
        perLesson.push({
          id: lesson.id,
          title: lesson.title,
          completed: lessonCompleted,
          total: chapters.length,
          avgScore: lessonScoreCount ? Math.round((lessonScoreSum / lessonScoreCount) * 100) / 100 : 0
        });
      }
    });
    setMyScores({ completed, total, avgScore: scoreCount ? Math.round((scoreSum / scoreCount) * 100) / 100 : 0 });
    setPerLessonScores(perLesson);
  };

  useEffect(() => {
    recalcScores();
  }, []);

  // Reset Progress handler
  const handleResetProgress = () => {
    lessons.forEach(lesson => {
      localStorage.removeItem(`lesson-${lesson.id}-completedChapters`);
      localStorage.removeItem(`lesson-${lesson.id}-quizScores`);
    });
    recalcScores();
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside className="sidebar-nav" aria-label="Sidebar Navigation">
      {/* My Scores Button replaces AI Recommendations */}
      <button
        className="btn btn-primary"
        style={{ width: '100%', marginBottom: '1rem' }}
        onClick={() => setShowScores(true)}
        aria-label="Show My Scores"
      >
        <span className="sidebar-icon" aria-hidden="true">📊</span> My Scores
      </button>
      {/* Modal/Panel for My Scores */}
      {showScores && (
        <div className="my-scores-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowScores(false)}>
          <div className="my-scores-modal" style={{ background: '#fff', borderRadius: 8, padding: 24, minWidth: 320, maxWidth: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.15)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button aria-label="Close" onClick={() => setShowScores(false)} style={{ position: 'absolute', top: 8, right: 12, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>&times;</button>
            <div className="my-scores-title" style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: 12 }}>My Scores</div>
            {perLessonScores.length === 0 ? (
              <div style={{ color: '#888', marginBottom: 16 }}>You haven't enrolled in any lessons yet.</div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 16 }}>
                {perLessonScores.map(lesson => (
                  <li key={lesson.id} style={{ marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 500 }}>{lesson.title}</div>
                    <div style={{ fontSize: '0.95em', color: '#2563eb' }}>
                      Chapters: {lesson.completed} / {lesson.total} &nbsp;|&nbsp; Avg Quiz: {lesson.avgScore}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleResetProgress}>
              Reset Progress
            </button>
          </div>
        </div>
      )}
      <button
        className="sidebar-burger"
        aria-label="Toggle sidebar"
        onClick={() => setOpen(o => !o)}
        style={{ display: isMobile ? 'flex' : 'none' }}
      >
        <div></div><div></div><div></div>
      </button>
      <nav className="sidebar-list">
        {sidebarItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link${router.pathname === item.href ? ' active' : ''}`}
            tabIndex={0}
            aria-current={router.pathname === item.href ? 'page' : undefined}
          >
            <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default function LessonList() {
  const [search, setSearch] = useState('');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const filteredLessons = lessons.filter((lesson: Lesson) =>
    lesson.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (lesson: Lesson) => setSelectedLesson(lesson);
  const handleModalClose = (e: React.MouseEvent<HTMLDivElement> | KeyboardEvent) => {
    if (
      (e instanceof MouseEvent && (e.target as HTMLElement).classList.contains('lesson-modal-overlay')) ||
      (e instanceof KeyboardEvent && e.key === 'Escape')
    ) {
      setSelectedLesson(null);
    }
  };

  React.useEffect(() => {
    if (!selectedLesson) return;
    const onKeyDown = (e: KeyboardEvent) => handleModalClose(e);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedLesson]);

  const router = useRouter();

  return (
    <div className="lessons-layout">
      <Sidebar />
      <main className="lessons-main">
        <div className="lessons-page-container">
          <h1 className="lessons-heading">Explore Tech Courses</h1>
          <div className="lessons-search-bar-wrapper">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="lessons-search-input"
              placeholder="Search for a lesson..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search for a lesson"
            />
          </div>
          <div className="lessons-grid">
            {filteredLessons.map((lesson: Lesson) => (
              <div
                className="lesson-card"
                key={lesson.id}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${lesson.title}`}
                onClick={() => handleCardClick(lesson)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCardClick(lesson)}
              >
                <img src={lesson.thumbnail} alt="Lesson thumbnail" className="lesson-thumbnail" />
                <div className="lesson-card-content">
                  <h2 className="lesson-title">{lesson.title}</h2>
                  <div className="lesson-meta">
                    <span className="lesson-duration">⏱ {lesson.duration}</span>
                    <span className="lesson-difficulty">{lesson.difficulty}</span>
                  </div>
                  <div className={`lesson-progress ${lesson.completed ? 'completed' : 'not-started'}`}>{lesson.completed ? 'Completed' : 'Not Started'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedLesson && (
          <div className="lesson-modal-overlay" onClick={handleModalClose} role="dialog" aria-modal="true">
            <div className="lesson-modal" tabIndex={-1}>
              <button className="lesson-modal-close" aria-label="Close" onClick={() => setSelectedLesson(null)}>&times;</button>
              <img src={selectedLesson.thumbnail} alt="Lesson thumbnail" className="lesson-modal-thumbnail" />
              <h2 className="lesson-modal-title">{selectedLesson.title}</h2>
              <div className="lesson-modal-meta">
                <span className="lesson-modal-duration">⏱ {selectedLesson.duration}</span>
                <span className="lesson-modal-difficulty">{selectedLesson.difficulty}</span>
              </div>
              <div className={`lesson-modal-progress ${selectedLesson.completed ? 'completed' : 'not-started'}`}>{selectedLesson.completed ? 'Completed' : 'Not Started'}</div>
              <p className="lesson-modal-description">{selectedLesson.description}</p>
              <p className="lesson-modal-long-description">
                {/* Placeholder for a more detailed description. Replace with real data if available. */}
                This course will guide you through the essential concepts and hands-on exercises to master the topic. You’ll learn best practices, see real-world examples, and complete interactive challenges to reinforce your understanding. By the end, you’ll be ready to apply your new skills in real projects.
              </p>
              <div className="lesson-modal-actions">
                {selectedLesson.completed ? (
                  <button className="btn btn-primary">Start Quiz</button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedLesson(null);
                      router.push(`/lesson/${selectedLesson.id}`);
                    }}
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 