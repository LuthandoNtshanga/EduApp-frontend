import PrivateRoute from "../../components/common/PrivateRoute";
import Header from "../../components/common/Header";
import { useRouter } from 'next/router';
import lessons from '../../data/lessons';
import Link from 'next/link';
import Layout from '../../components/common/Layout';

export default function LessonPage() {
  const router = useRouter();
  const { id } = router.query;

  // Find the lesson by id
  const lesson = lessons.find((l) => l.id === id);

  // Progress bar width: 100% if completed, 33% if not (for demo)
  const progressWidth = lesson?.completed ? 'w-full' : 'w-1/3';

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

  return (
    <PrivateRoute>
      <Header />
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">{lesson.title}</h1>
            <p className="text-blue-800 mb-6">{lesson.description}</p>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
                <div className={`h-4 bg-blue-600 transition-all duration-300 ${progressWidth}`}></div>
              </div>
              <div className="text-sm text-blue-700 mt-1">
                {lesson.completed ? 'Completed' : 'In Progress'}
              </div>
            </div>
            {/* Back button */}
            <Link
              href="/lesson"
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors duration-150"
            >
              &larr; Back to Lessons
            </Link>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
} 