import React from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────────
   Home – pixel-perfect landing page
   RTL: text first in DOM → right col | image second → left col
───────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div style={{ direction: 'rtl' }}>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden',
          /* Radial green glow from upper-right, fades to pale green */
          background:
            'radial-gradient(ellipse 70% 55% at 65% 35%, rgba(98,255,150,0.22) 0%, #e8ffee 70%)',
        }}
      >
        {/* DNA dot-grid pattern */}
        <div className="pattern-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '6rem', right: 0,
          width: 480, height: 480, borderRadius: '50%',
          background: 'rgba(98,255,150,0.22)', filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '4rem', left: 0,
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,221,179,0.22)', filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />

        {/* ── Centred container ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          maxWidth: '80rem', margin: '0 auto',
          padding: '7rem 1.5rem 4rem',
          minHeight: '100vh',
          display: 'flex', alignItems: 'center',
        }}>
          {/* Two-column grid – RTL direction makes col-1 = right, col-2 = left */}
          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem',
            alignItems: 'center',
          }}>

            {/* ── COL 1 (RIGHT in RTL): text ── */}
            <div
              className="animate-fade-in-up"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'right' }}
            >
              {/* Teacher badge */}
              <div style={{
                display: 'inline-flex', flexDirection: 'row-reverse',
                alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start',
                padding: '0.5rem 1.1rem', borderRadius: '9999px',
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,185,80,0.4)',
                color: '#825500', fontWeight: 600, fontSize: '0.88rem',
                boxShadow: '0 4px 16px rgba(0,109,53,0.08)',
              }}>
                <span className="material-symbols-outlined" style={{
                  fontSize: 17, direction: 'ltr',
                  fontVariationSettings: "'FILL' 1", color: '#825500',
                }}>workspace_premium</span>
                <span>الأستاذة مروة هاشم | خبرة أكثر من 20 عاماً | المرحلة الإعدادية والثانوية</span>
              </div>

              {/* Headline */}
              <h1 style={{
                margin: 0, lineHeight: 1.15, color: '#0a2014',
                fontSize: 'clamp(2rem, 4.2vw, 3.6rem)', fontWeight: 700,
              }}>
                إتقان علم الأحياء
                <br />
                <span className="text-gradient">بمنظور جديد</span>
              </h1>

              {/* Subtitle */}
              <p style={{
                margin: 0, color: '#3b4a3d', lineHeight: 1.8,
                fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              }}>
                أهلاً بك في دفعة 2027! اكتشف أسرار علم الأحياء مع الأستاذة مروة هاشم في تجربة تعليمية
                استثنائية تجمع بين الشرح الاحترافي المبسط والتطبيقات العملية الحديثة لضمان تفوقك
                وتحقيق أفضل نتيجة.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                <Link
                  to="/curriculum"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0.8rem 2rem', borderRadius: '9999px', fontWeight: 700,
                    fontSize: '1rem', color: '#fff', textDecoration: 'none',
                    background: 'linear-gradient(to left, #00e676, #006d35)',
                    boxShadow: '0 6px 22px rgba(0,230,118,0.35)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  ابدأ رحلتك الآن
                </Link>
                <Link
                  to="/student/login"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    padding: '0.8rem 2rem', borderRadius: '9999px', fontWeight: 700,
                    fontSize: '1rem', color: '#825500', textDecoration: 'none',
                    background: 'rgba(232,255,238,0.55)',
                    border: '1.5px solid #825500',
                    backdropFilter: 'blur(8px)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  تسجيل الدخول
                </Link>
              </div>
            </div>

            {/* ── COL 2 (LEFT in RTL): teacher image ── */}
            <div
              className="animate-fade-in-up delay-200"
              style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {/* Gradient ring */}
              <div style={{
                position: 'relative', borderRadius: '50%',
                width: 'min(40vw, 420px)', height: 'min(40vw, 420px)',
                padding: '10px',
                background: 'linear-gradient(135deg, #00e475 0%, #e8ffee 48%, #ffb950 100%)',
                boxShadow: '0 0 80px rgba(0,109,53,0.20)',
                flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: '3px solid rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(4px)',
                }} />
                <img
                  src="/teacher.png"
                  alt="الأستاذة مروة هاشم – دفعة 2027"
                  style={{
                    position: 'relative', zIndex: 1,
                    width: '100%', height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover', objectPosition: 'center top',
                  }}
                />
              </div>

              {/* Floating badge */}
              <div
                className="animate-bounce-slow"
                style={{
                  position: 'absolute', top: '12%', right: '-14px',
                  display: 'flex', flexDirection: 'row-reverse',
                  alignItems: 'center', gap: '0.6rem',
                  padding: '0.6rem 1rem',
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.55)',
                  borderRadius: '1rem',
                  boxShadow: '0 8px 28px rgba(0,109,53,0.15)',
                  minWidth: 140,
                }}
              >
                <span className="material-symbols-outlined" style={{
                  fontSize: 28, direction: 'ltr',
                  fontVariationSettings: "'FILL' 1", color: '#b02f00',
                }}>local_fire_department</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '0.72rem', color: '#3b4a3d', fontWeight: 600 }}>الدفعة الجديدة</span>
                  <span style={{ fontSize: '1.35rem', color: '#006d35', fontWeight: 700, lineHeight: 1 }}>2027</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════ */}
      <section
        id="features"
        style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#dbf4e2' }}
      >
        <div className="pattern-bg" style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }} />
        <div style={{
          position: 'absolute', top: '-8rem', right: '-8rem',
          width: '24rem', height: '24rem', borderRadius: '50%',
          background: 'rgba(98,255,150,0.15)', filter: 'blur(80px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-8rem', left: '-8rem',
          width: '24rem', height: '24rem', borderRadius: '50%',
          background: 'rgba(255,219,209,0.15)', filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        {/* Centred container */}
        <div style={{
          position: 'relative', zIndex: 10,
          maxWidth: '80rem', margin: '0 auto',
          padding: '5rem 1.5rem',
        }}>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#0a2014', marginBottom: '0.75rem' }}>
              إيه <span className="text-gradient">مميزات</span> المنصة؟
            </h2>
            <p style={{ color: '#3b4a3d', fontSize: '1rem', maxWidth: '34rem', margin: '0 auto', lineHeight: 1.7 }}>
              كل حاجة محتاجها عشان تتفوق في مادة الأحياء متوفرة في مكان واحد بتجربة تعليمية متكاملة.
            </p>
          </div>

          {/* Bento 3-col grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}>
            <FCard icon="video_library" ib="rgba(98,255,150,0.38)" ibr="rgba(0,228,117,0.45)" ic="#006d35"
              title="فيديوهات بجودة عالية" delay="delay-100"
              body="جودة متنوعة تناسب سرعة الإنترنت عندك (من 240p لتوفير البيانات لحد 1080p HD) عشان الشرح يكون واضح دايماً." />

            <FCard icon="menu_book" ib="rgba(255,221,179,0.38)" ibr="rgba(255,185,80,0.45)" ic="#825500"
              title="محتوى علمي متكامل" delay="delay-200" span={2}
              body="كل حاجة محتاجها في مكان واحد: كل محاضرة بتحتوي على شرح تفصيلي، اختبارات جزئية، حل الواجب مع المستر، وامتحان نهائي شامل على المحاضرة. النظام ده بيضمن إنك تهضم المعلومة كاملة."
              tags={['شرح تفصيلي', 'اختبارات جزئية', 'حل واجب']} />

            <FCard icon="quiz" ib="rgba(255,219,209,0.38)" ibr="rgba(255,181,160,0.45)" ic="#b02f00"
              title="امتحانات شاملة" delay="delay-300"
              body="تدريب مستمر على أحدث أنماط الأسئلة. امتحانات تراكمية واختبارات داخل كل محاضرة عشان تقيس مستواك أول بأول." />

            <FCard icon="support_agent" ib="rgba(0,228,117,0.22)" ibr="rgba(0,228,117,0.35)" ic="#006d35"
              title="دعم علمي ونفسي" delay="delay-400"
              body="دعم علمي: لو عندك أي سؤال جه في بالك وانت بتذاكر هيردوا عليك فورًا. دعم نفسي: هيساعدك في أي حاجة تواجهك في المذاكرة وتحديد أفضل طرق المذاكرة." />

            <FCard icon="picture_as_pdf" ib="rgba(255,221,179,0.38)" ibr="rgba(255,185,80,0.45)" ic="#825500"
              title="ملخصات و PDF" delay="delay-500"
              body="حمّل الملفات بشكل مباشر على جهازك بضغطة واحدة: سبورة المحاضرة، ملخصات الفصول، والامتحانات للطباعة عشان تذاكر أوفلاين براحتك." />
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Feature card sub-component ── */
function FCard({ icon, ib, ibr, ic, title, body, delay = '', span = 1, tags }) {
  return (
    <div
      className={`animate-fade-in-up ${delay}`}
      style={{
        gridColumn: `span ${span}`,
        background: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.55)',
        boxShadow: '0 8px 32px rgba(0,109,53,0.08)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.9rem',
        textAlign: 'right',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,109,53,0.14)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,109,53,0.08)'; }}
    >
      <div style={{
        width: 58, height: 58, borderRadius: '0.875rem', alignSelf: 'flex-end',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: ib, border: `1px solid ${ibr}`,
      }}>
        <span className="material-symbols-outlined" style={{
          fontSize: 28, direction: 'ltr',
          fontVariationSettings: "'FILL' 1", color: ic,
        }}>{icon}</span>
      </div>
      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0a2014' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '0.88rem', color: '#3b4a3d', lineHeight: 1.75 }}>{body}</p>
      {tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
          {tags.map(t => (
            <span key={t} style={{
              padding: '2px 12px', fontSize: '0.8rem', fontWeight: 600,
              background: '#d5eedc', color: '#0a2014', borderRadius: '9999px',
              border: '1px solid rgba(186,203,185,0.3)',
            }}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
