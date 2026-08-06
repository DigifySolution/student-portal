import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

const NAV_LINKS = [
	{ label: "الرئيسية", path: "/" },
	{ label: "المميزات", path: "/#features" },
	{ label: "المنهج", path: "/curriculum" },
];

export default function Navbar() {
	const { user, logout } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [accountOpen, setAccountOpen] = useState(false);
	const isStudent = user?.type === "student";

	useEffect(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const isActive = (path) => {
		const base = path.split("#")[0];
		return base === "/"
			? location.pathname === "/"
			: location.pathname.startsWith(base);
	};

	const go = (path) => {
		setMobileOpen(false);
		setAccountOpen(false);
		if (!path.includes("#")) return navigate(path);
		const hash = path.split("#")[1];
		if (location.pathname !== "/") {
			navigate("/");
			setTimeout(
				() =>
					document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }),
				250,
			);
			return;
		}
		document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
	};

	const handleLogout = () => {
		logout();
		setMobileOpen(false);
		setAccountOpen(false);
		navigate("/");
	};

	return (
		<>
			<header className="site-header" dir="rtl">
				<div className="site-header__inner">
					<Link
						className="site-header__brand"
						to="/"
						aria-label="أكاديمية الأحياء - الرئيسية"
					>
						أكاديمية الأحياء
					</Link>
					<nav className="site-header__links" aria-label="التنقل الرئيسي">
						{NAV_LINKS.map(({ label, path }) => (
							<button
								className={isActive(path) ? "is-active" : ""}
								key={path}
								onClick={() => go(path)}
								type="button"
							>
								{label}
							</button>
						))}
					</nav>
					<div className="site-header__actions">
						{isStudent ? (
							<div className="site-account">
								<button
									aria-expanded={accountOpen}
									className="site-account__trigger"
									onClick={() => setAccountOpen((open) => !open)}
									type="button"
								>
									<span>{user.name || "الطالب"}</span>
									<span className="material-symbols-outlined">expand_more</span>
								</button>
								{accountOpen ? (
									<div className="site-account__menu">
										<Link
											onClick={() => setAccountOpen(false)}
											to="/student/dashboard"
										>
											<span className="material-symbols-outlined">person</span>
											الملف الشخصي
										</Link>
										<Link onClick={() => setAccountOpen(false)} to="/lectures">
											<span className="material-symbols-outlined">
												play_circle
											</span>
											المحاضرات
										</Link>
										<button onClick={handleLogout} type="button">
											<span className="material-symbols-outlined">logout</span>
											تسجيل الخروج
										</button>
									</div>
								) : null}
							</div>
						) : !user ? (
							<Link className="site-header__primary" to="/student/login">
								تسجيل الدخول
							</Link>
						) : null}
						<button
							aria-expanded={mobileOpen}
							aria-label="فتح القائمة"
							className="site-header__menu"
							onClick={() => setMobileOpen(true)}
							type="button"
						>
							<span className="material-symbols-outlined">menu</span>
						</button>
					</div>
				</div>
			</header>

			<div
				aria-hidden={!mobileOpen}
				className={`site-drawer__backdrop ${mobileOpen ? "is-open" : ""}`}
				onClick={() => setMobileOpen(false)}
			/>
			<aside
				aria-hidden={!mobileOpen}
				className={`site-drawer ${mobileOpen ? "is-open" : ""}`}
				dir="rtl"
			>
				<div className="site-drawer__head">
					<strong>أكاديمية الأحياء</strong>
					<button
						aria-label="إغلاق القائمة"
						onClick={() => setMobileOpen(false)}
						type="button"
					>
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>
				{isStudent ? (
					<div className="site-drawer__identity">
						<span className="material-symbols-outlined">account_circle</span>
						<strong>{user.name || "الطالب"}</strong>
					</div>
				) : null}
				<nav className="site-drawer__links" aria-label="التنقل على الهاتف">
					{NAV_LINKS.map(({ label, path }) => (
						<button
							className={isActive(path) ? "is-active" : ""}
							key={path}
							onClick={() => go(path)}
							type="button"
						>
							<span>{label}</span>
							<span className="material-symbols-outlined">arrow_back</span>
						</button>
					))}
					{isStudent ? (
						<>
							<button onClick={() => go("/student/dashboard")} type="button">
								<span>الملف الشخصي</span>
								<span className="material-symbols-outlined">person</span>
							</button>
							<button onClick={() => go("/lectures")} type="button">
								<span>المحاضرات</span>
								<span className="material-symbols-outlined">play_circle</span>
							</button>
						</>
					) : null}
				</nav>
				<div className="site-drawer__actions">
					{!user ? (
						<Link onClick={() => setMobileOpen(false)} to="/student/login">
							تسجيل الدخول
						</Link>
					) : null}
					{user ? (
						<button
							className="site-drawer__logout"
							onClick={handleLogout}
							type="button"
						>
							<span className="material-symbols-outlined">logout</span>تسجيل
							الخروج
						</button>
					) : null}
				</div>
			</aside>
		</>
	);
}
