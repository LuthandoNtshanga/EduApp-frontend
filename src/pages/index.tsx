import Layout from '../components/common/Layout';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar is already rendered globally */}
        <main className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-center text-blue-600">
            Tailwind is working!
      </h1>
        </main>
      </div>
      <div className="bg-red-500 text-white p-4 text-center">
  Tailwind is working 🎉
</div>

    </>
  );
}
