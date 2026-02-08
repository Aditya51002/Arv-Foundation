import AdminLayout from "../../components/AdminLayout.jsx";

const mockImages = [
	{ id: 1, title: "Community Drive" },
	{ id: 2, title: "Health Camp" },
	{ id: 3, title: "Food Distribution" },
	{ id: 4, title: "Education Workshop" },
	{ id: 5, title: "Volunteer Day" },
	{ id: 6, title: "Relief Support" }
];

const AdminGallery = ({ onLogout }) => {
	return (
		<div className="section-shell pb-12">
			<AdminLayout
				title="Gallery"
				subtitle="Manage website photos and highlights."
				onLogout={onLogout}
			>
				{/* TODO: Connect gallery list API */}
				<div className="flex flex-wrap items-center justify-between gap-3">
					<p className="text-sm text-white/70">Showing {mockImages.length} items</p>
					<button
						type="button"
						className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
					>
						Upload New Image
					</button>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{mockImages.map((image) => (
						<div key={image.id} className="glass-card border border-white/10 rounded-2xl overflow-hidden">
							<div className="h-32 bg-gradient-to-br from-emerald-400/20 via-amber-300/20 to-white/5" />
							<div className="p-4 space-y-3">
								<div>
									<p className="text-sm font-semibold">{image.title}</p>
									<p className="text-xs text-white/60">Mock image #{image.id}</p>
								</div>
								<div className="flex gap-2">
									<button
										type="button"
										className="flex-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition"
									>
										Replace
									</button>
									<button
										type="button"
										className="flex-1 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-500/20 transition"
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</AdminLayout>
		</div>
	);
};

export default AdminGallery;

