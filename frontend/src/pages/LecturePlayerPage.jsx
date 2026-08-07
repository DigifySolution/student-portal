import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SecureVideoPlayer from "../components/SecureVideoPlayer";
import { useAuth } from "../contexts/AuthContext";

const LecturePlayerPage = () => {
	const [searchParams] = useSearchParams();
	const videoIdParam = searchParams.get("videoId");
	const navigate = useNavigate();
	const { user } = useAuth();

	const [videoData, setVideoData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'resources', 'qa'
	const [isSaved, setIsSaved] = useState(false);

	const fetchVideoDetails = useCallback(async (id) => {
		setLoading(true);
		setErrorMessage("");
		try {
			const endpoint = id ? `/curriculum/video/${id}` : "/curriculum/video/1";
			const response = await axios.get(endpoint);
			if (response.data.success) {
				setVideoData(response.data.data);
			} else {
				setVideoData(null);
				setErrorMessage("تعذر تحميل المحاضرة");
			}
		} catch (error) {
			console.error("Error fetching lecture details:", error);
			setVideoData(null);
			setErrorMessage(
				error.response?.status === 401 || error.response?.status === 403
					? "يجب تسجيل الدخول للوصول إلى المحاضرات والمواد"
					: "تعذر تحميل المحاضرة حالياً",
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchVideoDetails(videoIdParam);
	}, [fetchVideoDetails, videoIdParam]);

	const handleVideoSelect = (vidId) => {
		navigate(`/lectures?videoId=${vidId}`);
	};

	const handleVideoEnded = async () => {
		if (user?.id && videoData?.currentVideo?.id) {
			try {
				await axios.post("/curriculum/progress", {
					studentId: user.id,
					videoId: videoData.currentVideo.id,
					completed: true,
				});
				// Refresh video details to update checkmark
				fetchVideoDetails(videoData.currentVideo.id);
			} catch (err) {
				console.error("Error recording video progress:", err);
			}
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[80vh] text-2xl text-[#006d35] font-semibold">
				<span className="material-symbols-outlined animate-spin text-5xl ml-3">
					sync
				</span>
				جاري تحميل المحاضرة...
			</div>
		);
	}

	if (!videoData?.currentVideo) {
		return (
			<div className="flex min-h-[80vh] flex-col items-center justify-center gap-5 px-6 text-center">
				<span className="material-symbols-outlined text-5xl text-[#825500]">
					lock
				</span>
				<p className="text-xl font-semibold text-[#3b4a3d]">
					{errorMessage || "لا يمكن الوصول إلى هذه المحاضرة"}
				</p>
				<button
					type="button"
					onClick={() => navigate("/student/login")}
					className="rounded-full bg-[#006d35] px-7 py-3 font-bold text-white transition hover:bg-[#005226]"
				>
					تسجيل الدخول
				</button>
			</div>
		);
	}

	const currentVideo = videoData.currentVideo;
	const currentUnit = videoData.currentUnit;

	const playlist = videoData?.playlist || [];
	const overallProgress = videoData.overallProgress ?? 0;
	const completedCount = videoData.completedVideosCount ?? 0;
	const totalCount = videoData.totalVideosCount ?? 0;
	const materialUrl = `${axios.defaults.baseURL}/curriculum/material/${currentVideo.id}`;

	return (
		<main className="max-w-[1340px] mx-auto px-6 pt-24 pb-16 min-h-screen">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
				{/* Left Sidebar (Progress + Lessons List) */}
				<div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
					{/* Progress Card */}
					<div className="glass-card rounded-2xl p-6">
						<div className="flex justify-between items-center mb-3">
							<h3 className="text-2xl font-bold text-[#0a2014]">تقدم الدورة</h3>
							<span className="text-xl font-bold text-[#006d35]">
								{overallProgress}% مكتمل
							</span>
						</div>
						<p className="text-lg text-[#3b4a3d] mb-3">
							{completedCount}/{totalCount} دروس
						</p>
						<div className="h-3 w-full bg-[#d0e9d6] rounded-full overflow-hidden">
							<div
								className="h-full bg-[#006d35] rounded-full transition-all duration-500"
								style={{ width: `${overallProgress}%` }}
							></div>
						</div>
					</div>

					{/* Lessons List Card */}
					<div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
						<div className="flex items-center gap-2 pb-2 border-b border-[#006d35]/10">
							<span className="material-symbols-outlined text-[#006d35] text-2xl">
								format_list_bulleted
							</span>
							<h3 className="text-2xl font-bold text-[#0a2014]">
								قائمة الدروس
							</h3>
						</div>

						<div className="flex flex-col gap-3">
							{playlist
								.flatMap((lesson) => lesson.videos || [])
								.map((vid, idx) => {
									const isPlaying = vid.id === currentVideo.id;
									const isCompleted = vid.completed || idx < 2; // sample fallback logic

									return (
										<button
											type="button"
											key={vid.id}
											onClick={() => handleVideoSelect(vid.id)}
											className={`flex items-center justify-between p-4 rounded-xl text-right transition-all cursor-pointer ${
												isPlaying
													? "bg-[#00e676]/20 border-2 border-[#00e676] shadow-sm"
													: "bg-white/60 hover:bg-[#d5eedc] border border-white/40"
											}`}
										>
											<div className="flex items-center gap-3">
												{isCompleted ? (
													<div className="w-8 h-8 rounded-full bg-[#00e676] text-[#006d35] flex items-center justify-center font-bold">
														<span className="material-symbols-outlined text-xl">
															check
														</span>
													</div>
												) : isPlaying ? (
													<div className="w-8 h-8 rounded-full bg-[#b02f00] text-white flex items-center justify-center font-bold animate-pulse">
														<span className="material-symbols-outlined text-xl">
															play_arrow
														</span>
													</div>
												) : (
													<div className="w-8 h-8 rounded-full bg-[#d0e9d6] text-[#6b7b6c] flex items-center justify-center font-bold">
														<span className="material-symbols-outlined text-xl">
															lock
														</span>
													</div>
												)}

												<div className="flex flex-col">
													<span
														className={`text-xl font-bold ${isPlaying ? "text-[#006d35]" : "text-[#0a2014]"}`}
													>
														{vid.title}
													</span>
													<span className="text-sm text-[#3b4a3d]">
														{isPlaying
															? "45:00 - قيد التشغيل"
															: `${vid.duration || "30:00"}`}
													</span>
												</div>
											</div>
										</button>
									);
								})}
						</div>
					</div>
				</div>

				{/* Main Video & Details Area */}
				<div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
					{/* Secure Video Player */}
					<SecureVideoPlayer
						videoId={currentVideo.id}
						videoUrl={currentVideo.video_url}
						studentName={user?.name || "طالب الأكاديمية"}
						studentPhone={user?.phone_number || "01092600559"}
						studentId={user?.id || "2027"}
						onEnded={handleVideoEnded}
					/>

					{/* Video Metadata Header & Actions */}
					<div className="glass-card rounded-3xl p-8 flex flex-col gap-6">
						<div className="flex flex-wrap justify-between items-start gap-4">
							<div>
								<span className="inline-block px-4 py-1.5 rounded-full bg-[#62ff96] text-[#00210b] font-bold text-lg mb-3">
									{currentUnit.category || "علم الوراثة"}
								</span>
								<h1 className="text-4xl md:text-5xl font-bold text-[#0a2014] leading-tight">
									{currentVideo.title}
								</h1>
								<p className="text-xl text-[#3b4a3d] mt-2">
									الأستاذة مروة هاشم • محاضرة مسجلة • خبرة +20 عاماً
								</p>
							</div>

							<button
								type="button"
								onClick={() => setIsSaved(!isSaved)}
								className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 text-xl border-2 cursor-pointer ${
									isSaved
										? "bg-[#006d35] text-white border-[#006d35]"
										: "border-[#b02f00] text-[#b02f00] hover:bg-[#b02f00]/10"
								}`}
							>
								<span className="material-symbols-outlined">
									{isSaved ? "bookmark" : "bookmark_border"}
								</span>
								<span>{isSaved ? "تم الحفظ" : "حفظ"}</span>
							</button>
						</div>

						{/* Navigation Tabs */}
						<div className="flex gap-8 border-b border-[#006d35]/10 pt-4 font-bold text-2xl">
							<button
								type="button"
								onClick={() => setActiveTab("overview")}
								className={`pb-3 transition-colors cursor-pointer ${
									activeTab === "overview"
										? "text-[#006d35] border-b-4 border-[#006d35]"
										: "text-[#3b4a3d] hover:text-[#006d35]"
								}`}
							>
								نظرة عامة
							</button>
							<button
								type="button"
								onClick={() => setActiveTab("resources")}
								className={`pb-3 transition-colors cursor-pointer ${
									activeTab === "resources"
										? "text-[#006d35] border-b-4 border-[#006d35]"
										: "text-[#3b4a3d] hover:text-[#006d35]"
								}`}
							>
								المصادر
							</button>
							<button
								type="button"
								onClick={() => setActiveTab("qa")}
								className={`pb-3 transition-colors cursor-pointer ${
									activeTab === "qa"
										? "text-[#006d35] border-b-4 border-[#006d35]"
										: "text-[#3b4a3d] hover:text-[#006d35]"
								}`}
							>
								الأسئلة
							</button>
						</div>

						{/* Tab Content */}
						{activeTab === "overview" && (
							<div className="flex flex-col gap-6 text-[#3b4a3d] text-xl leading-relaxed">
								<p>
									في هذه المحاضرة، سنستكشف التركيب الجزيئي الدقيق للحمض النووي
									(DNA). سنبدأ بمراجعة مكونات النيوكليوتيدات وكيفية ترابطها
									لتكوين الهيكل الحلزوني المزدوج.
								</p>
								<ul className="list-disc list-inside space-y-3 font-medium">
									<li>اكتشاف التركيب الحلزوني (واتسون وكريك).</li>
									<li>الروابط الهيدروجينية بين القواعد النيتروجينية.</li>
									<li>أهمية التركيب في تضاعف الـ DNA.</li>
								</ul>

								<div className="flex gap-4 pt-4">
									<a
										href={materialUrl}
										target="_blank"
										rel="noreferrer"
										className="flex items-center gap-3 px-6 py-4 rounded-xl bg-[#e1fae7] border border-[#00e475]/40 text-[#00612e] font-bold text-xl hover:bg-[#62ff96]/40 transition-colors"
									>
										<span className="material-symbols-outlined text-3xl">
											picture_as_pdf
										</span>
										<div className="flex flex-col text-right">
											<span>ملخص المحاضرة</span>
											<span className="text-sm font-normal text-[#3b4a3d]">
												PDF • 2 MB
											</span>
										</div>
									</a>

									<button
										type="button"
										onClick={() => setActiveTab("qa")}
										className="flex items-center gap-3 px-6 py-4 rounded-xl bg-[#e1fae7] border border-[#00e475]/40 text-[#00612e] font-bold text-xl hover:bg-[#62ff96]/40 transition-colors"
									>
										<span className="material-symbols-outlined text-3xl">
											forum
										</span>
										<div className="flex flex-col text-right">
											<span>نقاش المجتمع</span>
											<span className="text-sm font-normal text-[#3b4a3d]">
												منتدى • 15 تعليق
											</span>
										</div>
									</button>
								</div>
							</div>
						)}

						{activeTab === "resources" && (
							<div className="flex flex-col gap-4">
								<h4 className="text-2xl font-bold text-[#0a2014]">
									ملفات الشرح والتلخيص
								</h4>
								<a
									href={materialUrl}
									download
									className="flex items-center justify-between p-6 rounded-2xl bg-white border border-[#bacbb9]/40 hover:shadow-md transition-all"
								>
									<div className="flex items-center gap-4">
										<span className="material-symbols-outlined text-[#b02f00] text-4xl">
											picture_as_pdf
										</span>
										<div>
											<h5 className="text-2xl font-bold text-[#0a2014]">
												ملخص وتلخيص سبورة الدرس (PDF)
											</h5>
											<span className="text-lg text-[#3b4a3d]">
												شامل جميع الملاحظات والرسومات التوضيحية
											</span>
										</div>
									</div>
									<span className="material-symbols-outlined text-3xl text-[#006d35]">
										download
									</span>
								</a>
							</div>
						)}

						{activeTab === "qa" && (
							<div className="flex flex-col gap-6">
								<h4 className="text-2xl font-bold text-[#0a2014]">
									أسئلة الطلاب واستفساراتهم
								</h4>
								<div className="flex flex-col gap-4">
									<textarea
										placeholder="اكتب سؤالك للأستاذة مروة هاشم..."
										rows={3}
										className="w-full p-4 rounded-xl border border-[#bacbb9] focus:outline-none focus:border-[#006d35] text-xl"
									></textarea>
									<button
										type="button"
										className="self-end px-8 py-3 rounded-full bg-[#006d35] text-white font-bold text-xl hover:bg-[#005226] transition-all"
									>
										إرسال السؤال
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default LecturePlayerPage;
