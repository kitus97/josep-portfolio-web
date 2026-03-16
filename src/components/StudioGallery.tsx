"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const studioImages = [
    { id: 1, src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200", alt: "Large mixing console in a studio" }, // Mixing Console
    { id: 2, src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1200", alt: "Studio monitor speakers" }, // Monitor Speakers
    { id: 3, src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=1200", alt: "Artist in a recording booth" }, // Recording Booth
    { id: 4, src: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200", alt: "Vintage synthesizer close up" }, // Synthesizer
];

export function StudioGallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (selectedImage) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedImage]);

    return (
        <section className="py-24 px-6 md:px-12 max-w-[100vw] overflow-hidden bg-background">
            <div className="max-w-7xl mx-auto mb-12">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
                    Studio Vibe
                </h2>
                <p className="text-sm font-mono text-accent mt-2 tracking-widest uppercase">The Workspace</p>
            </div>

            {/* Horizontal Scroll Snap Container for Mobile -> Grid for Desktop */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 md:grid md:grid-cols-4 md:snap-none md:overflow-visible no-scrollbar px-6 max-w-7xl mx-auto -mx-6 md:mx-auto">
                {studioImages.map((img, i) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="flex-none w-[85vw] sm:w-[50vw] md:w-full snap-center md:snap-align-none aspect-square md:aspect-[3/4] relative cursor-pointer group overflow-hidden rounded-xl border border-surface-light hover:border-accent/40 transition-colors"
                        onClick={() => setSelectedImage(img.src)}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            sizes="(max-width: 768px) 85vw, 25vw"
                        />
                        {/* Elegant dark overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />

                        {/* Magnify hint on desktop */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
                            <div className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono font-bold tracking-widest uppercase border border-surface-light">
                                Enlarge
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 p-4 rounded-full bg-surface-light hover:bg-accent hover:text-white transition-colors duration-300 z-[101]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl aspect-video md:aspect-auto md:h-[85vh] rounded-2xl overflow-hidden shadow-2xl shadow-accent/20 cursor-default"
                            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking the image itself
                        >
                            <Image
                                src={selectedImage}
                                alt="Enlarged studio view"
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
