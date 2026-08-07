import axios from "axios";
import React, { useEffect, useState } from "react";

const CurriculumManagement = () => {
	const [selectedGrade, setSelectedGrade] = useState("1HIGH");
	const [units, setUnits] = useState([]);
	const [loading, setLoading] = useState(true);

	// Modals & forms state
	const [showUnitModal, setShowUnitModal] = useState(false);
	const [editingUnit, setEditingUnit] = useState(null);
	const [unitForm, setUnitForm] = useState({
		title: "",
		category: "",
		description: "",
		unit_number: 1,
		icon: "biotech",
		color_theme: "primary",
	});

	const [showLessonModal, setShowLessonModal] = useState(false);
	const [selectedUnitId, setSelectedUnitId] = useState(null);
	const [editingLesson, setEditingLesson] = useState(null);
	const [lessonForm, setLessonForm] = useState({
		title: "",
		description: "",
		lesson_number: 1,
	});

	const [showVideoModal, setShowVideoModal] = useState(false);
	const [selectedLessonId, setSelectedLessonId] = useState(null);
	const [editingVideo, setEditingVideo] = useState(null);
	const [videoForm, setVideoForm] = useState({
		title: "",
		duration: "30:00",
		video_url: "",
		pdf_url: "",
		video_order: 1,
	});
	const [uploadingFile, setUploadingFile] = useState(false);

	useEffect(() => {
		fetchUnits(selectedGrade);
	}, [selectedGrade]);

	const fetchUnits = async (grade) => {
		setLoading(true);
		try {
			const res = await axios.get(`/curriculum/admin/units?grade=${grade}`);
			if (res.data.success) {
				setUnits(res.data.data);
			}
		} catch (err) {
			console.error("Error fetching units:", err);
		} finally {
			setLoading(false);
		}
	};

	// Unit Operations
	const handleSaveUnit = async (e) => {
		e.preventDefault();
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
			fetchUnits(selectedGrade);
		} catch (err) {
			console.error("Save unit error:", err);
		}
	};

	const handleDeleteUnit = async (id) => {
		if (
			!window.confirm(
				"هل أنت تأكد من حذف هذه الوحدة وجميع الدروس والفيديوهات التابعة لها؟",
			)
		)
			return;
		try {
			await axios.delete(`/curriculum/admin/units/${id}`);
			fetchUnits(selectedGrade);
		} catch (err) {
			console.error("Delete unit error:", err);
		}
	};

	// Lesson Operations
	const handleSaveLesson = async (e) => {
		e.preventDefault();
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
			fetchUnits(selectedGrade);
		} catch (err) {
			console.error("Save lesson error:", err);
		}
	};

	const handleDeleteLesson = async (id) => {
		if (!window.confirm("هل أنت تأكد من حذف هذا الدرس؟")) return;
		try {
			await axios.delete(`/curriculum/admin/lessons/${id}`);
			fetchUnits(selectedGrade);
		} catch (err) {
			console.error("Delete lesson error:", err);
		}
	};

	// Video Operations
	const handleFileUpload = async (e, field) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		setUploadingFile(true);
		try {
			const res = await axios.post("/curriculum/admin/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			if (res.data.success) {
				setVideoForm((prev) => ({ ...prev, [field]: res.data.url }));
			}
		} catch (err) {
			console.error("File upload error:", err);
			alert("فشل رفع الملف، يرجى المحاولة مرة أخرى");
		} finally {
			setUploadingFile(false);
		}
	};

	const handleSaveVideo = async (e) => {
		e.preventDefault();
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
			fetchUnits(selectedGrade);
		} catch (err) {
			console.error("Save video error:", err);
		}
	};

	const handleDeleteVideo = async (id) => {
		if (!window.confirm("هل أنت تأكد من حذف هذا الفيديو؟")) return;
		try {
			await axios.delete(`/curriculum/admin/videos/${id}`);
			fetchUnits(selectedGrade);
		} catch (err) {
			console.error("Delete video error:", err);
		}
	};

	return (
		<div className="flex flex-col gap-8 p-6">
			{/* Header & Grade Selector */}
			<div className="flex flex-col md:flex-row-reverse justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
				<div>
					<h2 className="text-3xl font-bold text-[#006d35]">
						إدارة المنهج والدروس
					</h2>
					<p className="text-lg text-gray-600">
						إضافة وتعديل الوحدات والدروس ومقاطع الفيديو حسب المرحلة الدراسية
					</p>
				</div>

				<div className="flex items-center gap-3">
					<select
						value={selectedGrade}
						onChange={(e) => setSelectedGrade(e.target.value)}
						className="p-3 border rounded-xl font-bold text-lg bg-[#e8ffee] text-[#006d35] focus:outline-none"
					>
						<option value="1HIGH">الصف الأول الثانوي</option>
						<option value="2HIGH">الصف الثاني الثانوي</option>
						<option value="3HIGH">الصف الثالث الثانوي</option>
					</select>

					<button
						onClick={() => {
							setEditingUnit(null);
							setUnitForm({
								title: "",
								category: "",
								description: "",
								unit_number: units.length + 1,
								icon: "biotech",
								color_theme: "primary",
							});
							setShowUnitModal(true);
						}}
						className="bg-[#006d35] text-white px-6 py-3 rounded-xl font-bold text-lg shadow-md hover:bg-[#005226] transition-all flex items-center gap-2"
					>
						<span className="material-symbols-outlined">add</span>
						<span>إضافة وحدة جديدة</span>
					</button>
				</div>
			</div>

			{/* Content Grid */}
			{loading ? (
				<div className="text-center py-16 text-2xl text-[#006d35] font-bold">
					جاري تحميل بيانات المنهج...
				</div>
			) : units.length === 0 ? (
				<div className="bg-white p-12 text-center text-xl text-gray-500 rounded-2xl border">
					لا توجد وحدات دراسية حالياً لهذه المرحلة. اضغط على "إضافة وحدة جديدة"
					للبدء.
				</div>
			) : (
				<div className="flex flex-col gap-6">
					{units.map((unit) => (
						<div
							key={unit.id}
							className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col gap-6"
						>
							{/* Unit Header */}
							<div className="flex justify-between items-center bg-[#e1fae7] p-4 rounded-xl border border-[#00e475]/30">
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined text-3xl text-[#006d35]">
										{unit.icon || "biotech"}
									</span>
									<div>
										<h3 className="text-2xl font-bold text-[#0a2014]">
											الوحدة {unit.unit_number}: {unit.title}
										</h3>
										<span className="text-sm font-semibold text-[#825500] bg-[#ffddb3] px-3 py-1 rounded-full inline-block mt-1">
											{unit.category}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-2">
									<button
										onClick={() => {
											setSelectedUnitId(unit.id);
											setEditingLesson(null);
											setLessonForm({
												title: "",
												description: "",
												lesson_number: (unit.lessons?.length || 0) + 1,
											});
											setShowLessonModal(true);
										}}
										className="bg-[#00e676] text-[#00612e] px-4 py-2 rounded-lg font-bold hover:bg-[#62ff96] transition-all flex items-center gap-1"
									>
										<span className="material-symbols-outlined text-xl">
											add
										</span>
										إضافة درس
									</button>
									<button
										onClick={() => {
											setEditingUnit(unit);
											setUnitForm(unit);
											setShowUnitModal(true);
										}}
										className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
									>
										<span className="material-symbols-outlined">edit</span>
									</button>
									<button
										onClick={() => handleDeleteUnit(unit.id)}
										className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
									>
										<span className="material-symbols-outlined">delete</span>
									</button>
								</div>
							</div>

							{/* Lessons inside Unit */}
							<div className="flex flex-col gap-4 pr-4 border-r-4 border-[#006d35]/20">
								{unit.lessons?.map((lesson) => (
									<div
										key={lesson.id}
										className="bg-[#f8fafc] p-4 rounded-xl border flex flex-col gap-3"
									>
										<div className="flex justify-between items-center">
											<h4 className="text-xl font-bold text-[#0a2014]">
												الدرس {lesson.lesson_number}: {lesson.title}
											</h4>
											<div className="flex items-center gap-2">
												<button
													onClick={() => {
														setSelectedLessonId(lesson.id);
														setEditingVideo(null);
														setVideoForm({
															title: "",
															duration: "30:00",
															video_url: "",
															pdf_url: "",
															video_order: (lesson.videos?.length || 0) + 1,
														});
														setShowVideoModal(true);
													}}
													className="bg-[#006d35] text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-[#005226]"
												>
													+ إضافة فيديو
												</button>
												<button
													onClick={() => {
														setEditingLesson(lesson);
														setLessonForm(lesson);
														setShowLessonModal(true);
													}}
													className="text-blue-600 hover:bg-blue-50 p-1 rounded"
												>
													<span className="material-symbols-outlined text-lg">
														edit
													</span>
												</button>
												<button
													onClick={() => handleDeleteLesson(lesson.id)}
													className="text-red-600 hover:bg-red-50 p-1 rounded"
												>
													<span className="material-symbols-outlined text-lg">
														delete
													</span>
												</button>
											</div>
										</div>

										{/* Videos List */}
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
											{lesson.videos?.map((vid) => (
												<div
													key={vid.id}
													className="bg-white p-3 rounded-lg border flex justify-between items-center shadow-xs"
												>
													<div className="flex items-center gap-2">
														<span className="material-symbols-outlined text-[#006d35]">
															play_circle
														</span>
														<div>
															<div className="font-bold text-gray-800">
																{vid.title}
															</div>
															<div className="text-xs text-gray-500">
																مدة الفيديو: {vid.duration}
															</div>
														</div>
													</div>
													<div className="flex items-center gap-1">
														<button
															onClick={() => {
																setEditingVideo(vid);
																setVideoForm(vid);
																setShowVideoModal(true);
															}}
															className="text-blue-600 hover:bg-blue-50 p-1 rounded"
														>
															<span className="material-symbols-outlined text-sm">
																edit
															</span>
														</button>
														<button
															onClick={() => handleDeleteVideo(vid.id)}
															className="text-red-600 hover:bg-red-50 p-1 rounded"
														>
															<span className="material-symbols-outlined text-sm">
																delete
															</span>
														</button>
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}

			{/* Unit Modal */}
			{showUnitModal && (
				<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
					<div className="bg-white p-6 rounded-2xl w-full max-w-lg flex flex-col gap-4">
						<h3 className="text-2xl font-bold text-[#006d35]">
							{editingUnit ? "تعديل الوحدة" : "إضافة وحدة جديدة"}
						</h3>
						<form onSubmit={handleSaveUnit} className="flex flex-col gap-4">
							<input
								type="text"
								placeholder="عنوان الوحدة (مثال: الأساس الجزيئي للوراثة)"
								value={unitForm.title}
								onChange={(e) =>
									setUnitForm({ ...unitForm, title: e.target.value })
								}
								required
								className="p-3 border rounded-xl text-lg"
							/>
							<input
								type="text"
								placeholder="التصنيف (مثال: علم الأحياء الجزيئي)"
								value={unitForm.category}
								onChange={(e) =>
									setUnitForm({ ...unitForm, category: e.target.value })
								}
								required
								className="p-3 border rounded-xl text-lg"
							/>
							<textarea
								placeholder="وصف الوحدة"
								value={unitForm.description}
								onChange={(e) =>
									setUnitForm({ ...unitForm, description: e.target.value })
								}
								rows={3}
								className="p-3 border rounded-xl text-lg"
							></textarea>
							<div className="flex gap-4">
								<button
									type="submit"
									className="bg-[#006d35] text-white px-6 py-3 rounded-xl font-bold text-lg flex-1"
								>
									حفظ
								</button>
								<button
									type="button"
									onClick={() => setShowUnitModal(false)}
									className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold text-lg"
								>
									إلغاء
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Lesson Modal */}
			{showLessonModal && (
				<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
					<div className="bg-white p-6 rounded-2xl w-full max-w-lg flex flex-col gap-4">
						<h3 className="text-2xl font-bold text-[#006d35]">
							{editingLesson ? "تعديل الدرس" : "إضافة درس جديد"}
						</h3>
						<form onSubmit={handleSaveLesson} className="flex flex-col gap-4">
							<input
								type="text"
								placeholder="عنوان الدرس"
								value={lessonForm.title}
								onChange={(e) =>
									setLessonForm({ ...lessonForm, title: e.target.value })
								}
								required
								className="p-3 border rounded-xl text-lg"
							/>
							<textarea
								placeholder="وصف الدرس"
								value={lessonForm.description}
								onChange={(e) =>
									setLessonForm({ ...lessonForm, description: e.target.value })
								}
								rows={2}
								className="p-3 border rounded-xl text-lg"
							></textarea>
							<div className="flex gap-4">
								<button
									type="submit"
									className="bg-[#006d35] text-white px-6 py-3 rounded-xl font-bold text-lg flex-1"
								>
									حفظ
								</button>
								<button
									type="button"
									onClick={() => setShowLessonModal(false)}
									className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold text-lg"
								>
									إلغاء
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Video Modal */}
			{showVideoModal && (
				<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
					<div className="bg-white p-6 rounded-2xl w-full max-w-lg flex flex-col gap-4">
						<h3 className="text-2xl font-bold text-[#006d35]">
							{editingVideo ? "تعديل الفيديو" : "إضافة فيديو جديد"}
						</h3>
						<form onSubmit={handleSaveVideo} className="flex flex-col gap-4">
							<input
								type="text"
								placeholder="عنوان الفيديو"
								value={videoForm.title}
								onChange={(e) =>
									setVideoForm({ ...videoForm, title: e.target.value })
								}
								required
								className="p-3 border rounded-xl text-lg"
							/>
							<input
								type="text"
								placeholder="مدة الفيديو (مثال: 45:00)"
								value={videoForm.duration}
								onChange={(e) =>
									setVideoForm({ ...videoForm, duration: e.target.value })
								}
								required
								className="p-3 border rounded-xl text-lg"
							/>

							<div className="flex flex-col gap-2">
								<label className="font-bold text-gray-700">
									رابط الفيديو أو رفعه من الجهاز:
								</label>
								<input
									type="text"
									placeholder="https://... أو مسار /uploads/video.mp4"
									value={videoForm.video_url}
									onChange={(e) =>
										setVideoForm({ ...videoForm, video_url: e.target.value })
									}
									required
									className="p-3 border rounded-xl text-lg"
								/>
								<input
									type="file"
									accept="video/*"
									onChange={(e) => handleFileUpload(e, "video_url")}
									className="text-sm"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label className="font-bold text-gray-700">
									ملف ملخص PDF (اختياري):
								</label>
								<input
									type="text"
									placeholder="مسار PDF"
									value={videoForm.pdf_url}
									onChange={(e) =>
										setVideoForm({ ...videoForm, pdf_url: e.target.value })
									}
									className="p-3 border rounded-xl text-lg"
								/>
								<input
									type="file"
									accept="application/pdf"
									onChange={(e) => handleFileUpload(e, "pdf_url")}
									className="text-sm"
								/>
							</div>

							{uploadingFile && (
								<div className="text-blue-600 font-bold">جاري رفع الملف...</div>
							)}

							<div className="flex gap-4 mt-2">
								<button
									type="submit"
									disabled={uploadingFile}
									className="bg-[#006d35] text-white px-6 py-3 rounded-xl font-bold text-lg flex-1"
								>
									حفظ الفيديو
								</button>
								<button
									type="button"
									onClick={() => setShowVideoModal(false)}
									className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl font-bold text-lg"
								>
									إلغاء
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default CurriculumManagement;
