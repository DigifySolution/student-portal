import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="pt-[100px] bg-[#e8ffee] text-[#0a2014] font-[IBM_Plex_Sans_Arabic,system-ui,sans-serif] antialiased overflow-x-hidden">

      {/* ─── Hero Section ─── */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden hero-bg px-6 py-16">
        {/* DNA / Biology pattern bg */}
        <div className="absolute inset-0 pattern-bg pointer-events-none"></div>

        {/* Glow orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(98,255,150,0.30)' }}></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(255,221,179,0.30)' }}></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          {/* ── Left: Text Content ── */}
          <div className="flex flex-col items-start gap-8 text-right order-2 lg:order-1 animate-fade-in-up">

            {/* Teacher badge */}
            <div className="inline-flex flex-wrap items-center gap-3 px-6 py-3 rounded-full glass-card text-[#825500] font-semibold text-xl shadow-sm" style={{ borderColor: 'rgba(255,185,80,0.5)' }}>
              <span className="material-symbols-outlined text-[#825500] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              <span>الأستاذة مروة هاشم | خبرة أكثر من 20 عاماً | المرحلة الإعدادية والثانوية</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a2014] max-w-2xl leading-tight">
              إتقان علم الأحياء <br />
              <span className="text-gradient">بمنظور جديد</span>
            </h1>

            {/* Subtext */}
            <p className="text-2xl md:text-3xl text-[#3b4a3d] max-w-2xl leading-relaxed font-normal">
              أهلاً بك في دفعة 2027! اكتشف أسرار علم الأحياء مع الأستاذة مروة هاشم في تجربة تعليمية استثنائية تجمع بين الشرح الاحترافي المبسط والتطبيقات العملية الحديثة لضمان تفوقك وتحقيق أفضل نتيجة.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-6 w-full mt-6">
              <Link
                to="/curriculum"
                className="inline-flex items-center justify-center px-12 py-6 rounded-full text-white font-bold text-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto"
                style={{ background: 'linear-gradient(to right, #00e676, #006d35)', boxShadow: '0 8px 30px rgba(0,230,118,0.4)' }}
              >
                ابدأ رحلتك الآن
              </Link>
              <Link
                to="/student/login"
                className="inline-flex items-center justify-center px-12 py-6 rounded-full border-2 border-[#825500] text-[#825500] font-bold text-2xl hover:bg-[#825500]/10 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
                style={{ background: 'rgba(232,255,238,0.5)' }}
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>

          {/* ── Right: Teacher Image ── */}
          <div className="relative flex justify-center items-center z-10 order-1 lg:order-2 animate-fade-in-up delay-200">
            {/* Circular frame */}
            <div
              className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full p-3"
              style={{
                background: 'linear-gradient(135deg, #00e475, #e8ffee, #ffb950)',
                boxShadow: '0 0 80px rgba(0,109,53,0.25)',
              }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-white/60 backdrop-blur-md z-0"></div>
              <img
                className="w-full h-full object-cover rounded-full relative z-10"
                alt="الأستاذة مروة هاشم - دفعة 2027"
                src="/teacher.png"
              />
            </div>

            {/* Floating batch badge */}
            <div className="absolute -right-6 top-16 glass-card px-6 py-4 rounded-2xl flex items-center gap-4 animate-bounce-slow shadow-xl">
              <span className="material-symbols-outlined text-[#b02f00] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              <div className="flex flex-col items-start">
                <span className="text-lg font-semibold text-[#3b4a3d]">الدفعة الجديدة</span>
                <span className="text-3xl text-[#006d35] font-bold">2027</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section
        className="relative w-full px-6 py-16 overflow-hidden"
        id="features"
        style={{ background: '#ffffff' }}
      >
        {/* Subtle background elements */}
        <div className="absolute top-0 right-0 w-full h-full pattern-bg opacity-10 pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(98,255,150,0.20)' }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(255,219,209,0.20)' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Section header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold text-[#0a2014] mb-6">
              إيه <span className="text-gradient">مميزات</span> المنصة؟
            </h2>
            <p className="text-2xl text-[#3b4a3d] max-w-3xl mx-auto">
              كل حاجة محتاجها عشان تتفوق في مادة الأحياء متوفرة في مكان واحد بتجربة تعليمية متكاملة.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Feature 1 – Videos */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group animate-fade-in-up delay-100">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(98,255,150,0.40)', border: '1px solid rgba(0,228,117,0.50)' }}
              >
                <span className="material-symbols-outlined text-[#00e676] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>video_library</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0a2014]">فيديوهات بجودة عالية</h3>
              <p className="text-xl text-[#3b4a3d] leading-relaxed">
                جودة متنوعة تناسب سرعة الإنترنت عندك (من 240p لتوفير البيانات لحد 1080p HD) عشان الشرح يكون واضح دايماً.
              </p>
            </div>

            {/* Feature 2 – Content (spans 2 cols on lg) */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 lg:col-span-2 group animate-fade-in-up delay-200">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(255,221,179,0.40)', border: '1px solid rgba(255,185,80,0.50)' }}
              >
                <span className="material-symbols-outlined text-[#feaa00] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0a2014]">محتوى علمي متكامل</h3>
              <p className="text-xl text-[#3b4a3d] leading-relaxed">
                كل حاجة محتاجها في مكان واحد: كل محاضرة بتحتوي على شرح تفصيلي، اختبارات جزئية، حل الواجب مع المستر، وامتحان نهائي شامل على المحاضرة. النظام ده بيضمن إنك تهضم المعلومة كاملة.
              </p>
              <div className="mt-2 flex gap-3 flex-wrap">
                {['شرح تفصيلي', 'اختبارات جزئية', 'حل واجب'].map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2 rounded-full text-lg font-bold"
                    style={{ background: '#d5eedc', color: '#0a2014', border: '1px solid rgba(186,203,185,0.30)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature 3 – Exams */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group animate-fade-in-up delay-300">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(255,219,209,0.40)', border: '1px solid rgba(255,181,160,0.50)' }}
              >
                <span className="material-symbols-outlined text-[#b02f00] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>quiz</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0a2014]">امتحانات شاملة</h3>
              <p className="text-xl text-[#3b4a3d] leading-relaxed">
                تدريب مستمر على أحدث أنماط الأسئلة. امتحانات تراكمية واختبارات داخل كل محاضرة عشان تقيس مستواك أول بأول.
              </p>
            </div>

            {/* Feature 4 – Support */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group animate-fade-in-up delay-400">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(0,230,118,0.30)', border: '1px solid rgba(0,230,118,0.40)' }}
              >
                <span className="material-symbols-outlined text-[#00e676] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
              </div>
              <h3 className="text-3xl font-bold text-[#0a2014]">دعم علمي ونفسي</h3>
              <p className="text-xl text-[#3b4a3d] leading-relaxed">
                دعم علمي: لو عندك أي سؤال جه في بالك وانت بتذاكر هيردوا عليك فورًا. دعم نفسي: هيساعدك في أي حاجة تواجهك في المذاكرة وتحديد أفضل طرق المذاكرة.
              </p>
            </div>

            {/* Feature 5 – PDF */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-start gap-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group animate-fade-in-up delay-500">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(255,221,179,0.40)', border: '1px solid rgba(255,185,80,0.50)' }}
              >
                <span className="material-symbols-outlined text-[#825500] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>picture_as_pdf</span>
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
