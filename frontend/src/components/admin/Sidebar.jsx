import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
	return (
		<aside className="sidebar" dir="rtl">
			<div className="sidebar-brand">
				<span className="material-symbols-outlined">science</span>
				<div>
					<strong>أكاديمية الأحياء</strong>
					<span>مساحة الإدارة</span>
				</div>
			</div>
			<nav className="sidebar-nav">
				<NavLink
					to="/admin/dashboard"
					end
					className={({ isActive }) =>
						isActive ? "sidebar-link active" : "sidebar-link"
					}
				>
					<span className="icon material-symbols-outlined" aria-hidden="true">
						space_dashboard
					</span>
					<span className="label">اللوحة الرئيسية</span>
				</NavLink>
				<NavLink
					to="/admin/dashboard/curriculum"
					className={({ isActive }) =>
						isActive ? "sidebar-link active" : "sidebar-link"
					}
				>
					<span className="icon material-symbols-outlined" aria-hidden="true">
						menu_book
					</span>
					<span className="label">إدارة المنهج والدروس</span>
				</NavLink>
				<NavLink
					to="/admin/dashboard/students"
					className={({ isActive }) =>
						isActive ? "sidebar-link active" : "sidebar-link"
					}
				>
					<span className="icon material-symbols-outlined" aria-hidden="true">
						groups
					</span>
					<span className="label">الطلاب</span>
				</NavLink>
				<NavLink
					to="/admin/dashboard/tests"
					className={({ isActive }) =>
						isActive ? "sidebar-link active" : "sidebar-link"
					}
				>
					<span className="icon material-symbols-outlined" aria-hidden="true">
						assignment
					</span>
					<span className="label">الاختبارات</span>
				</NavLink>
			</nav>
			<div className="sidebar-footer">
				<span className="material-symbols-outlined">verified</span>
				<span>لوحة تحكم آمنة</span>
			</div>
		</aside>
	);
};

export default Sidebar;
