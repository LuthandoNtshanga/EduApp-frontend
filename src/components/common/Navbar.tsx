import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
  { href: '/lesson', label: 'Lesson' },
  { href: '/admin', label: 'Admin' },
];

// Navbar component for EduApp
const Navbar: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center space-x-6">
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`hover:text-blue-400 ${
            router.pathname === href ? 'font-bold underline' : ''
          }`}
        >
          {label}
        </Link>
      ))}
      {user?.role === "admin" && (
        <Link href="/admin" className="hover:text-blue-400">Admin</Link>
      )}
      <div className="ml-auto">
        {user ? (
          <button
            onClick={logout}
            className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 