import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NAV_LINKS = [
  { label: 'الرئيسية',  path: '/' },
  { label: 'المميزات',  path: '/#features' },
  { label: 'المنهج',    path: '/curriculum' },
  { label: 'المحاضرات', path: '/lectures' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active link detection ── */
  const isActive = (path) => {
    const base = path.split('#')[0];
    if (base === '/')  return location.pathname === '/';
    return location.pathname.startsWith(base);
  };

  /* ── Navigation handler (handles hash anchors) ── */
  const go = (path) => {
    setMobileOpen(false);
    if (path.includes('#')) {
      const [page, hash] = path.split('#');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 380);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav
      dir="rtl"
      className="fixed top-0 inset-x-0 z-50 w-full transition-shadow duration-300"
      style={{
        background: 'rgba(232,255,238,0.92)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(0,109,53,0.10)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,109,53,0.08)' : 'none',
      }}
    >
      {/* ── Main bar ── */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 68 }}>

        {/* Brand – right in RTL */}
        <Link
          to="/"
          className="font-bold tracking-tight shrink-0"
          style={{ fontSize: '1.35rem', color: '#006d35' }}
        >
          أكاديمية الأحياء
        </Link>

        {/* Desktop nav links – centered */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, path }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => go(path)}
                className="relative font-semibold transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
                style={{
                  fontSize: '1rem',
                  color: active ? '#006d35' : '#3b4a3d',
                  paddingBottom: '4px',
                }}
              >
                {label}
                {/* Active underline */}
                {active && (
                  <span
                    className="absolute inset-x-0 bottom-0 rounded-full"
                    style={{ height: 2, background: '#006d35' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Action area – left in RTL */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Logged-in: show dashboard link + logout */}
              <Link
                to={user.type === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
                className="hidden md:inline-flex items-center gap-2 font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(to left, #00e676, #006d35)',
                  color: '#ffffff',
                  padding: '9px 24px',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 16px rgba(0,230,118,0.30)',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}
                >
                  account_circle
                </span>
                {user.type === 'admin' ? 'لوحة التحكم' : 'حسابي'}
              </Link>
              <button
                onClick={logout}
                title="تسجيل الخروج"
                className="rounded-full transition-colors duration-200"
                style={{ color: '#ba1a1a', padding: '8px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>logout</span>
              </button>
            </>
          ) : (
            /* Logged-out: show student login */
            <Link
              to="/student/login"
              className="hidden md:inline-flex items-center font-bold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: 'linear-gradient(to left, #00e676, #006d35)',
                color: '#ffffff',
                padding: '9px 24px',
                fontSize: '0.95rem',
                boxShadow: '0 4px 16px rgba(0,230,118,0.30)',
              }}
            >
              تسجيل دخول الطلاب
            </Link>
          )}

          {/* Hamburger – mobile only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden rounded-lg transition-colors duration-200"
            style={{ color: '#006d35', padding: '6px' }}
            aria-label="القائمة"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(225,250,231,0.98)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(0,109,53,0.08)',
          }}
          className="md:hidden flex flex-col px-6 py-4 gap-2 shadow-xl"
        >
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              onClick={() => go(path)}
              className="text-right py-3 font-bold transition-colors"
              style={{
                fontSize: '1.05rem',
                color: isActive(path) ? '#006d35' : '#3b4a3d',
                borderBottom: '1px solid rgba(186,203,185,0.35)',
              }}
            >
              {label}
            </button>
          ))}

          {user ? (
            <Link
              to={user.type === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
              onClick={() => setMobileOpen(false)}
              className="mt-3 text-center font-bold rounded-full"
              style={{
                background: 'linear-gradient(to left, #00e676, #006d35)',
                color: '#fff',
                padding: '12px',
                fontSize: '1rem',
              }}
            >
              {user.type === 'admin' ? 'لوحة التحكم' : 'حسابي'}
            </Link>
          ) : (
            <Link
              to="/student/login"
              onClick={() => setMobileOpen(false)}
              className="mt-3 text-center font-bold rounded-full"
              style={{
                background: 'linear-gradient(to left, #00e676, #006d35)',
                color: '#fff',
                padding: '12px',
                fontSize: '1rem',
              }}
            >
              تسجيل دخول الطلاب
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
