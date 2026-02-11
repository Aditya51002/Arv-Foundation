import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutAdmin } from "../../utils/adminAuth.js";
import { getDrives } from "../../utils/driveStorage.js";
import { fetchAllImages } from "../../utils/imageApi.js";
import AdminLayout from "../../components/AdminLayout.jsx";

const AdminDashboard = () => {
	const navigate = useNavigate();
	const [drives] = useState(() => getDrives());
	const [galleryCount, setGalleryCount] = useState(0);

	useEffect(() => {
		fetchAllImages()
			.then((imgs) => setGalleryCount(imgs.length))
			.catch(() => setGalleryCount(0));
	}, []);

	const handleLogout = () => {
		logoutAdmin();
		navigate("/admin/login", { replace: true });
	};

	const activeDrives = drives.filter((d) => d.active);

	return (
		<div className="section-shell pb-12">
			<AdminLayout
				title="Dashboard"
				subtitle="Manage content like photos, drives, and announcements."
				onLogout={handleLogout}
			>
				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="glass-card p-5 border border-white/10 rounded-2xl">
						<p className="text-xs uppercase tracking-wide text-white/60">Total Drives</p>
						<p className="mt-2 text-3xl font-semibold text-amber-200">{drives.length}</p>
					</div>
					<div className="glass-card p-5 border border-white/10 rounded-2xl">
						<p className="text-xs uppercase tracking-wide text-white/60">Active Drives</p>
						<p className="mt-2 text-3xl font-semibold text-emerald-200">{activeDrives.length}</p>
					</div>
					<div className="glass-card p-5 border border-white/10 rounded-2xl">
						<p className="text-xs uppercase tracking-wide text-white/60">Gallery Items</p>
						<p className="mt-2 text-3xl font-semibold text-amber-200">{galleryCount}</p>
					</div>
				</div>

				{/* Action cards */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					<div className="glass-card p-6 border border-white/10 rounded-2xl space-y-4">
						<h2 className="text-lg font-semibold">Drive Management</h2>
						<p className="text-sm text-white/70">
							Create, manage and publish community drives.
						</p>
						<button
							type="button"
							onClick={() => navigate('/admin/drives')}
							className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
						>
							Manage Drives
						</button>
					</div>

					<div className="glass-card p-6 border border-white/10 rounded-2xl space-y-4">
						<h2 className="text-lg font-semibold">Photo Gallery</h2>
						<p className="text-sm text-white/70">
							Upload and curate photos for the website gallery.
						</p>
						<button
							type="button"
							onClick={() => navigate('/admin/gallery')}
							className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
						>
							Manage Gallery
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
