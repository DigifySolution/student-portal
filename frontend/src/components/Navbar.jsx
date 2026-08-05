import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'المميزات', path: '/#features' },
    { label: 'المنهج', path: '/curriculum' },
    { label: 'المحاضرات', path: '/lectures' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.includes('#')) {
      const elementId = path.split('#')[1];
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#e8ffee]/90 dark:bg-[#203529]/90 backdrop-blur-xl border-b border-[#006d35]/10 shadow-[0_4px_20px_rgba(0,109,53,0.05)] h-20">
      <div className="flex flex-row-reverse justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto h-full">
        {/* Brand */}
        <Link
          to="/"
          className="font-bold text-2xl md:text-3xl text-[#006d35] dark:text-[#62ff96] tracking-tight flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[#00e676] text-3xl">genetics</span>
          <span>أكاديمية الأحياء مع الأستاذة مروة هاشم ٢٠٢٧</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-row-reverse items-center gap-8 font-semibold text-xl">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`transition-all duration-200 cursor-pointer ${
                isActive(link.path)
                  ? 'text-[#006d35] dark:text-[#00e475] border-b-4 border-[#006d35] dark:border-[#00e475] pb-1 font-bold'
                  : 'text-[#3b4a3d] dark:text-[#d0e9d6] hover:text-[#006d35] dark:hover:text-[#62ff96]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* User / Login Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.type === 'admin' ? (
                <Link
                  to="/admin/dashboard"
                  className="bg-[#006d35] text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-[#005226] transition-all"
                >
                  لوحة التحكم
                </Link>
              ) : (
                <Link
                  to="/student/dashboard"
                  className="bg-[#006d35] text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-[#005226] transition-all"
                >
                  حسابي ({user.name || 'الطالب'})
                </Link>
              )}
              <button
                onClick={logout}
                className="text-[#ba1a1a] hover:bg-[#ffdad6] p-2 rounded-full transition-colors flex items-center"
                title="تسجيل الخروج"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/student/login"
              className="bg-gradient-to-r from-[#00e676] to-[#006d35] text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-lg"
            >
              تسجيل دخول الطلاب
            </Link>
          )}

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#006d35] p-2"
            aria-label="القائمة"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#e8ffee] border-b border-[#006d35]/20 px-6 py-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavClick(link.path)}
              className="text-right text-xl font-semibold py-2 text-[#006d35] border-b border-gray-200"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
