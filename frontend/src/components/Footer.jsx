import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full mt-16" style={{ background: '#d0e9d6' }}>
      {/* Main footer content */}
      <div
        className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-12 px-6 py-16 w-full max-w-7xl mx-auto"
      >
        {/* Brand + Contact */}
        <div className="flex flex-col gap-6 text-right w-full md:w-auto">
          <div className="text-4xl font-bold text-[#006d35]">
            أكاديمية الأحياء
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-[#3b4a3d]">
              <span
                className="material-symbols-outlined text-[#006d35]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
              <span className="text-xl">سنتر الفتح ٢</span>
            </div>
            <div className="flex items-center gap-3 text-[#3b4a3d]" dir="ltr">
              <span
                className="material-symbols-outlined text-[#006d35]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call
              </span>
              <span className="text-xl">+20 10 92600559</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-8 w-full md:w-auto">
          {['سياسة الخصوصية', 'شروط الخدمة', 'دعم الطلاب'].map((label) => (
            <a
              key={label}
              href="#"
              className="text-2xl font-bold text-[#3b4a3d] hover:text-[#b02f00] opacity-80 hover:opacity-100 transition-all"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <div className="w-full py-6 px-6 text-center" style={{ background: '#d5eedc', borderTop: '1px solid rgba(0,109,53,0.10)' }}>
        <div className="text-xl text-[#006d35] opacity-80 max-w-7xl mx-auto">
          © ٢٠٢٧ أكاديمية الأحياء. جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
};

export default Footer;
