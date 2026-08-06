import React from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────────
   Home – pixel-perfect translation of the HTML mockup
   RTL layout: text on RIGHT, teacher image on LEFT (flex-row-reverse)
───────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════
          HERO SECTION
      ══════════════════════════════════ */}
      <section className="relative min-h-screen w-full overflow-hidden hero-bg">
        {/* DNA grid pattern overlay */}
        <div className="absolute inset-0 pattern-bg opacity-100 pointer-events-none" />

        {/* Glow blobs */}
        <div
          className="absolute top-24 right-8 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'rgba(98,255,150,0.28)', filter: 'blur(90px)' }}
        />
        <div
          className="absolute bottom-16 left-8 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{ background: 'rgba(255,221,179,0.28)', filter: 'blur(90px)' }}
        />

        {/* Content grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 min-h-screen flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* ── TEXT (order-2 → right side on desktop in RTL) ── */}
            <div className="flex flex-col gap-7 items-start text-right order-2 lg:order-1 animate-fade-in-up">

              {/* Teacher badge */}
              <div
                className="inline-flex flex-row-reverse items-center gap-2 px-5 py-2.5 rounded-full glass-card text-[#825500] font-semibold shadow-sm"
                style={{ border: '1px solid rgba(255,185,80,0.45)', fontSize: '1rem' }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1", color: '#825500' }}
                >
                  workspace_premium
                </span>
                <span>الأستاذة مروة هاشم | خبرة أكثر من 20 عاماً | المرحلة الإعدادية والثانوية</span>
              </div>

              {/* Headline */}
              <h1
                className="font-bold leading-tight"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#0a2014' }}
              >
                إتقان علم الأحياء
                <br />
                <span className="text-gradient">بمنظور جديد</span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-[#3b4a3d] leading-relaxed max-w-lg"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
              >
                أهلاً بك في دفعة 2027! اكتشف أسرار علم الأحياء مع الأستاذة مروة هاشم في تجربة تعليمية
                استثنائية تجمع بين الشرح الاحترافي المبسط والتطبيقات العملية الحديثة لضمان تفوقك
                وتحقيق أفضل نتيجة.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mt-2">
                <Link
                  to="/curriculum"
                  className="inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(to left, #00e676, #006d35)',
                    color: '#ffffff',
                    padding: '14px 36px',
                    fontSize: '1.1rem',
                    boxShadow: '0 6px 24px rgba(0,230,118,0.38)',
                  }}
                >
                  ابدأ رحلتك الآن
                </Link>

                <Link
                  to="/student/login"
                  className="inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgba(232,255,238,0.55)',
                    border: '1.5px solid #825500',
                    color: '#825500',
                    padding: '14px 36px',
                    fontSize: '1.1rem',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  تسجيل الدخول
                </Link>
              </div>
            </div>

            {/* ── TEACHER IMAGE (order-1 → left side on desktop in RTL) ── */}
            <div className="relative flex justify-center items-center order-1 lg:order-2 animate-fade-in-up delay-200">

              {/* Circular frame with gradient ring */}
              <div
                className="relative rounded-full"
                style={{
                  width: 'clamp(280px, 38vw, 480px)',
                  height: 'clamp(280px, 38vw, 480px)',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #00e475 0%, #e8ffee 50%, #ffb950 100%)',
                  boxShadow: '0 0 80px rgba(0,109,53,0.22), 0 0 0 1px rgba(255,255,255,0.4)',
                }}
              >
                {/* Inner white ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '3px solid rgba(255,255,255,0.65)', backdropFilter: 'blur(4px)' }}
                />
                {/* Teacher photo – object-top so head is not cropped */}
                <img
                  src="/teacher.png"
                  alt="الأستاذة مروة هاشم – دفعة 2027"
                  className="relative z-10 w-full h-full rounded-full"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>

              {/* Floating "الدفعة الجديدة" badge – right side pointing toward text */}
              <div
                className="absolute glass-card rounded-2xl flex flex-row-reverse items-center gap-3 animate-bounce-slow"
                style={{
                  top: '15%',
                  right: '-16px',
                  padding: '12px 18px',
                  boxShadow: '0 8px 28px rgba(0,109,53,0.18)',
                  minWidth: '160px',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1", color: '#b02f00' }}
                >
                  local_fire_department
                </span>
                <div className="flex flex-col items-end">
                  <span style={{ fontSize: '0.8rem', color: '#3b4a3d', fontWeight: 600 }}>الدفعة الجديدة</span>
                  <span style={{ fontSize: '1.5rem', color: '#006d35', fontWeight: 700, lineHeight: 1 }}>2027</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FEATURES SECTION
      ══════════════════════════════════ */}
      <section
        id="features"
        className="relative w-full overflow-hidden"
        style={{ background: '#dbf4e2' }}
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 pattern-bg opacity-50 pointer-events-none" />
        {/* Green glow top-right */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'rgba(98,255,150,0.18)', filter: 'blur(80px)' }}
        />
        {/* Peach glow bottom-left */}
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'rgba(255,219,209,0.18)', filter: 'blur(80px)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20">

          {/* Section heading */}
          <div className="text-center mb-14">
            <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0a2014' }}>
              إيه <span className="text-gradient">مميزات</span> المنصة؟
            </h2>
            <p className="text-[#3b4a3d] max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '1.05rem' }}>
              كل حاجة محتاجها عشان تتفوق في مادة الأحياء متوفرة في مكان واحد بتجربة تعليمية متكاملة.
            </p>
          </div>

          {/* Bento grid: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* ── Card 1 – Videos (1 col) ── */}
            <FeatureCard
              iconName="video_library"
              iconBg="rgba(98,255,150,0.38)"
              iconBorder="rgba(0,228,117,0.45)"
              iconColor="#006d35"
              title="فيديوهات بجودة عالية"
              body="جودة متنوعة تناسب سرعة الإنترنت عندك (من 240p لتوفير البيانات لحد 1080p HD) عشان الشرح يكون واضح دايماً."
              delay="delay-100"
            />

            {/* ── Card 2 – Content (spans 2 cols) ── */}
            <FeatureCard
              iconName="menu_book"
              iconBg="rgba(255,221,179,0.38)"
              iconBorder="rgba(255,185,80,0.45)"
              iconColor="#825500"
              title="محتوى علمي متكامل"
              body="كل حاجة محتاجها في مكان واحد: كل محاضرة بتحتوي على شرح تفصيلي، اختبارات جزئية، حل الواجب مع المستر، وامتحان نهائي شامل على المحاضرة. النظام ده بيضمن إنك تهضم المعلومة كاملة."
              delay="delay-200"
              colSpan
              tags={['شرح تفصيلي', 'اختبارات جزئية', 'حل واجب']}
            />

            {/* ── Card 3 – Exams (1 col) ── */}
            <FeatureCard
              iconName="quiz"
              iconBg="rgba(255,219,209,0.38)"
              iconBorder="rgba(255,181,160,0.45)"
              iconColor="#b02f00"
              title="امتحانات شاملة"
              body="تدريب مستمر على أحدث أنماط الأسئلة. امتحانات تراكمية واختبارات داخل كل محاضرة عشان تقيس مستواك أول بأول."
              delay="delay-300"
            />

            {/* ── Card 4 – Support (1 col) ── */}
            <FeatureCard
              iconName="support_agent"
              iconBg="rgba(0,228,117,0.25)"
              iconBorder="rgba(0,228,117,0.38)"
              iconColor="#006d35"
              title="دعم علمي ونفسي"
              body="دعم علمي: لو عندك أي سؤال جه في بالك وانت بتذاكر هيردوا عليك فورًا. دعم نفسي: هيساعدك في أي حاجة تواجهك في المذاكرة وتحديد أفضل طرق المذاكرة."
              delay="delay-400"
            />

            {/* ── Card 5 – PDF (1 col) ── */}
            <FeatureCard
              iconName="picture_as_pdf"
              iconBg="rgba(255,221,179,0.38)"
              iconBorder="rgba(255,185,80,0.45)"
              iconColor="#825500"
              title="ملخصات و PDF"
              body="حمّل الملفات بشكل مباشر على جهازك بضغطة واحدة: سبورة المحاضرة، ملخصات الفصول، والامتحانات للطباعة عشان تذاكر أوفلاين براحتك."
              delay="delay-500"
            />

          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Feature Card component
───────────────────────────────────────────────────────────────────────────── */
function FeatureCard({ iconName, iconBg, iconBorder, iconColor, title, body, delay = '', colSpan = false, tags }) {
  return (
    <div
      className={`glass-card rounded-3xl flex flex-col items-start gap-5 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-fade-in-up ${delay} ${colSpan ? 'lg:col-span-2' : ''}`}
      style={{ padding: '28px 28px 28px 28px' }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-300"
        style={{
          width: 64,
          height: 64,
          background: iconBg,
          border: `1px solid ${iconBorder}`,
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1", color: iconColor }}
        >
          {iconName}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold" style={{ fontSize: '1.3rem', color: '#0a2014' }}>
        {title}
      </h3>

      {/* Body */}
      <p className="text-[#3b4a3d] leading-relaxed" style={{ fontSize: '0.95rem' }}>
        {body}
      </p>

      {/* Optional tags */}
      {tags && (
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-semibold rounded-full"
              style={{
                padding: '4px 14px',
                fontSize: '0.85rem',
                background: '#d5eedc',
                color: '#0a2014',
                border: '1px solid rgba(186,203,185,0.35)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
