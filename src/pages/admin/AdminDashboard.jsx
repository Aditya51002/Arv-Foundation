import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutAdmin } from "../../utils/adminAuth.js";
import { getDrives, deleteDrive, toggleDriveActive } from "../../utils/driveStorage.js";
import AdminLayout from "../../components/AdminLayout.jsx";
import AddDriveModal from "../../components/AddDriveModal.jsx";
import { MapPin, Clock, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

const AdminDashboard = () => {
	const navigate = useNavigate();
	const [driveModalOpen, setDriveModalOpen] = useState(false);
	const [drives, setDrives] = useState(() => getDrives());

	const handleLogout = () => {
		logoutAdmin();
		navigate("/admin/login", { replace: true });
	};

	const refreshDrives = () => setDrives(getDrives());

	const handleDeleteDrive = (id) => {
		deleteDrive(id);
		refreshDrives();
	};

	const handleToggleDrive = (id) => {
		toggleDriveActive(id);
		refreshDrives();
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
						<p className="mt-2 text-3xl font-semibold text-amber-200">128</p>
					</div>
				</div>

				{/* Action cards */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<div className="glass-card p-6 border border-white/10 rounded-2xl space-y-4">
						<h2 className="text-lg font-semibold">Current Drives</h2>
						<p className="text-sm text-white/70">
							Preview and manage ongoing drives, updates, and impact stories.
						</p>
						<button
							type="button"
							onClick={() => setDriveModalOpen(true)}
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

				{/* Published Drives List */}
				{drives.length > 0 && (
					<div className="space-y-4">
						<h2 className="text-lg font-semibold">Published Drives</h2>
						<div className="space-y-3">
							{drives.map((drive) => (
								<div
									key={drive.id}
									className={`glass-card p-4 border rounded-2xl flex flex-col sm:flex-row gap-4 items-start ${
										drive.active ? "border-emerald-400/30" : "border-white/10 opacity-60"
									}`}
								>
									{drive.image && (
										<img
											src={drive.image}
											alt={drive.category}
											className="w-full sm:w-24 h-20 object-cover rounded-lg flex-shrink-0"
										/>
									)}
									<div className="flex-1 min-w-0 space-y-1">
										<div className="flex items-center gap-2 flex-wrap">
											<span className="pill text-xs">{drive.category}</span>
											{drive.active && (
												<span className="text-xs text-emerald-300 bg-emerald-400/10 px-2 py-0.5 rounded-full">
													Active
												</span>
											)}
										</div>
										<p className="text-sm text-white/80 line-clamp-2">{drive.description}</p>
										<div className="flex items-center gap-4 text-xs text-white/50">
											<span className="flex items-center gap-1">
												<MapPin size={12} /> {drive.location}
											</span>
											<span className="flex items-center gap-1">
												<Clock size={12} />{" "}
												{new Date(drive.dateTime).toLocaleString("en-IN", {
													dateStyle: "medium",
													timeStyle: "short",
												})}
											</span>
										</div>
									</div>
									<div className="flex items-center gap-2 flex-shrink-0">
										<button
											onClick={() => handleToggleDrive(drive.id)}
											title={drive.active ? "Deactivate" : "Activate"}
											className="p-2 rounded-lg hover:bg-white/10 transition text-white/60 hover:text-white"
										>
											{drive.active ? <ToggleRight size={20} className="text-emerald-300" /> : <ToggleLeft size={20} />}
										</button>
										<button
											onClick={() => handleDeleteDrive(drive.id)}
											title="Delete drive"
											className="p-2 rounded-lg hover:bg-red-500/10 transition text-white/60 hover:text-red-400"
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</AdminLayout>

			{/* Add Drive Modal */}
			<AddDriveModal
				open={driveModalOpen}
				onClose={() => setDriveModalOpen(false)}
				onPublished={refreshDrives}
			/>
		</div>
	);
};

export default AdminDashboard;
