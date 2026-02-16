import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Trash2, MapPin, Loader2, Unlink } from "lucide-react";
import AdminLayout from "../../components/AdminLayout.jsx";

// API & Utilities
import { fetchAllImages, uploadImages, deleteImage, assignImagePlacement } from "../../utils/imageApi.js";
import { getPages, getSections, getSlots, makePlacementKey, getSlotLabel } from "../../data/imageSlots.js";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

const AdminGallery = ({ onLogout }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadModal, setUploadModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null); // Reference for the hidden file input

    // Placement States
    const [placementModal, setPlacementModal] = useState(null);
    const [selectedPage, setSelectedPage] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [assigning, setAssigning] = useState(false);

    const loadImages = async () => {
        try {
            setLoading(true);
            const data = await fetchAllImages();
            setImages(Array.isArray(data) ? data : []);
        } catch (err) { setImages([]); }
        finally { setLoading(false); }
    };

    useEffect(() => { loadImages(); }, []);

    // --- UPLOAD HANDLERS ---
    const handleFileSelect = async (files) => {
        if (!files || files.length === 0) return;
        
        const validFiles = Array.from(files).filter(file => file.size <= MAX_FILE_SIZE);
        if (validFiles.length === 0) return alert("Files must be under 10MB");

        setUploading(true);
        try {
            const imageDataPromises = validFiles.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({
                            url: reader.result, // Base64 for the API
                            filename: file.name,
                            size: file.size,
                            title: file.name.replace(/\.[^/.]+$/, "")
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
            alert("Upload failed: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleAssignPlacement = async () => {
        if (!placementModal?._id || !selectedPage || !selectedSection || !selectedSlot) {
            return alert("Please select Page, Section, and Slot.");
        }

        setAssigning(true);
        try {
            const slotValue = typeof selectedSlot === 'object' ? selectedSlot.slot : selectedSlot;
            const placementKey = makePlacementKey(selectedPage, selectedSection, slotValue);
            
            await assignImagePlacement(placementModal._id, placementKey);
            setPlacementModal(null);
            await loadImages(); 
        } catch (err) {
            alert("Failed: " + err.message);
        } finally {
            setAssigning(false);
        }
    };

    const pages = getPages() || [];
    const sections = selectedPage ? (getSections(selectedPage) || []) : [];
    const slots = (selectedPage && selectedSection) ? (getSlots(selectedPage, selectedSection) || []) : [];

    const isSlotTaken = (p, s, sl) => {
        const slVal = typeof sl === 'object' ? sl.slot : sl;
        const key = makePlacementKey(p, s, slVal);
        return images.some(img => img.placement === key && img._id !== placementModal?._id);
    };

    return (
        <AdminLayout title="Gallery Admin" onLogout={onLogout}>
            {/* Hidden Input for File Selection */}
            <input 
                type="file" 
                ref={fileInputRef} 
                hidden 
                multiple 
                accept="image/*" 
                onChange={(e) => handleFileSelect(e.target.files)} 
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <p className="text-sm text-white/50">{images.length} Images Found</p>
                <button 
                    onClick={() => setUploadModal(true)} 
                    className="bg-amber-400 px-5 py-2.5 sm:py-2 rounded-xl text-black font-bold text-sm hover:bg-amber-300 transition w-full sm:w-auto"
                >
                    Upload New
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-amber-400" /></div>
            ) : (
                <div className="gallery-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {images.map((image) => (
                        <div key={image._id} className="gallery-card glass-card p-2 sm:p-3 border border-white/10 rounded-2xl group h-full">
                            <div className="relative h-[140px] sm:h-[200px] w-full mb-2 sm:mb-3 overflow-hidden rounded-xl bg-neutral-900">
                                <img src={image.url} className="gallery-card-image h-full w-full object-cover" alt="" />
                                {image.placement && (
                                    <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                                        <MapPin size={10} /> 
                                        <span className="capitalize">{getSlotLabel(image.placement).replace(/\[object Object\]/g, '').replace(/-/g, ' ')}</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => { setPlacementModal(image); setSelectedPage(""); setSelectedSection(""); setSelectedSlot(null); }}
                                    className="flex-1 bg-white/10 text-white text-[10px] py-1.5 rounded-lg hover:bg-white/20">Assign</button>
                                <button onClick={() => deleteImage(image._id).then(loadImages)} className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- UPLOAD MODAL --- */}
            <AnimatePresence>
                {uploadModal && (
                    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card w-full sm:max-w-md p-6 rounded-t-3xl sm:rounded-3xl border border-white/10">
                            <div className="flex justify-between mb-6">
                                <h3 className="font-bold text-xl text-white">Upload Photos</h3>
                                <button onClick={() => setUploadModal(false)} className="text-white/40 hover:text-white"><X size={24} /></button>
                            </div>
                            
                            <div 
                                onClick={() => fileInputRef.current.click()}
                                className="border-2 border-dashed border-white/10 rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group"
                            >
                                {uploading ? (
                                    <Loader2 className="animate-spin text-amber-400 mb-4" size={40} />
                                ) : (
                                    <Upload className="text-white/20 group-hover:text-amber-400 transition-colors mb-4" size={40} />
                                )}
                                <p className="text-sm text-white/60 font-medium">
                                    {uploading ? "Uploading to Server..." : "Click to browse images"}
                                </p>
                                <p className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">Max 10MB per file</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- PLACEMENT MODAL --- */}
            <AnimatePresence>
                {placementModal && (
                    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card w-full sm:max-w-md p-5 sm:p-6 border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-white">Assign Placement</h3>
                                <button onClick={() => setPlacementModal(null)}><X size={20}/></button>
                            </div>

                            <div className="space-y-4">
                                <select value={selectedPage} onChange={(e) => {setSelectedPage(e.target.value); setSelectedSection(""); setSelectedSlot(null);}} className="w-full bg-neutral-900 border border-white/10 p-3 rounded-xl text-white text-sm appearance-none">
                                    <option value="">Select Page</option>
                                    {pages.map(p => <option key={p.value || p} value={p.value || p}>{p.label || p}</option>)}
                                </select>

                                {selectedPage && (
                                    <select value={selectedSection} onChange={(e) => {setSelectedSection(e.target.value); setSelectedSlot(null);}} className="w-full bg-neutral-900 border border-white/10 p-3 rounded-xl text-white text-sm appearance-none">
                                        <option value="">Select Section</option>
                                        {sections.map(s => <option key={s.value || s} value={s.value || s}>{s.label || s}</option>)}
                                    </select>
                                )}

                                {selectedSection && (
                                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                                        {(slots || []).map(s => {
                                            const val = s.slot || s; 
                                            const lbl = s.label || s;
                                            const taken = isSlotTaken(selectedPage, selectedSection, val);
                                            return (
                                                <button 
                                                    key={val} 
                                                    disabled={taken} 
                                                    onClick={() => setSelectedSlot(val)}
                                                    className={`p-2 rounded-lg text-xs border transition-all ${
                                                        selectedSlot === val 
                                                        ? "bg-amber-400 text-black border-amber-400 font-bold" 
                                                        : "bg-white/5 text-white/50 border-white/10 hover:border-white/30"
                                                    } ${taken ? "opacity-20 cursor-not-allowed" : ""}`}
                                                >
                                                    {lbl} {taken && "(In Use)"}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                <button onClick={handleAssignPlacement} disabled={assigning || !selectedSlot} className="w-full bg-amber-400 text-black py-4 rounded-2xl font-bold disabled:opacity-30 mt-2 transition-all active:scale-95">
                                    {assigning ? "Publishing..." : "Assign & Publish"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
};

export default AdminGallery;
