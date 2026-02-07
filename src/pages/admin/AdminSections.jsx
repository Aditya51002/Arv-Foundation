import AdminLayout from "../../components/AdminLayout.jsx";

const mockSections = [
	{ id: 1, title: "Hero Banner", status: "active" },
	{ id: 2, title: "Current Drives", status: "active" },
	{ id: 3, title: "Impact Highlights", status: "hidden" },
	{ id: 4, title: "Volunteer CTA", status: "active" }
];

const AdminSections = ({ onLogout }) => {
	return (
		<div className="section-shell pb-12">
			<AdminLayout
				title="Page Sections"
				subtitle="Control visibility and order of homepage sections."
				onLogout={onLogout}
			>
				{/* TODO: Connect sections list API */}
				<div className="glass-card border border-white/10 rounded-2xl overflow-hidden">
					<div className="grid grid-cols-1 divide-y divide-white/10">
						{mockSections.map((section) => (
							<div key={section.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
								<div>
									<p className="text-sm font-semibold">{section.title}</p>
									<p className="text-xs text-white/60">
										Status: {section.status === "active" ? "Active" : "Hidden"}
									</p>
								</div>
								<div className="flex flex-wrap items-center gap-2">
									<button
										type="button"
										className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition"
									>
										Edit
									</button>
									<button
										type="button"
										className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-400/20 transition"
									>
										{section.status === "active" ? "Hide" : "Activate"}
									</button>
									<div className="flex gap-2">
										<button
											type="button"
											className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition"
										>
											Up
										</button>
										<button
											type="button"
											className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition"
										>
											Down
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</AdminLayout>
		</div>
	);
};

export default AdminSections;

