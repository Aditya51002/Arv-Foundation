import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Calendar, Image as ImageIcon, Loader2 } from "lucide-react";
import { fetchAllImages } from "../utils/imageApi.js";

const Gallery = () => {
	const [images, setImages] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);
	const [filter, setFilter] = useState("all");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchAllImages()
			.then(setImages)
			.catch(() => setImages([]))
			.finally(() => setLoading(false));
	}, []);

	const categories = ["all", ...new Set(images.map(img => {
		// Extract category from filename or use default
		const category = img.filename?.split('_')[0] || "general";
		return category.toLowerCase();
	}))];

	const filteredImages = filter === "all" 
		? images 
		: images.filter(img => {
			const category = img.filename?.split('_')[0] || "general";
			return category.toLowerCase() === filter;
		});

	const openModal = (image) => {
		setSelectedImage(image);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setSelectedImage(null);
		document.body.style.overflow = "";
	};

	if (loading) {
		return (
			<section className="section-shell py-16" aria-label="Photo Gallery">
				<div className="max-w-6xl mx-auto text-center py-12">
					<Loader2 size={36} className="mx-auto text-white/40 animate-spin mb-4" />
					<p className="text-white/60">Loading gallery…</p>
				</div>
			</section>
		);
	}

	if (images.length === 0) {
		return (
			<section className="section-shell py-16" aria-label="Photo Gallery">
				<div className="max-w-6xl mx-auto text-center">
					<h2 className="text-2xl font-semibold mb-6">Photo Gallery</h2>
					<div className="py-12">
						<ImageIcon size={48} className="mx-auto text-white/30 mb-4" />
						<p className="text-white/60">Gallery coming soon...</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<>
			<section className="section-shell py-16" aria-label="Photo Gallery">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl font-semibold mb-8 text-center">Photo Gallery</h2>
					
					{/* Filter buttons */}
					{categories.length > 1 && (
						<div className="flex flex-wrap justify-center gap-3 mb-8">
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setFilter(category)}
									className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
										filter === category
											? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
											: "bg-white/10 text-white/70 border border-white/15 hover:bg-white/15 hover:text-white"
									}`}
								>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</button>
							))}
						</div>
					)}

					{/* Gallery grid */}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{filteredImages.map((image, index) => (
							<motion.div
								key={image.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="group relative cursor-pointer"
								onClick={() => openModal(image)}
							>
								<div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-emerald-400/20 via-amber-300/20 to-white/5">
									<img
										src={image.url}
										alt={image.title}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
										<ZoomIn 
											size={24} 
											className="text-white opacity-0 group-hover:opacity-100 transition-opacity" 
										/>
									</div>
								</div>
								<div className="mt-2">
									<p className="text-sm font-semibold text-white truncate">{image.title}</p>
									<p className="text-xs text-white/60">
										{new Date(image.uploadedAt).toLocaleDateString()}
									</p>
								</div>
							</motion.div>
						))}
					</div>

					{filteredImages.length === 0 && filter !== "all" && (
						<div className="text-center py-12">
							<p className="text-white/60">No images found for "{filter}" category</p>
						</div>
					)}
				</div>
			</section>

			{/* Modal */}
			<AnimatePresence>
				{selectedImage && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[200] flex items-center justify-center p-4"
						onClick={closeModal}
					>
						<motion.div
							initial={{ backdropFilter: "blur(0px)" }}
							animate={{ backdropFilter: "blur(8px)" }}
							exit={{ backdropFilter: "blur(0px)" }}
							className="absolute inset-0 bg-black/80"
						/>

						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={closeModal}
								className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
							>
								<X size={20} />
							</button>

							<img
								src={selectedImage.url}
								alt={selectedImage.title}
								className="w-full h-full object-contain"
							/>

							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
								<h3 className="text-lg font-semibold text-white mb-1">
									{selectedImage.title}
								</h3>
								<div className="flex items-center gap-2 text-sm text-white/70">
									<Calendar size={14} />
									<span>{new Date(selectedImage.uploadedAt).toLocaleDateString()}</span>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Gallery;