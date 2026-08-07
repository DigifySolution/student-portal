import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./CurriculumPage.css";

const GRADES = [
	{ key: "1HIGH", label: "الصف الأول" },
	{ key: "2HIGH", label: "الصف الثاني" },
	{ key: "3HIGH", label: "الصف الثالث" },
];

const FALLBACK_ICONS = ["biotech", "dns", "eco"];

const GRADE_TITLES = {
	"1HIGH": "الصف الأول الثانوي",
	"2HIGH": "الصف الثاني الثانوي",
	"3HIGH": "الصف الثالث الثانوي",
};

const CurriculumPage = () => {
	const [selectedGrade, setSelectedGrade] = useState("1HIGH");
	const [units, setUnits] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const navigate = useNavigate();

	const fetchUnits = useCallback(async (grade) => {
		setLoading(true);
		try {
			const response = await axios.get(`/curriculum/units?grade=${grade}`);
			if (response.data.success) {
				setUnits(response.data.data);
			}
		} catch (error) {
			console.error("Error fetching curriculum units:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUnits(selectedGrade);
	}, [fetchUnits, selectedGrade]);

	const handleOpenLectures = () => {
		navigate(user ? "/lectures" : "/student/login");
	};

	const getThemeKey = (theme, index) => {
		if (theme === "secondary" || index % 3 === 1) return "secondary";
		if (theme === "tertiary" || index % 3 === 2) return "tertiary";
		return "primary";
	};

	return (
		<main className="curriculum-page" dir="rtl">
			<div className="curriculum-page__inner">
				<header className="curriculum-hero">
					<span className="curriculum-hero__eyebrow">
						<span className="material-symbols-outlined">auto_stories</span>
						تصفح المنهج
					</span>
					<h1 className="curriculum-hero__title">
						منهج <span>الأحياء</span> الدراسي
					</h1>
					<p className="curriculum-hero__subtitle">
						استكشف الوحدات والدروس المتاحة لك ({GRADE_TITLES[selectedGrade]})
					</p>
				</header>

				<div
					className="curriculum-switcher"
					role="tablist"
					aria-label="المرحلة الدراسية"
				>
					{GRADES.map((grade) => (
						<button
							aria-selected={selectedGrade === grade.key}
							className={`curriculum-switcher__pill ${
								selectedGrade === grade.key ? "is-active" : ""
							}`}
							key={grade.key}
							onClick={() => setSelectedGrade(grade.key)}
							role="tab"
							type="button"
						>
							{grade.label}
						</button>
					))}
				</div>

				{loading ? (
					<div className="curriculum-state spinner">
						<span className="material-symbols-outlined">sync</span>
						<p>جاري تحميل الوحدات والدروس...</p>
					</div>
				) : units.length === 0 ? (
					<div className="curriculum-state">
						<span className="material-symbols-outlined">menu_book</span>
						<p>لا توجد وحدات دراسية مضافة لهذه المرحلة حالياً.</p>
					</div>
				) : (
					<div className="curriculum-grid">
						{units.map((unit, index) => {
							const theme = getThemeKey(unit.color_theme, index);
							const lessons = unit.lessons || [];
							const icon = unit.icon || FALLBACK_ICONS[index % 3];

							return (
								<article
									className="curriculum-card"
									data-theme={theme}
									key={unit.id}
									style={{ "--cc-index": index }}
								>
									<div className="curriculum-card__head">
										<span className="curriculum-card__icon">
											<span className="material-symbols-outlined">{icon}</span>
										</span>
										<div className="curriculum-card__badges">
											<span className="curriculum-card__badge">
												الوحدة {unit.unit_number || index + 1}
											</span>
											<span className="curriculum-card__badge curriculum-card__badge--muted">
												{unit.category || "عام"}
											</span>
										</div>
									</div>

									<h2 className="curriculum-card__title">{unit.title}</h2>
									{unit.description ? (
										<p className="curriculum-card__description">
											{unit.description}
										</p>
									) : null}

									<div className="curriculum-lessons">
										<div className="curriculum-lessons__heading">
											<span>
												<span className="material-symbols-outlined">
													format_list_bulleted
												</span>
												الدروس
											</span>
											<strong>{lessons.length}</strong>
										</div>
										{lessons.length > 0 ? (
											<ol className="curriculum-lessons__list">
												{lessons.map((lesson) => (
													<li className="curriculum-lesson" key={lesson.id}>
														<span className="curriculum-lesson__number">
															{lesson.lesson_number}
														</span>
														<span className="curriculum-lesson__content">
															<strong>{lesson.title}</strong>
															{lesson.description ? (
																<small>{lesson.description}</small>
															) : null}
														</span>
														<span className="material-symbols-outlined curriculum-lesson__lock">
															lock
														</span>
													</li>
												))}
											</ol>
										) : (
											<p className="curriculum-lessons__empty">
												سيتم إضافة الدروس قريباً.
											</p>
										)}
									</div>

									<div className="curriculum-card__footer">
										<p>
											<span className="material-symbols-outlined">lock</span>
											الفيديوهات والملفات متاحة داخل المحاضرات للطلاب المسجلين
										</p>
										<button
											className="curriculum-card__cta"
											onClick={handleOpenLectures}
											type="button"
										>
											<span>
												{user
													? "الدخول إلى المحاضرات"
													: "تسجيل الدخول للمشاهدة"}
											</span>
											<span className="material-symbols-outlined">
												{user ? "arrow_left_alt" : "login"}
											</span>
										</button>
									</div>
								</article>
							);
						})}
					</div>
				)}
			</div>
		</main>
	);
};

export default CurriculumPage;
