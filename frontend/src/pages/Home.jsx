import { Link } from "react-router-dom";
import "./Home.css";

const features = [
	{
		icon: "video_library",
		tone: "green",
		title: "فيديوهات بجودة عالية",
		body: "جودة متنوعة تناسب سرعة الإنترنت عندك (من 240p لتوفير البيانات لحد 1080p HD) عشان الشرح يكون واضح دايماً.",
	},
	{
		icon: "menu_book",
		tone: "gold",
		title: "محتوى علمي متكامل",
		body: "كل حاجة محتاجها في مكان واحد: كل محاضرة بتحتوي على شرح تفصيلي، اختبارات جزئية، حل الواجب مع المستر، وامتحان نهائي شامل على المحاضرة. النظام ده بيضمن إنك تهضم المعلومة كاملة.",
		tags: ["شرح تفصيلي", "اختبارات جزئية", "حل واجب"],
		wide: true,
	},
	{
		icon: "quiz",
		tone: "coral",
		title: "امتحانات شاملة",
		body: "تدريب مستمر على أحدث أنماط الأسئلة. امتحانات تراكمية واختبارات داخل كل محاضرة عشان تقيس مستواك أول بأول.",
	},
	{
		icon: "support_agent",
		tone: "green",
		title: "دعم علمي ونفسي",
		body: "دعم علمي: لو عندك أي سؤال جه في بالك وانت بتذاكر هيردوا عليك فورًا. دعم نفسي: هيساعدك في أي حاجة تواجهك في المذاكرة وتحديد أفضل طرق المذاكرة.",
	},
	{
		icon: "picture_as_pdf",
		tone: "gold",
		title: "ملخصات و PDF",
		body: "حمّل الملفات بشكل مباشر على جهازك بضغطة واحدة: سبورة المحاضرة، ملخصات الفصول، والامتحانات للطباعة عشان تذاكر أوفلاين براحتك.",
	},
];

function FeatureCard({ feature, index }) {
	return (
		<article
			className={`home-feature home-reveal ${feature.wide ? "home-feature--wide" : ""}`}
			style={{ animationDelay: `${(index + 1) * 0.1}s` }}
		>
			<div className={`home-feature__icon home-feature__icon--${feature.tone}`}>
				<span className="material-symbols-outlined">{feature.icon}</span>
			</div>
			<h3>{feature.title}</h3>
			<p>{feature.body}</p>
			{feature.tags ? (
				<div className="home-feature__tags">
					{feature.tags.map((tag) => (
						<span className="home-feature__tag" key={tag}>
							{tag}
						</span>
					))}
				</div>
			) : null}
		</article>
	);
}

export default function Home() {
	return (
		<div className="home-page" dir="rtl">
			<section className="home-hero">
				<div className="home-pattern" aria-hidden="true" />
				<div className="home-hero__inner">
					<div className="home-hero__copy home-reveal">
						<div className="home-teacher-pill">
							<span className="material-symbols-outlined">
								workspace_premium
							</span>
							<span>
								الأستاذة مروة هاشم | خبرة أكثر من 20 عاماً | المرحلة الإعدادية
								والثانوية
							</span>
						</div>
						<h1>
							إتقان علم الأحياء
							<br />
							<span>بمنظور جديد</span>
						</h1>
						<p className="home-hero__lead">
							أهلاً بك في دفعة 2027! اكتشف أسرار علم الأحياء مع الأستاذة مروة
							هاشم في تجربة تعليمية استثنائية تجمع بين الشرح الاحترافي المبسط
							والتطبيقات العملية الحديثة لضمان تفوقك وتحقيق أفضل نتيجة.
						</p>
						<div className="home-hero__actions">
							<Link
								className="home-button home-button--primary"
								to="/curriculum"
							>
								ابدأ رحلتك الآن
							</Link>
							<Link
								className="home-button home-button--secondary"
								to="/student/login"
							>
								تسجيل الدخول
							</Link>
						</div>
					</div>

					<div className="home-portrait home-reveal home-delay-200">
						<div className="home-portrait__ring">
							<img
								src="/teacher.png"
								alt="الأستاذة مروة هاشم"
								fetchPriority="high"
							/>
						</div>
						<div className="home-batch-badge">
							<span className="material-symbols-outlined">
								local_fire_department
							</span>
							<div>
								<small>الدفعة الجديدة</small>
								<strong>2027</strong>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="home-features" id="features">
				<div className="home-pattern" aria-hidden="true" />
				<div className="home-features__inner">
					<header className="home-features__header home-reveal">
						<h2>
							إيه <span>مميزات</span> المنصة؟
						</h2>
						<p>
							كل حاجة محتاجها عشان تتفوق في مادة الأحياء متوفرة في مكان واحد
							بتجربة تعليمية متكاملة.
						</p>
					</header>
					<div className="home-features__grid">
						{features.map((feature, index) => (
							<FeatureCard
								feature={feature}
								index={index}
								key={feature.title}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
