import lessons from '../../data/lessons';
import Card from '../../components/common/Card';
import Link from 'next/link';

export default function LessonList() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Lessons</h1>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id} title={lesson.title} description={lesson.description}>
            <div className="mt-4 flex justify-end">
              <Link
                href={`/lesson/${lesson.id}`}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors duration-150"
              >
                Start
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 