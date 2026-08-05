import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full mt-24 bg-[#d0e9d6] dark:bg-[#203529] border-t border-[#006d35]/10">
      <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-8 px-6 py-12 w-full max-w-7xl mx-auto">
        {/* Brand Info & Contact */}
        <div className="flex flex-col gap-4 text-right w-full md:w-auto">
          <div className="text-3xl font-bold text-[#006d35] dark:text-[#62ff96]">
            أكاديمية الأحياء مع الأستاذة مروة هاشم ٢٠٢٧
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-[#3b4a3d] dark:text-[#d0e9d6]">
            <div className="flex items-center gap-2 text-xl font-medium">
              <span className="material-symbols-outlined text-[#006d35]">location_on</span>
              <span>سنتر الفتح ٢</span>
            </div>
            <div className="flex items-center gap-2 text-xl font-medium" dir="ltr">
              <span className="material-symbols-outlined text-[#006d35]">call</span>
              <span>+20 10 92600559</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-xl font-semibold text-[#3b4a3d] dark:text-[#d0e9d6]">
          <a href="#" className="hover:text-[#b02f00] transition-colors">سياسة الخصوصية</a>
          <a href="#" className="hover:text-[#b02f00] transition-colors">شروط الخدمة</a>
          <a href="#" className="hover:text-[#b02f00] transition-colors">دعم الطلاب</a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#d5eedc] dark:bg-[#0a2014] py-4 px-6 text-center text-lg text-[#006d35] dark:text-[#62ff96] font-medium border-t border-[#006d35]/10">
        © ٢٠٢٧ أكاديمية الأحياء. جميع الحقوق محفوظة
      </div>
    </footer>
  );
};

export default Footer;
