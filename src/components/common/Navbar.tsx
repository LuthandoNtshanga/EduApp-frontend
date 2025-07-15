import React, { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBurgerClick = () => setMenuOpen((open) => !open);
  const handleNavLinkClick = () => setMenuOpen(false);

  return (
    <nav className={`navbar${menuOpen ? ' active' : ''}`}> 
      <div className="logo">EduApp</div>
      <div className="burger" onClick={handleBurgerClick} aria-label="Toggle navigation" tabIndex={0} role="button">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="nav-links">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={router.pathname === href ? 'active' : ''}
            onClick={handleNavLinkClick}
          >
            {label}
          </Link>
        ))}
        {user ? (
          <span className="user-email">{user.email}</span>
        ) : null}
        {user ? (
          <button onClick={() => { logout(); setMenuOpen(false); }} className="btn btn-primary" style={{ marginLeft: '1rem' }}>
            Logout
          </button>
        ) : (
          <Link href="/login" className="btn btn-primary" style={{ marginLeft: '1rem' }} onClick={handleNavLinkClick}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 