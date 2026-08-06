import "./Footer.css";

export default function Footer() {
	return (
		<footer className="site-footer" dir="rtl">
			<div className="site-footer__inner">
				<div className="site-footer__brand">
					<strong>أكاديمية الأحياء</strong>
					<p>رحلة تعليمية حديثة لفهم الأحياء بثقة ووضوح.</p>
				</div>
				<div className="site-footer__contact">
					<div>
						<span className="material-symbols-outlined">location_on</span>
						<span>سنتر الفتح ٢</span>
					</div>
					<a href="tel:+201092600559" dir="ltr">
						<span className="material-symbols-outlined">call</span>
						<span>+20 10 92600559</span>
					</a>
				</div>
				<nav className="site-footer__links" aria-label="روابط قانونية">
					<a href="#privacy">سياسة الخصوصية</a>
					<a href="#terms">شروط الخدمة</a>
					<a href="#support">دعم الطلاب</a>
				</nav>
			</div>
			<div className="site-footer__copyright">
				© ٢٠٢٧ أكاديمية الأحياء. جميع الحقوق محفوظة
			</div>
		</footer>
	);
}
