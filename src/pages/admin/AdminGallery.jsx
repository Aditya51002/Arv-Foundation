import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Trash2, Image as ImageIcon, MapPin, ChevronRight, Check, Loader2, Unlink } from "lucide-react";
import AdminLayout from "../../components/AdminLayout.jsx";
import { fetchAllImages, uploadImages, deleteImage, assignImagePlacement } from "../../utils/imageApi.js";
import { getPages, getSections, getSlots, makePlacementKey, getSlotLabel } from "../../data/imageSlots.js";

const AdminGallery = ({ onLogout }) => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [uploadModal, setUploadModal] = useState(false);
	const [dragActive, setDragActive] = useState(false);
	const fileInputRef = useRef(null);

	// Placement popup state
	const [placementModal, setPlacementModal] = useState(null);
	const [selectedPage, setSelectedPage] = useState("");
	const [selectedSection, setSelectedSection] = useState("");
	const [selectedSlot, setSelectedSlot] = useState(null);
	const [assigning, setAssigning] = useState(false);

	const loadImages = async () => {
		try {
			setLoading(true);
			const data = await fetchAllImages();
			setImages(data);
		} catch (err) {
			console.error("Failed to load images:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { loadImages(); }, []);

	const handleFileSelect = async (files) => {
		if (!files || files.length === 0) return;
		setUploading(true);

		try {
			const imageDataPromises = Array.from(files).map(file => {
				return new Promise((resolve) => {
					const reader = new FileReader();
					reader.onloadend = () => {
						resolve({
							url: reader.result,
							filename: file.name,
							size: file.size,
							title: file.name.replace(/\.[^/.]+$/, ""),
						});
					};
					reader.readAsDataURL(file);
				});
			});

			const imageDataArray = await Promise.all(imageDataPromises);
			await uploadImages(imageDataArray);
			setUploadModal(false);
			await loadImages();
		} catch (err) {
			console.error("Upload failed:", err);
			alert("Failed to upload images. Make sure the server is running.");
		} finally {
			setUploading(false);
		}
	};

	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
		else if (e.type === "dragleave") setDragActive(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files);
	};

	const handleDeleteImage = async (id) => {
		if (!confirm("Delete this image permanently from the database?")) return;
		try {
			await deleteImage(id);
			await loadImages();
		} catch (err) {
			console.error("Delete failed:", err);
			alert("Failed to delete image.");
		}
	};

	const openPlacementModal = (image) => {
		setPlacementModal(image);
		setSelectedPage("");
		setSelectedSection("");
		setSelectedSlot(null);
	};

	const handleAssignPlacement = async () => {
		if (!placementModal || selectedSlot === null) return;
		setAssigning(true);
		try {
			const placementKey = makePlacementKey(selectedPage, selectedSection, selectedSlot);
			await assignImagePlacement(placementModal._id, placementKey);
			setPlacementModal(null);
			await loadImages();
		} catch (err) {
			console.error("Assignment failed:", err);
			alert("Failed to assign image to slot.");
		} finally {
			setAssigning(false);
		}
	};

	const handleRemovePlacement = async (image) => {
		try {
			await assignImagePlacement(image._id, null);
			await loadImages();
		} catch (err) {
			console.error("Failed to remove placement:", err);
		}
	};

	const pages = getPages();
	const sections = selectedPage ? getSections(selectedPage) : [];
	const slots = selectedPage && selectedSection ? getSlots(selectedPage, selectedSection) : [];

	const isSlotTaken = (page, section, slot) => {
		const key = makePlacementKey(page, section, slot);
		return images.some(img => img.placement === key && img._id !== placementModal?._id);
	};

	return (
		<div className="section-shell pb-12">
			<AdminLayout
				title="Photo Gallery"
				subtitle="Upload photos and assign them to website pages."
				onLogout={onLogout}
			>
				{/* Upload section */}
				<div className="flex flex-wrap items-center justify-between gap-3">
					<p className="text-sm text-white/70">
						{loading ? "Loading..." : `${images.length} images in gallery`}
					</p>
					<button
						type="button"
						onClick={() => setUploadModal(true)}
						className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
					>
						Upload New Images
					</button>
				</div>

				{/* Gallery Grid */}
				{!loading && images.length > 0 && (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{images.map((image) => (
							<motion.div
								key={image._id}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								className="glass-card border border-white/10 rounded-2xl overflow-hidden group"
							>
								<div className="relative h-32 bg-gradient-to-br from-emerald-400/20 via-amber-300/20 to-white/5">
									<img src={image.url} alt={image.title} className="w-full h-full object-cover" />
								</div>
								<div className="p-3 space-y-2">
									<p className="text-sm font-semibold text-white truncate">{image.title}</p>
									{image.placement ? (
										<div className="flex items-center gap-1 text-xs text-emerald-300 bg-emerald-400/10 px-2 py-1 rounded-full">
											<MapPin size={10} />
											<span className="truncate">{getSlotLabel(image.placement)}</span>
										</div>
									) : (
										<p className="text-xs text-white/40">Not assigned to any page</p>
									)}
									<div className="flex gap-2 pt-1">
										<button
											onClick={() => openPlacementModal(image)}
											className="flex-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-200 hover:bg-amber-500/20 transition"
										>
											{image.placement ? "Change" : "Assign"}
										</button>
										{image.placement && (
											<button
												onClick={() => handleRemovePlacement(image)}
												title="Remove from page"
												className="rounded-full border border-white/15 bg-white/5 px-2 py-1.5 text-xs text-white/60 hover:text-white hover:bg-white/10 transition"
											>
												<Unlink size={12} />
											</button>
										)}
										<button
											onClick={() => handleDeleteImage(image._id)}
											title="Delete permanently"
											className="rounded-full border border-red-400/30 bg-red-500/10 px-2 py-1.5 text-xs text-red-200 hover:bg-red-500/20 transition"
										>
											<Trash2 size={12} />
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				)}

				{!loading && images.length === 0 && (
					<div className="text-center py-12">
						<ImageIcon size={48} className="mx-auto text-white/30 mb-4" />
						<p className="text-white/60 mb-2">No images uploaded yet</p>
						<button
							onClick={() => setUploadModal(true)}
							className="text-amber-300 hover:text-amber-200 text-sm font-semibold"
						>
							Upload your first images
						</button>
					</div>
				)}
			</AdminLayout>

			{/* ═══ Upload Modal ═══ */}
			<AnimatePresence>
				{uploadModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[100] flex items-center justify-center p-4"
					>
						<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setUploadModal(false)} />
						<motion.div
							initial={{ opacity: 0, scale: 0.92 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.92 }}
							className="relative w-full max-w-md glass-card rounded-2xl border border-white/15 p-6 space-y-4 z-10"
						>
							<button onClick={() => setUploadModal(false)} className="absolute top-4 right-4 text-white/60 hover:text-white transition">
								<X size={20} />
							</button>
							<div className="space-y-2">
								<h3 className="text-lg font-semibold">Upload Photos</h3>
								<p className="text-sm text-white/70">Photos will be saved to the database</p>
							</div>
							<div
								className={`border-2 border-dashed rounded-xl p-8 text-center space-y-4 transition-colors ${
									dragActive ? "border-amber-300 bg-amber-300/10" : "border-white/20 hover:border-white/40"
								}`}
								onDragEnter={handleDrag}
								onDragLeave={handleDrag}
								onDragOver={handleDrag}
								onDrop={handleDrop}
							>
								<Upload size={32} className="mx-auto text-white/40" />
								<div>
									<p className="text-sm font-semibold text-white mb-1">Drop files here or click to browse</p>
									<p className="text-xs text-white/60">PNG, JPG, GIF up to 10MB each</p>
								</div>
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									disabled={uploading}
									className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition disabled:opacity-50"
								>
									{uploading ? (
										<span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Uploading...</span>
									) : "Choose Files"}
								</button>
								<input
									ref={fileInputRef}
									type="file"
									multiple
									accept="image/*"
									onChange={(e) => handleFileSelect(e.target.files)}
									className="hidden"
								/>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* ═══ Placement Popup ═══ */}
			<AnimatePresence>
				{placementModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[100] flex items-center justify-center p-4"
					>
						<div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPlacementModal(null)} />
						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.92, y: 20 }}
							className="relative w-full max-w-lg glass-card rounded-2xl border border-white/15 p-6 space-y-5 z-10 max-h-[85vh] overflow-y-auto"
						>
							<button onClick={() => setPlacementModal(null)} className="absolute top-4 right-4 text-white/60 hover:text-white transition">
								<X size={20} />
							</button>

							<div className="space-y-2">
								<h3 className="text-lg font-semibold">Assign Image to Page</h3>
								<p className="text-sm text-white/70">Choose where this image should appear on the website</p>
							</div>

							{/* Preview */}
							<div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
								<img src={placementModal.url} alt={placementModal.title} className="w-16 h-16 object-cover rounded-lg" />
								<div>
									<p className="text-sm font-semibold">{placementModal.title}</p>
									{placementModal.placement && (
										<p className="text-xs text-emerald-300">Currently: {getSlotLabel(placementModal.placement)}</p>
									)}
								</div>
							</div>

							{/* Step 1: Select Page */}
							<div className="space-y-2">
								<label className="text-xs uppercase tracking-wider text-white/60 font-semibold">1. Select Page</label>
								<div className="grid grid-cols-2 gap-2">
									{pages.map((p) => (
										<button
											key={p.value}
											onClick={() => { setSelectedPage(p.value); setSelectedSection(""); setSelectedSlot(null); }}
											className={`p-3 rounded-xl border text-sm font-semibold text-left transition ${
												selectedPage === p.value
													? "border-amber-300/50 bg-amber-400/15 text-amber-200"
													: "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
											}`}
										>
											<span className="flex items-center justify-between">
												{p.label}
												{selectedPage === p.value && <ChevronRight size={14} />}
											</span>
										</button>
									))}
								</div>
							</div>

							{/* Step 2: Select Section */}
							{selectedPage && sections.length > 0 && (
								<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
									<label className="text-xs uppercase tracking-wider text-white/60 font-semibold">2. Select Section</label>
									<div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
										{sections.map((s) => (
											<button
												key={s.value}
												onClick={() => { setSelectedSection(s.value); setSelectedSlot(null); }}
												className={`p-3 rounded-xl border text-sm font-semibold text-left transition ${
													selectedSection === s.value
														? "border-amber-300/50 bg-amber-400/15 text-amber-200"
														: "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
												}`}
											>
												{s.label}
											</button>
										))}
									</div>
								</motion.div>
							)}

							{/* Step 3: Select Slot */}
							{selectedSection && slots.length > 0 && (
								<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
									<label className="text-xs uppercase tracking-wider text-white/60 font-semibold">3. Select Image Slot</label>
									<div className="grid grid-cols-3 gap-2">
										{slots.map((s) => {
											const taken = isSlotTaken(s.page, s.section, s.slot);
											const takenImage = taken ? images.find(img => img.placement === makePlacementKey(s.page, s.section, s.slot)) : null;
											return (
												<button
													key={s.slot}
													onClick={() => setSelectedSlot(s.slot)}
													className={`relative p-3 rounded-xl border text-center transition ${
														selectedSlot === s.slot
															? "border-emerald-300/50 bg-emerald-400/15"
															: taken
															? "border-orange-400/30 bg-orange-400/10"
															: "border-white/10 bg-white/5 hover:bg-white/10"
													}`}
												>
													{takenImage ? (
														<img src={takenImage.url} alt="" className="w-full h-12 object-cover rounded-lg mb-1" />
													) : (
														<div className="w-full h-12 rounded-lg bg-white/10 grid place-items-center mb-1">
															<ImageIcon size={16} className="text-white/30" />
														</div>
													)}
													<p className="text-xs font-semibold text-white/70">Slot {s.slot + 1}</p>
													{taken && <p className="text-[10px] text-orange-300">Will replace</p>}
												</button>
											);
										})}
									</div>
								</motion.div>
							)}

							{/* Confirm */}
							{selectedSlot !== null && (
								<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
									<button
										onClick={handleAssignPlacement}
										disabled={assigning}
										className="w-full rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-300 py-2.5 text-sm font-semibold text-black shadow-lg hover:shadow-xl transition disabled:opacity-50"
									>
										{assigning ? (
											<span className="flex items-center justify-center gap-2"><Loader2 size={14} className="animate-spin" /> Assigning...</span>
										) : (
											<span className="flex items-center justify-center gap-2"><Check size={14} /> Assign to {getSlotLabel(makePlacementKey(selectedPage, selectedSection, selectedSlot))}</span>
										)}
									</button>
								</motion.div>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default AdminGallery;

