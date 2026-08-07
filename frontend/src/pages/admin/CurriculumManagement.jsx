import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./CurriculumManagement.css";

const GRADES = [
	{ value: "1HIGH", label: "الصف الأول الثانوي", shortLabel: "الأول الثانوي" },
	{
		value: "2HIGH",
		label: "الصف الثاني الثانوي",
		shortLabel: "الثاني الثانوي",
	},
	{
		value: "3HIGH",
		label: "الصف الثالث الثانوي",
		shortLabel: "الثالث الثانوي",
	},
];

const EMPTY_UNIT = {
	title: "",
	category: "",
	description: "",
	unit_number: 1,
	icon: "biotech",
	color_theme: "primary",
};

const EMPTY_LESSON = {
	title: "",
	description: "",
	lesson_number: 1,
};

const EMPTY_VIDEO = {
	title: "",
	duration: "30:00",
	video_url: "",
	pdf_url: "",
	video_order: 1,
};

function AdminModal({ title, eyebrow, children, onClose, wide = false }) {
	return (
		<div className="admin-curriculum-modal">
			<div
				aria-modal="true"
				className={`admin-curriculum-modal__panel ${wide ? "is-wide" : ""}`}
				role="dialog"
				aria-label={title}
			>
				<div className="admin-curriculum-modal__header">
					<div>
						<span className="admin-curriculum-modal__eyebrow">{eyebrow}</span>
						<h2>{title}</h2>
					</div>
					<button
						aria-label="إغلاق النافذة"
						className="admin-curriculum-icon-button"
						onClick={onClose}
						type="button"
					>
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}

const CurriculumManagement = () => {
	const [selectedGrade, setSelectedGrade] = useState("1HIGH");
	const [units, setUnits] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showUnitModal, setShowUnitModal] = useState(false);
	const [editingUnit, setEditingUnit] = useState(null);
	const [unitForm, setUnitForm] = useState(EMPTY_UNIT);

	const [showLessonModal, setShowLessonModal] = useState(false);
	const [selectedUnitId, setSelectedUnitId] = useState(null);
	const [editingLesson, setEditingLesson] = useState(null);
	const [lessonForm, setLessonForm] = useState(EMPTY_LESSON);

	const [showVideoModal, setShowVideoModal] = useState(false);
	const [selectedLessonId, setSelectedLessonId] = useState(null);
	const [editingVideo, setEditingVideo] = useState(null);
	const [videoForm, setVideoForm] = useState(EMPTY_VIDEO);
	const [uploadingFile, setUploadingFile] = useState(false);

	const fetchUnits = useCallback(async (grade) => {
		setLoading(true);
		try {
			const response = await axios.get(
				`/curriculum/admin/units?grade=${grade}`,
			);
			if (response.data.success) setUnits(response.data.data);
		} catch (error) {
			console.error("Error fetching units:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchUnits(selectedGrade);
	}, [fetchUnits, selectedGrade]);

	const openUnitModal = (unit = null) => {
		setEditingUnit(unit);
		setUnitForm(
			unit ? { ...unit } : { ...EMPTY_UNIT, unit_number: units.length + 1 },
		);
		setShowUnitModal(true);
	};

	const openLessonModal = (unit, lesson = null) => {
		setSelectedUnitId(unit.id);
		setEditingLesson(lesson);
		setLessonForm(
			lesson
				? { ...lesson }
				: { ...EMPTY_LESSON, lesson_number: (unit.lessons?.length || 0) + 1 },
		);
		setShowLessonModal(true);
	};

	const openVideoModal = (lesson, video = null) => {
		setSelectedLessonId(lesson.id);
		setEditingVideo(video);
		setVideoForm(
			video
				? { ...video }
				: { ...EMPTY_VIDEO, video_order: (lesson.videos?.length || 0) + 1 },
		);
		setShowVideoModal(true);
	};

	const handleSaveUnit = async (event) => {
		event.preventDefault();
		try {
			if (editingUnit) {
				await axios.put(`/curriculum/admin/units/${editingUnit.id}`, unitForm);
			} else {
				await axios.post("/curriculum/admin/units", {
					...unitForm,
					grade: selectedGrade,
				});
			}
			setShowUnitModal(false);
			await fetchUnits(selectedGrade);
		} catch (error) {
			console.error("Save unit error:", error);
		}
	};

	const handleDeleteUnit = async (id) => {
		if (!window.confirm("هل أنت متأكد من حذف هذه الوحدة وجميع محتوياتها؟"))
			return;
		try {
			await axios.delete(`/curriculum/admin/units/${id}`);
			await fetchUnits(selectedGrade);
		} catch (error) {
			console.error("Delete unit error:", error);
		}
	};

	const handleSaveLesson = async (event) => {
		event.preventDefault();
		try {
			if (editingLesson) {
				await axios.put(
					`/curriculum/admin/lessons/${editingLesson.id}`,
					lessonForm,
				);
			} else {
				await axios.post("/curriculum/admin/lessons", {
					...lessonForm,
					unit_id: selectedUnitId,
				});
			}
			setShowLessonModal(false);
			await fetchUnits(selectedGrade);
		} catch (error) {
			console.error("Save lesson error:", error);
		}
	};

	const handleDeleteLesson = async (id) => {
		if (!window.confirm("هل أنت متأكد من حذف هذا الدرس؟")) return;
		try {
			await axios.delete(`/curriculum/admin/lessons/${id}`);
			await fetchUnits(selectedGrade);
		} catch (error) {
			console.error("Delete lesson error:", error);
		}
	};

	const handleFileUpload = async (event, field) => {
		const file = event.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		setUploadingFile(true);
		try {
			const response = await axios.post("/curriculum/admin/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			if (response.data.success) {
				setVideoForm((current) => ({ ...current, [field]: response.data.url }));
			}
		} catch (error) {
			console.error("File upload error:", error);
			alert("فشل رفع الملف، يرجى المحاولة مرة أخرى");
		} finally {
			setUploadingFile(false);
		}
	};

	const handleSaveVideo = async (event) => {
		event.preventDefault();
		try {
			if (editingVideo) {
				await axios.put(
					`/curriculum/admin/videos/${editingVideo.id}`,
					videoForm,
				);
			} else {
				await axios.post("/curriculum/admin/videos", {
					...videoForm,
					lesson_id: selectedLessonId,
				});
			}
			setShowVideoModal(false);
			await fetchUnits(selectedGrade);
		} catch (error) {
			console.error("Save video error:", error);
		}
	};

	const handleDeleteVideo = async (id) => {
		if (!window.confirm("هل أنت متأكد من حذف هذا الفيديو؟")) return;
		try {
			await axios.delete(`/curriculum/admin/videos/${id}`);
			await fetchUnits(selectedGrade);
		} catch (error) {
			console.error("Delete video error:", error);
		}
	};

	const stats = units.reduce(
		(total, unit) => {
			total.lessons += unit.lessons?.length || 0;
			total.videos +=
				unit.lessons?.reduce(
					(lessonsTotal, lesson) => lessonsTotal + (lesson.videos?.length || 0),
					0,
				) || 0;
			return total;
		},
		{ lessons: 0, videos: 0 },
	);

	return (
		<div className="admin-curriculum-page" dir="rtl">
			<header className="admin-curriculum-hero">
				<div>
					<span className="admin-curriculum-kicker">
						<span className="material-symbols-outlined">tune</span>
						استوديو المحتوى
					</span>
					<h1>إدارة المنهج والدروس</h1>
					<p>
						نظّم الوحدات، ابنِ مسار الدروس، وأدر مكتبة المحاضرات من مكان واحد.
					</p>
				</div>
				<button
					className="admin-curriculum-primary"
					onClick={() => openUnitModal()}
					type="button"
				>
					<span className="material-symbols-outlined">add</span>
					وحدة جديدة
				</button>
			</header>

			<section
				className="admin-curriculum-toolbar"
				aria-label="اختيار المرحلة الدراسية"
			>
				<div className="admin-curriculum-tabs" role="tablist">
					{GRADES.map((grade) => (
						<button
							aria-selected={selectedGrade === grade.value}
							className={selectedGrade === grade.value ? "is-active" : ""}
							key={grade.value}
							onClick={() => setSelectedGrade(grade.value)}
							role="tab"
							type="button"
						>
							<span className="admin-curriculum-tabs__long">{grade.label}</span>
							<span className="admin-curriculum-tabs__short">
								{grade.shortLabel}
							</span>
						</button>
					))}
				</div>
				<div className="admin-curriculum-toolbar__context">
					<span className="material-symbols-outlined">school</span>
					{GRADES.find((grade) => grade.value === selectedGrade)?.label}
				</div>
			</section>

			<section className="admin-curriculum-stats" aria-label="إحصائيات المنهج">
				<div className="admin-curriculum-stat admin-curriculum-stat--green">
					<span className="material-symbols-outlined">view_quilt</span>
					<div>
						<strong>{units.length}</strong>
						<span>وحدات دراسية</span>
					</div>
				</div>
				<div className="admin-curriculum-stat admin-curriculum-stat--gold">
					<span className="material-symbols-outlined">
						format_list_bulleted
					</span>
					<div>
						<strong>{stats.lessons}</strong>
						<span>دروس مرتبة</span>
					</div>
				</div>
				<div className="admin-curriculum-stat admin-curriculum-stat--coral">
					<span className="material-symbols-outlined">play_circle</span>
					<div>
						<strong>{stats.videos}</strong>
						<span>محاضرات مرفوعة</span>
					</div>
				</div>
			</section>

			{loading ? (
				<div className="admin-curriculum-state">
					<span className="material-symbols-outlined">progress_activity</span>
					جاري تحميل محتوى المرحلة...
				</div>
			) : units.length === 0 ? (
				<div className="admin-curriculum-empty">
					<span className="material-symbols-outlined">library_add</span>
					<h2>لا توجد وحدات لهذه المرحلة بعد</h2>
					<p>ابدأ ببناء المنهج من خلال إضافة أول وحدة دراسية.</p>
					<button
						className="admin-curriculum-primary"
						onClick={() => openUnitModal()}
						type="button"
					>
						<span className="material-symbols-outlined">add</span>
						إضافة أول وحدة
					</button>
				</div>
			) : (
				<section
					className="admin-curriculum-units"
					aria-label="الوحدات الدراسية"
				>
					{units.map((unit, index) => (
						<article
							className={`admin-unit-card admin-unit-card--${unit.color_theme || "primary"}`}
							key={unit.id}
							style={{ "--unit-index": index }}
						>
							<header className="admin-unit-card__header">
								<div className="admin-unit-card__identity">
									<span className="admin-unit-card__number">
										{String(unit.unit_number).padStart(2, "0")}
									</span>
									<span className="admin-unit-card__icon material-symbols-outlined">
										{unit.icon || "biotech"}
									</span>
									<div>
										<span className="admin-unit-card__eyebrow">
											الوحدة الدراسية
										</span>
										<h2>{unit.title}</h2>
										<span className="admin-unit-card__category">
											{unit.category || "عام"}
										</span>
									</div>
								</div>
								<div className="admin-unit-card__actions">
									<button
										className="admin-curriculum-secondary"
										onClick={() => openLessonModal(unit)}
										type="button"
									>
										<span className="material-symbols-outlined">add</span> درس
									</button>
									<button
										aria-label="تعديل الوحدة"
										className="admin-curriculum-icon-button"
										onClick={() => openUnitModal(unit)}
										type="button"
									>
										<span className="material-symbols-outlined">edit</span>
									</button>
									<button
										aria-label="حذف الوحدة"
										className="admin-curriculum-icon-button is-danger"
										onClick={() => handleDeleteUnit(unit.id)}
										type="button"
									>
										<span className="material-symbols-outlined">delete</span>
									</button>
								</div>
							</header>

							<div className="admin-unit-card__body">
								{unit.description ? (
									<p className="admin-unit-card__description">
										{unit.description}
									</p>
								) : null}
								<div className="admin-unit-card__section-heading">
									<div>
										<span className="material-symbols-outlined">
											format_list_bulleted
										</span>
										<h3>مسار الدروس</h3>
										<span className="admin-unit-card__count">
											{unit.lessons?.length || 0}
										</span>
									</div>
									<span>المحاضرات مرتبطة بكل درس</span>
								</div>

								{unit.lessons?.length ? (
									<div className="admin-lessons-list">
										{unit.lessons.map((lesson) => (
											<div className="admin-lesson-row" key={lesson.id}>
												<div className="admin-lesson-row__main">
													<span className="admin-lesson-row__number">
														{String(lesson.lesson_number).padStart(2, "0")}
													</span>
													<div>
														<h4>{lesson.title}</h4>
														{lesson.description ? (
															<p>{lesson.description}</p>
														) : null}
													</div>
												</div>
												<div className="admin-lesson-row__actions">
													<span className="admin-lesson-row__video-count">
														<span className="material-symbols-outlined">
															play_circle
														</span>
														{lesson.videos?.length || 0} محاضرات
													</span>
													<button
														className="admin-curriculum-secondary is-dark"
														onClick={() => openVideoModal(lesson)}
														type="button"
													>
														<span className="material-symbols-outlined">
															add
														</span>{" "}
														محاضرة
													</button>
													<button
														aria-label="تعديل الدرس"
														className="admin-curriculum-icon-button"
														onClick={() => openLessonModal(unit, lesson)}
														type="button"
													>
														<span className="material-symbols-outlined">
															edit
														</span>
													</button>
													<button
														aria-label="حذف الدرس"
														className="admin-curriculum-icon-button is-danger"
														onClick={() => handleDeleteLesson(lesson.id)}
														type="button"
													>
														<span className="material-symbols-outlined">
															delete
														</span>
													</button>
												</div>

												{lesson.videos?.length ? (
													<div className="admin-video-list">
														{lesson.videos.map((video) => (
															<div className="admin-video-item" key={video.id}>
																<span className="material-symbols-outlined">
																	play_circle
																</span>
																<div>
																	<strong>{video.title}</strong>
																	<small>
																		{video.duration || "بدون مدة"}
																		{video.pdf_url ? " • PDF مرفق" : ""}
																	</small>
																</div>
																<div className="admin-video-item__actions">
																	<button
																		aria-label="تعديل المحاضرة"
																		className="admin-curriculum-icon-button"
																		onClick={() =>
																			openVideoModal(lesson, video)
																		}
																		type="button"
																	>
																		<span className="material-symbols-outlined">
																			edit
																		</span>
																	</button>
																	<button
																		aria-label="حذف المحاضرة"
																		className="admin-curriculum-icon-button is-danger"
																		onClick={() => handleDeleteVideo(video.id)}
																		type="button"
																	>
																		<span className="material-symbols-outlined">
																			delete
																		</span>
																	</button>
																</div>
															</div>
														))}
													</div>
												) : null}
											</div>
										))}
									</div>
								) : (
									<div className="admin-lesson-empty">
										<span className="material-symbols-outlined">
											playlist_add
										</span>
										<span>لم تتم إضافة دروس لهذه الوحدة بعد.</span>
										<button
											className="admin-curriculum-text-button"
											onClick={() => openLessonModal(unit)}
											type="button"
										>
											إضافة درس الآن
										</button>
									</div>
								)}
							</div>
						</article>
					))}
				</section>
			)}

			{showUnitModal ? (
				<AdminModal
					eyebrow="إعداد الوحدة"
					title={editingUnit ? "تعديل الوحدة" : "إضافة وحدة جديدة"}
					onClose={() => setShowUnitModal(false)}
				>
					<form className="admin-curriculum-form" onSubmit={handleSaveUnit}>
						<div className="admin-curriculum-form__grid">
							<label>
								عنوان الوحدة
								<input
									required
									value={unitForm.title}
									onChange={(event) =>
										setUnitForm({ ...unitForm, title: event.target.value })
									}
									placeholder="مثال: الأساس الجزيئي للوراثة"
								/>
							</label>
							<label>
								التصنيف
								<input
									required
									value={unitForm.category}
									onChange={(event) =>
										setUnitForm({ ...unitForm, category: event.target.value })
									}
									placeholder="مثال: علم الوراثة"
								/>
							</label>
							<label>
								رقم الوحدة
								<input
									min="1"
									type="number"
									value={unitForm.unit_number}
									onChange={(event) =>
										setUnitForm({
											...unitForm,
											unit_number: Number(event.target.value),
										})
									}
								/>
							</label>
							<label>
								الأيقونة
								<input
									value={unitForm.icon}
									onChange={(event) =>
										setUnitForm({ ...unitForm, icon: event.target.value })
									}
									placeholder="biotech"
								/>
							</label>
							<label>
								لون الوحدة
								<select
									value={unitForm.color_theme}
									onChange={(event) =>
										setUnitForm({
											...unitForm,
											color_theme: event.target.value,
										})
									}
								>
									<option value="primary">أخضر</option>
									<option value="secondary">ذهبي</option>
									<option value="tertiary">مرجاني</option>
								</select>
							</label>
						</div>
						<label>
							وصف الوحدة
							<textarea
								rows={4}
								value={unitForm.description}
								onChange={(event) =>
									setUnitForm({ ...unitForm, description: event.target.value })
								}
								placeholder="أضف وصفاً مختصراً يظهر للطلاب..."
							/>
						</label>
						<div className="admin-curriculum-form__actions">
							<button className="admin-curriculum-primary" type="submit">
								حفظ الوحدة
							</button>
							<button
								className="admin-curriculum-cancel"
								onClick={() => setShowUnitModal(false)}
								type="button"
							>
								إلغاء
							</button>
						</div>
					</form>
				</AdminModal>
			) : null}

			{showLessonModal ? (
				<AdminModal
					eyebrow="بناء المسار"
					title={editingLesson ? "تعديل الدرس" : "إضافة درس جديد"}
					onClose={() => setShowLessonModal(false)}
				>
					<form className="admin-curriculum-form" onSubmit={handleSaveLesson}>
						<label>
							عنوان الدرس
							<input
								required
								value={lessonForm.title}
								onChange={(event) =>
									setLessonForm({ ...lessonForm, title: event.target.value })
								}
								placeholder="مثال: تركيب الحمض النووي"
							/>
						</label>
						<label>
							رقم الدرس
							<input
								min="1"
								type="number"
								value={lessonForm.lesson_number}
								onChange={(event) =>
									setLessonForm({
										...lessonForm,
										lesson_number: Number(event.target.value),
									})
								}
							/>
						</label>
						<label>
							وصف الدرس
							<textarea
								rows={4}
								value={lessonForm.description}
								onChange={(event) =>
									setLessonForm({
										...lessonForm,
										description: event.target.value,
									})
								}
								placeholder="ما الذي سيتعلمه الطالب في هذا الدرس؟"
							/>
						</label>
						<div className="admin-curriculum-form__actions">
							<button className="admin-curriculum-primary" type="submit">
								حفظ الدرس
							</button>
							<button
								className="admin-curriculum-cancel"
								onClick={() => setShowLessonModal(false)}
								type="button"
							>
								إلغاء
							</button>
						</div>
					</form>
				</AdminModal>
			) : null}

			{showVideoModal ? (
				<AdminModal
					eyebrow="مكتبة المحاضرات"
					title={editingVideo ? "تعديل المحاضرة" : "إضافة محاضرة جديدة"}
					onClose={() => setShowVideoModal(false)}
					wide
				>
					<form className="admin-curriculum-form" onSubmit={handleSaveVideo}>
						<div className="admin-curriculum-form__grid">
							<label>
								عنوان المحاضرة
								<input
									required
									value={videoForm.title}
									onChange={(event) =>
										setVideoForm({ ...videoForm, title: event.target.value })
									}
									placeholder="مثال: شرح تركيب DNA"
								/>
							</label>
							<label>
								المدة
								<input
									required
									value={videoForm.duration}
									onChange={(event) =>
										setVideoForm({ ...videoForm, duration: event.target.value })
									}
									placeholder="45:00"
								/>
							</label>
							<label>
								ترتيب المحاضرة
								<input
									min="1"
									type="number"
									value={videoForm.video_order}
									onChange={(event) =>
										setVideoForm({
											...videoForm,
											video_order: Number(event.target.value),
										})
									}
								/>
							</label>
						</div>
						<label>
							رابط الفيديو
							<input
								required
								value={videoForm.video_url}
								onChange={(event) =>
									setVideoForm({ ...videoForm, video_url: event.target.value })
								}
								placeholder="https://... أو مسار /uploads/video.mp4"
							/>
						</label>
						<div className="admin-upload-field">
							<span>رفع فيديو من الجهاز</span>
							<input
								accept="video/*"
								onChange={(event) => handleFileUpload(event, "video_url")}
								type="file"
							/>
						</div>
						<label>
							رابط ملخص PDF
							<input
								value={videoForm.pdf_url}
								onChange={(event) =>
									setVideoForm({ ...videoForm, pdf_url: event.target.value })
								}
								placeholder="مسار ملف PDF اختياري"
							/>
						</label>
						<div className="admin-upload-field">
							<span>رفع ملخص PDF</span>
							<input
								accept="application/pdf"
								onChange={(event) => handleFileUpload(event, "pdf_url")}
								type="file"
							/>
						</div>
						{uploadingFile ? (
							<div className="admin-upload-status">
								<span className="material-symbols-outlined">
									progress_activity
								</span>
								جاري رفع الملف...
							</div>
						) : null}
						<div className="admin-curriculum-form__actions">
							<button
								className="admin-curriculum-primary"
								disabled={uploadingFile}
								type="submit"
							>
								حفظ المحاضرة
							</button>
							<button
								className="admin-curriculum-cancel"
								onClick={() => setShowVideoModal(false)}
								type="button"
							>
								إلغاء
							</button>
						</div>
					</form>
				</AdminModal>
			) : null}
		</div>
	);
};

export default CurriculumManagement;
