import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../../context/UserContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

const sidebarLinks = [
  { href: '/', label: 'Home' },
  { href: '/lesson/1', label: 'Lessons' },
  { href: '/profile', label: 'Profile' },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { logout } = useUser();

  // Handle logout and redirect
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex bg-blue-50">
      {/* Sidebar */}
      <aside className="w-56 bg-blue-900 text-white flex flex-col py-8 px-4 space-y-2">
        <div className="mb-8 text-2xl font-bold tracking-tight">EduApp</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2 rounded hover:bg-blue-700 transition-colors duration-150 ${
                    router.pathname === link.href || (link.href === '/lesson/1' && router.pathname.startsWith('/lesson'))
                      ? 'bg-blue-700' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-secondary w-full text-left"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-blue-900">Dashboard</span>
          {/* Placeholder for user info or actions */}
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout; 