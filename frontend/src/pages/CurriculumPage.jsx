import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CurriculumPage = () => {
  const [selectedGrade, setSelectedGrade] = useState('1HIGH'); // '1HIGH', '2HIGH', '3HIGH'
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnits(selectedGrade);
  }, [selectedGrade]);

  const fetchUnits = async (grade) => {
    setLoading(true);
    try {
      const studentIdParam = user?.id ? `&studentId=${user.id}` : '';
      const response = await axios.get(`/curriculum/units?grade=${grade}${studentIdParam}`);
      if (response.data.success) {
        setUnits(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching curriculum units:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeTitle = (grade) => {
    switch (grade) {
      case '1HIGH': return 'الصف الأول الثانوي';
      case '2HIGH': return 'الصف الثاني الثانوي';
      case '3HIGH': return 'الصف الثالث الثانوي';
      default: return 'المرحلة الثانوية';
    }
  };

  const handleStartStudy = (unit) => {
    // Find first video in first lesson
    const firstVid = unit.lessons?.[0]?.videos?.[0];
    if (firstVid) {
      navigate(`/lectures?videoId=${firstVid.id}`);
    } else {
      navigate(`/lectures`);
    }
  };

  const getThemeColors = (theme, index) => {
    if (theme === 'secondary' || index % 3 === 1) {
      return {
        bannerBg: 'bg-[#feaa00]',
        badgeBg: 'bg-[#ffddb3]',
        badgeText: 'text-[#291800]',
        progressText: 'text-[#825500]',
        progressBar: 'bg-[#825500]',
        buttonBorder: 'border-[#825500]',
        buttonText: 'text-[#825500]',
        buttonHover: 'hover:bg-[#825500]/10',
        hoverText: 'group-hover:text-[#feaa00]',
        icon: 'dns',
      };
    }
    if (theme === 'tertiary' || index % 3 === 2) {
      return {
        bannerBg: 'bg-[#ffb7a3]',
        badgeBg: 'bg-[#ffdbd1]',
        badgeText: 'text-[#3b0900]',
        progressText: 'text-[#3b4a3d]',
        progressBar: 'bg-[#006d35]',
        buttonBorder: 'border-[#006d35]',
        buttonText: 'text-white',
        buttonHover: 'bg-[#006d35] hover:bg-[#005226]',
        hoverText: 'group-hover:text-[#ffb7a3]',
        icon: 'eco',
      };
    }
    return {
      bannerBg: 'bg-[#00e676]',
      badgeBg: 'bg-[#62ff96]',
      badgeText: 'text-[#00210b]',
      progressText: 'text-[#006d35]',
      progressBar: 'bg-[#006d35]',
      buttonBorder: 'border-[#006d35]',
      buttonText: 'text-[#006d35]',
      buttonHover: 'hover:bg-[#006d35]/10',
      hoverText: 'group-hover:text-[#006d35]',
      icon: 'biotech',
    };
  };

  return (
    <main className="max-w-7xl mx-auto px-6 pt-28 pb-16 min-h-[85vh]">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#006d35] mb-2">اختر مرحلتك الدراسية</h1>
          <p className="text-2xl text-[#3b4a3d]">تصفح منهج الأحياء الشامل الخاص بك ({getGradeTitle(selectedGrade)})</p>
        </div>

        {/* Grade Pills Switcher */}
        <div className="flex gap-2 p-1 bg-[#dbf4e2] rounded-xl border border-[#bacbb9]/40">
          <button
            onClick={() => setSelectedGrade('1HIGH')}
            className={`px-8 py-3 rounded-lg text-xl font-bold transition-all cursor-pointer ${
              selectedGrade === '1HIGH'
                ? 'bg-[#006d35] text-white shadow-md'
                : 'text-[#3b4a3d] hover:bg-[#d5eedc]'
            }`}
          >
            الصف الأول
          </button>
          <button
            onClick={() => setSelectedGrade('2HIGH')}
            className={`px-8 py-3 rounded-lg text-xl font-bold transition-all cursor-pointer ${
              selectedGrade === '2HIGH'
                ? 'bg-[#006d35] text-white shadow-md'
                : 'text-[#3b4a3d] hover:bg-[#d5eedc]'
            }`}
          >
            الصف الثاني
          </button>
          <button
            onClick={() => setSelectedGrade('3HIGH')}
            className={`px-8 py-3 rounded-lg text-xl font-bold transition-all cursor-pointer ${
              selectedGrade === '3HIGH'
                ? 'bg-[#006d35] text-white shadow-md'
                : 'text-[#3b4a3d] hover:bg-[#d5eedc]'
            }`}
          >
            الصف الثالث
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-2xl text-[#006d35] font-semibold">
          <span className="material-symbols-outlined animate-spin text-4xl ml-2">sync</span>
          جاري تحميل المنهج...
        </div>
      ) : units.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-2xl text-[#3b4a3d]">
          لا توجد وحدات دراسية مضافة لهذه المرحلة حالياً.
        </div>
      ) : (
        /* Course Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit, idx) => {
            const styles = getThemeColors(unit.color_theme, idx);
            const progress = unit.completed_percentage || 0;

            return (
              <div key={unit.id} className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between">
                <div>
                  {/* Banner */}
                  <div className={`h-48 ${styles.bannerBg} p-6 relative flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 pattern-bg opacity-30"></div>
                    <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md rounded-full px-5 py-2 font-bold text-white flex items-center gap-2 border border-white/50 text-xl shadow-sm">
                      <span className="material-symbols-outlined text-2xl">{unit.icon || styles.icon}</span>
                      الوحدة {unit.unit_number || idx + 1}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-4 py-2 ${styles.badgeBg} ${styles.badgeText} rounded-full font-bold text-lg`}>
                        {unit.category || 'عام'}
                      </span>
                    </div>

                    <h3 className={`text-4xl font-bold text-[#0a2014] mb-6 transition-colors ${styles.hoverText}`}>
                      {unit.title}
                    </h3>

                    {/* Progress meter */}
                    <div className="mb-8">
                      <div className="flex justify-between font-bold mb-2 text-[#3b4a3d] text-lg">
                        <span>التقدم</span>
                        <span className={`${styles.progressText} font-bold`}>{progress}% مكتمل</span>
                      </div>
                      <div className="h-3 w-full bg-[#d0e9d6] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${styles.progressBar} rounded-full transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="px-8 pb-8">
                  <button
                    onClick={() => handleStartStudy(unit)}
                    className={`w-full py-4 rounded-xl font-bold transition-all flex justify-center items-center gap-3 text-xl cursor-pointer shadow-sm ${
                      progress > 0
                        ? `border-2 ${styles.buttonBorder} ${styles.buttonText} ${styles.buttonHover}`
                        : 'bg-[#006d35] text-white hover:bg-[#005226] shadow-md'
                    }`}
                  >
                    <span>{progress > 0 ? 'استكمل المذاكرة' : 'ابدأ المذاكرة'}</span>
                    <span className="material-symbols-outlined">
                      {progress > 0 ? 'arrow_left_alt' : 'play_arrow'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default CurriculumPage;
