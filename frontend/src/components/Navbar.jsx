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

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.includes('#')) {
      const [pagePath, hash] = path.split('#');
      if (location.pathname !== '/' && pagePath === '/') {
        navigate('/');
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 350);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 border-b backdrop-blur-xl"
      style={{
        background: 'rgba(232,255,238,0.90)',
        borderColor: 'rgba(0,109,53,0.10)',
        boxShadow: '0 4px 20px rgba(0,109,53,0.05)',
      }}
    >
      <div className="flex flex-row-reverse justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">

        {/* Brand */}
        <Link to="/" className="font-bold text-2xl md:text-3xl text-[#006d35] tracking-tight">
          أكاديمية الأحياء
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex flex-row-reverse items-center gap-8">
          {[
            { label: 'الرئيسية', path: '/' },
            { label: 'المميزات', path: '/#features' },
            { label: 'المنهج', path: '/curriculum' },
            { label: 'المحاضرات', path: '/lectures' },
          ].map(({ label, path }) => {
            const active = isActive(path.split('#')[0]);
            return (
              <button
                key={path}
                onClick={() => handleNavClick(path)}
                className={`text-2xl font-bold cursor-pointer transition-all duration-200 ${
                  active
                    ? 'text-[#006d35] border-b-4 border-[#006d35] pb-1'
                    : 'text-[#3b4a3d] hover:text-[#006d35]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.type === 'admin' ? (
                <Link
                  to="/admin/dashboard"
                  className="hidden md:inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-bold shadow-lg hover:-translate-y-0.5 transition-all text-xl"
                  style={{ background: 'linear-gradient(to right, #00e676, #006d35)' }}
                >
                  لوحة التحكم
                </Link>
              ) : (
                <Link
                  to="/student/dashboard"
                  className="hidden md:inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-bold shadow-lg hover:-translate-y-0.5 transition-all text-xl"
                  style={{ background: 'linear-gradient(to right, #00e676, #006d35)' }}
                >
                  حسابي
                </Link>
              )}
              <button
                onClick={logout}
                title="تسجيل الخروج"
                className="text-[#ba1a1a] hover:bg-[#ffdad6] p-2 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/student/login"
              className="hidden md:inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xl"
              style={{ background: 'linear-gradient(to right, #00e676, #006d35)', boxShadow: '0 4px 20px rgba(0,230,118,0.3)' }}
            >
              تسجيل دخول الطلاب
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#006d35] p-2"
            aria-label="القائمة"
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#e8ffee] border-b border-[#006d35]/20 px-6 py-4 flex flex-col gap-3 shadow-xl">
          {[
            { label: 'الرئيسية', path: '/' },
            { label: 'المميزات', path: '/#features' },
            { label: 'المنهج', path: '/curriculum' },
            { label: 'المحاضرات', path: '/lectures' },
          ].map(({ label, path }) => (
            <button
              key={path}
              onClick={() => handleNavClick(path)}
              className="text-right text-xl font-bold py-2 text-[#006d35] border-b border-[#bacbb9]/40"
            >
              {label}
            </button>
          ))}
          <Link
            to="/student/login"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 w-full text-center py-3 rounded-full text-white font-bold text-xl"
            style={{ background: 'linear-gradient(to right, #00e676, #006d35)' }}
          >
            تسجيل دخول الطلاب
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
