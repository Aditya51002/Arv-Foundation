import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../utils/adminAuth.js";
import AdminLayout from "../../components/AdminLayout.jsx";

const AdminDashboard = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		// TODO: Replace mock auth with JWT API
		logoutAdmin();
		navigate("/admin/login", { replace: true });
	};

	return (
		<div className="section-shell pb-12">
			<AdminLayout
				title="Dashboard"
				subtitle="Manage content like photos, drives, and announcements."
				onLogout={handleLogout}
			>
				{/* TODO: Replace mock stats with dashboard metrics API */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="glass-card p-5 border border-white/10 rounded-2xl">
						<p className="text-xs uppercase tracking-wide text-white/60">Total Drives</p>
						<p className="mt-2 text-3xl font-semibold text-amber-200">24</p>
					</div>
					<div className="glass-card p-5 border border-white/10 rounded-2xl">
						<p className="text-xs uppercase tracking-wide text-white/60">Active Initiatives</p>
						<p className="mt-2 text-3xl font-semibold text-emerald-200">7</p>
					</div>
					<div className="glass-card p-5 border border-white/10 rounded-2xl">
						<p className="text-xs uppercase tracking-wide text-white/60">Gallery Items</p>
						<p className="mt-2 text-3xl font-semibold text-amber-200">128</p>
					</div>
				</div>

				{/* TODO: Wire these actions to admin APIs */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<div className="glass-card p-6 border border-white/10 rounded-2xl space-y-4">
						<h2 className="text-lg font-semibold">Current Drives</h2>
						<p className="text-sm text-white/70">
							Preview and manage ongoing drives, updates, and impact stories.
						</p>
						<button
							type="button"
							className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
						>
							Add New Drive
						</button>
					</div>

					<div className="glass-card p-6 border border-white/10 rounded-2xl space-y-4">
						<h2 className="text-lg font-semibold">Photo Gallery</h2>
						<p className="text-sm text-white/70">
							Upload and curate photos for the website gallery.
						</p>
						<button
							type="button"
							className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
						>
							Upload Photos
						</button>
					</div>

					<div className="glass-card p-6 border border-white/10 rounded-2xl space-y-4">
						<h2 className="text-lg font-semibold">Announcements</h2>
						<p className="text-sm text-white/70">
							Post updates about upcoming events or urgent needs.
						</p>
						<button
							type="button"
							className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
						>
							Create Announcement
						</button>
					</div>

					<div className="glass-card p-6 border border-white/10 rounded-2xl space-y-4">
						<h2 className="text-lg font-semibold">Site Content</h2>
						<p className="text-sm text-white/70">
							Update section copy, highlights, and featured initiatives.
						</p>
						<button
							type="button"
							className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
						>
							Edit Content
						</button>
					</div>
				</div>
			</AdminLayout>
		</div>
	);
};

export default AdminDashboard;
