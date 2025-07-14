import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function Header() {
  const { logout, user } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-blue-900">EduApp</h1>
        {user?.role === 'admin' && (
          <Link href="/admin" className="text-sm text-gray-700 hover:text-blue-500">
            Admin
          </Link>
        )}
      </div>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
} 