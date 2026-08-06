import React from 'react';

export default function Footer() {
  return (
    <footer dir="rtl" style={{ background: '#d0e9d6' }}>
      {/* ── Main row ── */}
      <div
        className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
      >
        {/* Brand + contact – right */}
        <div className="flex flex-col gap-5">
          <span className="font-bold" style={{ fontSize: '1.6rem', color: '#006d35' }}>
            أكاديمية الأحياء
          </span>

          <div className="flex flex-col gap-2">
            {/* Location */}
            <div className="flex flex-row-reverse items-center gap-2" style={{ color: '#3b4a3d', fontSize: '0.95rem' }}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20, fontVariationSettings: "'FILL' 1", color: '#006d35' }}
              >
                location_on
              </span>
              <span>سنتر الفتح 2</span>
            </div>

            {/* Phone */}
            <div className="flex flex-row-reverse items-center gap-2" style={{ color: '#3b4a3d', fontSize: '0.95rem' }} dir="ltr">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20, fontVariationSettings: "'FILL' 1", color: '#006d35' }}
              >
                call
              </span>
              <span>+20 10 92600559</span>
            </div>
          </div>
        </div>

        {/* Policy links – left */}
        <div className="flex flex-wrap gap-6">
          {['سياسة الخصوصية', 'شروط الخدمة', 'دعم الطلاب'].map((label) => (
            <a
              key={label}
              href="#"
              className="font-semibold transition-colors duration-200"
              style={{ color: '#3b4a3d', fontSize: '0.95rem', opacity: 0.85 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#b02f00'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#3b4a3d'; e.currentTarget.style.opacity = '0.85'; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div
        className="w-full text-center py-4"
        style={{
          background: '#d5eedc',
          borderTop: '1px solid rgba(0,109,53,0.08)',
          fontSize: '0.85rem',
          color: '#006d35',
          opacity: 0.85,
        }}
      >
        © 2027 أكاديمية الأحياء. جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
