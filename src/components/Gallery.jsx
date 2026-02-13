import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ZoomIn, Loader2 } from "lucide-react";
import { fetchAllPlacedImages } from "../utils/imageApi.js"; 

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllPlacedImages() 
            .then((data) => setImages(Array.isArray(data) ? data : []))
            .catch(() => setImages([]))
            .finally(() => setLoading(false));
    }, []);

    const categories = ["all", ...new Set(images.map(img => img.placement?.split(':')[0]?.toLowerCase() || "general"))];

    const filtered = filter === "all" ? images : images.filter(img => img.placement?.startsWith(filter));

    if (loading) return <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-amber-400" /></div>;

    return (
        <section className="section-shell py-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Impact Gallery</h2>
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
                {categories.map(cat => (
                    <button key={cat} onClick={() => setFilter(cat)} 
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition ${filter === cat ? "bg-amber-400 text-black" : "bg-white/5 text-white/50 border border-white/5"}`}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filtered.map((img) => (
                    <motion.div key={img._id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group bg-neutral-900 border border-white/10"
                    >
                        <img src={img.url} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt="" />
                        
                        {/* THE FIX: Removed opacity-0 so text shows EVERYTIME */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4">
                            {/* We show ONLY the placement label, no 'Screenshot' title */}
                            <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                                {img.placement?.split(':')[1]?.replace(/-/g, ' ') || "OLD AGE HOME"}
                            </p>
                            
                            {/* Zoom icon still only shows on hover for a clean look */}
                            <div className="absolute top-4 right-4 p-2 bg-white/10 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ZoomIn size={14} className="text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;