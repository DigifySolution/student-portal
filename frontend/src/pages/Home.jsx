import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden hero-bg px-6 py-16">
        {/* Pattern overlay */}
        <div className="absolute inset-0 pattern-bg pointer-events-none"></div>

        {/* Glowing backdrop circles */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#62ff96]/30 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#ffddb3]/30 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Hero Content (Text) */}
          <div className="flex flex-col items-start gap-8 text-right order-2 lg:order-1">
            <div className="inline-flex flex-wrap items-center gap-3 px-6 py-3 rounded-full glass-card border border-[#ffb950]/50 text-[#825500] font-semibold text-lg shadow-sm">
              <span className="material-symbols-outlined text-[#825500] text-3xl">workspace_premium</span>
              <span>الأستاذة مروة هاشم | خبرة أكثر من 20 عاماً | المرحلة الإعدادية والثانوية</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a2014] max-w-2xl leading-tight">
              إتقان علم الأحياء <br />
              <span className="text-gradient">بمنظور جديد</span>
            </h1>

            <p className="text-2xl md:text-3xl font-normal text-[#3b4a3d] max-w-2xl leading-relaxed">
              أهلاً بك في دفعة 2027! اكتشف أسرار علم الأحياء مع الأستاذة مروة هاشم في تجربة تعليمية استثنائية تجمع بين الشرح الاحترافي المبسط والتطبيقات العملية الحديثة لضمان تفوقك وتحقيق أفضل نتيجة.
            </p>

            <div className="flex flex-wrap items-center gap-6 w-full mt-4">
              <Link
                to="/curriculum"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-[#00e676] to-[#006d35] text-white font-bold shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-2xl"
              >
                ابدأ رحلتك الآن
              </Link>
              <Link
                to="/student/login"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full border-2 border-[#825500] text-[#825500] font-bold hover:bg-[#825500]/10 hover:-translate-y-1 transition-all duration-300 bg-white/50 backdrop-blur-sm text-2xl"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>

          {/* Hero Image Avatar */}
          <div className="relative flex justify-center items-center z-10 order-1 lg:order-2">
            <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full p-3 bg-gradient-to-br from-[#00e475] via-[#e8ffee] to-[#ffb950] shadow-[0_0_80px_rgba(0,109,53,0.25)]">
              <div className="absolute inset-0 rounded-full border-4 border-white/60 backdrop-blur-md"></div>
              <img
                className="w-full h-full object-cover rounded-full relative z-10"
                alt="الأستاذة مروة هاشم"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
              />
            </div>

            {/* Floating Batch Badge */}
            <div className="absolute -right-4 top-12 glass-card px-6 py-4 rounded-2xl flex items-center gap-4 animate-bounce shadow-xl">
              <span className="material-symbols-outlined text-[#b02f00] text-4xl">local_fire_department</span>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-[#3b4a3d]">الدفعة الجديدة</span>
                <span className="text-3xl text-[#006d35] font-bold">2027</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full px-6 py-20 bg-white overflow-hidden" id="features">
        <div className="absolute top-0 right-0 w-full h-full pattern-bg opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-[#0a2014] mb-6">
              إيه <span className="text-gradient">مميزات</span> المنصة؟
            </h2>
            <p className="text-2xl text-[#3b4a3d] max-w-3xl mx-auto">
              كل حاجة محتاجها عشان تتفوق في مادة الأحياء متوفرة في مكان واحد بتجربة تعليمية متكاملة.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 rounded-2xl bg-[#62ff96]/40 flex items-center justify-center border border-[#00e475]/50 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#00e676] text-5xl">video_library</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0a2014]">فيديوهات بجودة عالية</h3>
              <p className="text-xl text-[#3b4a3d] leading-relaxed">
                جودة متنوعة تناسب سرعة الإنترنت عندك (من 240p لتوفير البيانات لحد 1080p HD) عشان الشرح يكون واضح دايماً.
              </p>
            </div>

            {/* Feature 2 (Spans 2 cols) */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 lg:col-span-2 group">
              <div className="w-20 h-20 rounded-2xl bg-[#ffddb3]/40 flex items-center justify-center border border-[#ffb950]/50 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#feaa00] text-5xl">menu_book</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0a2014]">محتوى علمي متكامل</h3>
              <p className="text-xl text-[#3b4a3d] leading-relaxed">
                كل حاجة محتاجها في مكان واحد: كل محاضرة بتحتوي على شرح تفصيلي، اختبارات جزئية، حل الواجب مع المستر، وامتحان نهائي شامل على المحاضرة. النظام ده بيضمن إنك تهضم المعلومة كاملة.
              </p>
              <div className="mt-2 flex gap-3 flex-wrap">
                <span className="px-5 py-2 rounded-full bg-[#d5eedc] text-[#0a2014] text-lg font-bold border border-[#bacbb9]/40">شرح تفصيلي</span>
                <span className="px-5 py-2 rounded-full bg-[#d5eedc] text-[#0a2014] text-lg font-bold border border-[#bacbb9]/40">اختبارات جزئية</span>
                <span className="px-5 py-2 rounded-full bg-[#d5eedc] text-[#0a2014] text-lg font-bold border border-[#bacbb9]/40">حل واجب</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 rounded-2xl bg-[#ffdbd1]/40 flex items-center justify-center border border-[#ffb5a0]/50 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#b02f00] text-5xl">quiz</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0a2014]">امتحانات شاملة</h3>
              <p className="text-xl text-[#3b4a3d] leading-relaxed">
                تدريب مستمر على أحدث أنماط الأسئلة. امتحانات تراكمية واختبارات داخل كل محاضرة عشان تقيس مستواك أول بأول.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 rounded-2xl bg-[#00e676]/30 flex items-center justify-center border border-[#00e676]/40 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#00e676] text-5xl">support_agent</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0a2014]">دعم علمي ونفسي</h3>
              <p className="text-xl text-[#3b4a3d] leading-relaxed">
                دعم علمي: لو عندك أي سؤال جه في بالك وانت بتذاكر هيردوا عليك فورًا. دعم نفسي: هيساعدك في أي حاجة تواجهك في المذاكرة وتحديد أفضل طرق المذاكرة.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-20 h-20 rounded-2xl bg-[#ffddb3]/40 flex items-center justify-center border border-[#ffb950]/50 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[#825500] text-5xl">picture_as_pdf</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0a2014]">ملخصات و PDF</h3>
              <p className="text-xl text-[#3b4a3d] leading-relaxed">
                حمّل الملفات بشكل مباشر على جهازك بضغطة واحدة: سبورة المحاضرة، ملخصات الفصول، والامتحانات للطباعة عشان تذاكر أوفلاين براحتك.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
