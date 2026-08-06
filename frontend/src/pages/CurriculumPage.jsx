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

const CurriculumPage = () => {
	const [selectedGrade, setSelectedGrade] = useState("1HIGH");
	const [units, setUnits] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const navigate = useNavigate();
	const studentId = user?.id;

	const fetchUnits = useCallback(
		async (grade) => {
			setLoading(true);
			try {
				const studentIdParam = studentId ? `&studentId=${studentId}` : "";
				const response = await axios.get(
					`/curriculum/units?grade=${grade}${studentIdParam}`,
				);
				if (response.data.success) {
					setUnits(response.data.data);
				}
			} catch (error) {
				console.error("Error fetching curriculum units:", error);
			} finally {
				setLoading(false);
			}
		},
		[studentId],
	);

	useEffect(() => {
		fetchUnits(selectedGrade);
	}, [fetchUnits, selectedGrade]);

	const getGradeTitle = (grade) => {
		switch (grade) {
			case "1HIGH":
				return "الصف الأول الثانوي";
			case "2HIGH":
				return "الصف الثاني الثانوي";
			case "3HIGH":
				return "الصف الثالث الثانوي";
			default:
				return "المرحلة الثانوية";
		}
	};

	const handleStartStudy = (unit) => {
		const firstVid = unit.lessons?.[0]?.videos?.[0];
		if (firstVid) {
			navigate(`/lectures?videoId=${firstVid.id}`);
		} else {
			navigate("/lectures");
		}
	};

	const getThemeKey = (theme, index) => {
		if (theme === "secondary" || index % 3 === 1) return "secondary";
		if (theme === "tertiary" || index % 3 === 2) return "tertiary";
		return "primary";
	};

	const getFallbackIcon = (index) => FALLBACK_ICONS[index % 3];

	return (
		<main className="curriculum-page" dir="rtl">
			<div className="curriculum-page__pattern pattern-bg" />
			<div className="curriculum-page__inner">
				<header className="curriculum-hero">
					<span className="curriculum-hero__eyebrow">المنهج الدراسي</span>
					<h1 className="curriculum-hero__title">اختر مرحلتك الدراسية</h1>
					<p className="curriculum-hero__subtitle">
						تصفح منهج الأحياء الشامل الخاص بك ({getGradeTitle(selectedGrade)})
					</p>
				</header>

				<div
					className="curriculum-grades"
					role="tablist"
					aria-label="المرحلة الدراسية"
				>
					{GRADES.map((grade) => (
						<button
							aria-selected={selectedGrade === grade.key}
							className={`curriculum-grades__pill ${
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
					<div className="curriculum-state">
						<span className="material-symbols-outlined curriculum-state__icon">
							sync
						</span>
						<p>جاري تحميل المنهج...</p>
					</div>
				) : units.length === 0 ? (
					<div className="curriculum-state curriculum-state--empty">
						<span className="material-symbols-outlined curriculum-state__icon">
							menu_book
						</span>
						<p>لا توجد وحدات دراسية مضافة لهذه المرحلة حالياً.</p>
					</div>
				) : (
					<div className="curriculum-grid">
						{units.map((unit, idx) => {
							const theme = getThemeKey(unit.color_theme, idx);
							const progress = unit.completed_percentage || 0;
							const icon = unit.icon || getFallbackIcon(idx);
							const inProgress = progress > 0;

							return (
								<article
									className={`curriculum-card curriculum-card--${theme}`}
									data-theme={theme}
									key={unit.id}
									style={{ "--cc-index": idx }}
								>
									<div className="curriculum-card__banner">
										<span className="curriculum-card__banner-icon">
											<span className="material-symbols-outlined">{icon}</span>
										</span>
										<span className="curriculum-card__badge">
											الوحدة {unit.unit_number || idx + 1}
										</span>
									</div>
									<div className="curriculum-card__body">
										<span className="curriculum-card__category">
											{unit.category || "عام"}
										</span>
										<h3 className="curriculum-card__title">{unit.title}</h3>
										<div className="curriculum-card__progress">
											<div className="curriculum-card__progress-head">
												<span>التقدم</span>
												<strong>{progress}% مكتمل</strong>
											</div>
											<div className="curriculum-card__track">
												<div
													className="curriculum-card__fill"
													style={{ width: `${progress}%` }}
												/>
											</div>
										</div>
									</div>
									<div className="curriculum-card__actions">
										<button
											className={`curriculum-card__cta ${
												inProgress ? "is-outlined" : ""
											}`}
											onClick={() => handleStartStudy(unit)}
											type="button"
										>
											<span>
												{inProgress ? "استكمل المذاكرة" : "ابدأ المذاكرة"}
											</span>
											<span className="material-symbols-outlined">
												{inProgress ? "arrow_left_alt" : "play_arrow"}
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
