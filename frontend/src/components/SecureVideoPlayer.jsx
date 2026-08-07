import axios from "axios";
import { useEffect, useRef, useState } from "react";

const SecureVideoPlayer = ({
	videoUrl,
	videoId,
	studentName = "الطالب المسجل",
	studentPhone = "010xxxxxxx",
	studentId = "2027",
	onEnded,
}) => {
	const videoRef = useRef(null);
	const containerRef = useRef(null);

	const [blobSrc, setBlobSrc] = useState("");
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState(1);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [watermarkPos, setWatermarkPos] = useState({ top: "20%", left: "30%" });
	const [loading, setLoading] = useState(true);

	// 1. Authenticated / Blob Fetch to mask actual MP4 URL in DOM
	useEffect(() => {
		let isMounted = true;
		let objectUrl = "";

		const loadVideo = async () => {
			setLoading(true);
			try {
				const streamEndpoint = videoId
					? `${axios.defaults.baseURL}/curriculum/stream/${videoId}`
					: videoUrl;

				// If external sample HTTP video, fallback directly or fetch blob
				if (
					streamEndpoint.startsWith("http://") ||
					streamEndpoint.startsWith("https://")
				) {
					setBlobSrc(streamEndpoint);
					setLoading(false);
					return;
				}

				const token = localStorage.getItem("token");
				const res = await fetch(streamEndpoint, {
					headers: {
						"Cache-Control": "no-cache",
						...(token ? { Authorization: `Bearer ${token}` } : {}),
					},
				});
				if (!res.ok) {
					throw new Error(`Video stream request failed with ${res.status}`);
				}
				const blob = await res.blob();
				objectUrl = URL.createObjectURL(blob);
				if (isMounted) {
					setBlobSrc(objectUrl);
					setLoading(false);
				}
			} catch (err) {
				console.error("Blob video fetch fallback:", err);
				if (isMounted) {
					setBlobSrc(videoUrl);
					setLoading(false);
				}
			}
		};

		if (videoUrl || videoId) {
			loadVideo();
		}

		return () => {
			isMounted = false;
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl);
			}
		};
	}, [videoUrl, videoId]);

	// 2. Randomized Dynamic Watermark Position (Anti-Screen Capture Deterrent)
	useEffect(() => {
		const interval = setInterval(() => {
			const randomTop = `${Math.floor(Math.random() * 70 + 10)}%`;
			const randomLeft = `${Math.floor(Math.random() * 60 + 10)}%`;
			setWatermarkPos({ top: randomTop, left: randomLeft });
		}, 4500);

		return () => clearInterval(interval);
	}, []);

	// 3. Block Keyboard Shortcuts for DevTools & Saving on video container
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (
				e.keyCode === 123 || // F12
				(e.ctrlKey &&
					e.shiftKey &&
					(e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // Ctrl+Shift+I/J/C
				(e.ctrlKey && (e.keyCode === 83 || e.keyCode === 85)) // Ctrl+S / Ctrl+U
			) {
				e.preventDefault();
				return false;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const togglePlay = () => {
		if (!videoRef.current) return;
		if (isPlaying) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
			setDuration(videoRef.current.duration || 0);
		}
	};

	const handleSeek = (e) => {
		const seekTime = parseFloat(e.target.value);
		if (videoRef.current) {
			videoRef.current.currentTime = seekTime;
			setCurrentTime(seekTime);
		}
	};

	const handleVolumeChange = (e) => {
		const vol = parseFloat(e.target.value);
		setVolume(vol);
		if (videoRef.current) {
			videoRef.current.volume = vol;
			setIsMuted(vol === 0);
		}
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	const handleSpeedChange = (speed) => {
		setPlaybackSpeed(speed);
		if (videoRef.current) {
			videoRef.current.playbackRate = speed;
		}
	};

	const toggleFullscreen = () => {
		if (!containerRef.current) return;
		if (!document.fullscreenElement) {
			containerRef.current
				.requestFullscreen()
				.catch((err) => console.error(err));
			setIsFullscreen(true);
		} else {
			document.exitFullscreen().catch((err) => console.error(err));
			setIsFullscreen(false);
		}
	};

	const formatTime = (seconds) => {
		if (Number.isNaN(seconds)) return "00:00";
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div
			ref={containerRef}
			role="presentation"
			className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl group select-none"
		>
			{/* 4. Dynamic Moving Watermark Overlay */}
			<div
				style={{ top: watermarkPos.top, left: watermarkPos.left }}
				className="absolute z-30 pointer-events-none transition-all duration-1000 ease-in-out px-4 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white/40 text-sm font-semibold border border-white/10 tracking-wide"
			>
				أكاديمية الأحياء | {studentName} ({studentPhone}) | ID: {studentId}
			</div>

			{/* Loading Spinner */}
			{loading && (
				<div className="absolute inset-0 z-40 bg-black/80 flex flex-col justify-center items-center text-white gap-3">
					<span className="material-symbols-outlined text-5xl animate-spin text-[#00e676]">
						sync
					</span>
					<span className="text-xl font-bold">جاري تحميل البث المحمي...</span>
				</div>
			)}

			{/* Video Element */}
			<video
				ref={videoRef}
				src={blobSrc}
				onTimeUpdate={handleTimeUpdate}
				onEnded={() => {
					setIsPlaying(false);
					if (onEnded) onEnded();
				}}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				controlsList="nodownload noremoteplayback nofullscreen"
				disablePictureInPicture
				disableRemotePlayback
				className="w-full h-full object-contain pointer-events-none"
			>
				<track
					kind="captions"
					srcLang="ar"
					label="العربية"
					src="/captions/ar.vtt"
				/>
			</video>

			{/* 5. Transparent Click Overlay (prevents right-click inspection directly on HTML5 video element) */}
			<button
				type="button"
				aria-label="تشغيل أو إيقاف الفيديو"
				onClick={togglePlay}
				onContextMenu={(e) => e.preventDefault()}
				className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0"
			>
				{!isPlaying && !loading && (
					<span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#00e676] text-[#006d35] shadow-2xl transition-transform hover:scale-110">
						<span className="material-symbols-outlined text-6xl">
							play_arrow
						</span>
					</span>
				)}
			</button>

			{/* Custom Control Bar */}
			<div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col gap-2 transition-opacity duration-300 opacity-90 hover:opacity-100">
				{/* Timeline Slider */}
				<input
					type="range"
					min={0}
					max={duration || 100}
					value={currentTime}
					onChange={handleSeek}
					className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#00e676]"
				/>

				<div className="flex justify-between items-center text-white px-2">
					<div className="flex items-center gap-4">
						<button
							type="button"
							onClick={togglePlay}
							className="hover:text-[#00e676] transition-colors"
						>
							<span className="material-symbols-outlined text-3xl">
								{isPlaying ? "pause" : "play_arrow"}
							</span>
						</button>

						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={toggleMute}
								className="hover:text-[#00e676] transition-colors"
							>
								<span className="material-symbols-outlined text-2xl">
									{isMuted || volume === 0 ? "volume_off" : "volume_up"}
								</span>
							</button>
							<input
								type="range"
								min={0}
								max={1}
								step={0.1}
								value={isMuted ? 0 : volume}
								onChange={handleVolumeChange}
								className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#00e676]"
							/>
						</div>

						<span className="text-lg font-mono">
							{formatTime(currentTime)} / {formatTime(duration)}
						</span>
					</div>

					<div className="flex items-center gap-4">
						{/* Speed Selector */}
						<div className="flex gap-1 bg-white/10 rounded-lg p-1 text-sm">
							{[1, 1.25, 1.5, 2].map((speed) => (
								<button
									type="button"
									key={speed}
									onClick={() => handleSpeedChange(speed)}
									className={`px-2 py-0.5 rounded font-bold transition-colors ${
										playbackSpeed === speed
											? "bg-[#00e676] text-[#006d35]"
											: "hover:bg-white/20"
									}`}
								>
									{speed}x
								</button>
							))}
						</div>

						<button
							type="button"
							onClick={toggleFullscreen}
							className="hover:text-[#00e676] transition-colors"
						>
							<span className="material-symbols-outlined text-2xl">
								{isFullscreen ? "fullscreen_exit" : "fullscreen"}
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecureVideoPlayer;
