"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const FALLBACK_IMAGES = [
    { src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200", alt: "Studio 1" },
    { src: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1200", alt: "Studio 2" },
    { src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=1200", alt: "Studio 3" },
    { src: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=1200", alt: "Studio 4" },
];

interface StudioImage { src: string; alt: string; }
interface StudioGalleryProps { images?: StudioImage[]; }

export function StudioGallery({ images = FALLBACK_IMAGES }: StudioGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Configuració Embla amb Autoplay
    const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
        Autoplay({ delay: 4000, stopOnInteraction: false })
    ]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            document.body.style.overflow = selectedImage ? "hidden" : "auto";
        }
    }, [selectedImage]);

    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto mb-12 px-6 md:px-12">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Studio Vibe</h2>
                <p className="text-sm font-mono text-accent mt-2 tracking-widest uppercase">The Workspace</p>
            </div>

            {/* Carousel Container */}
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex -ml-4">
                    {images.map((img, i) => (
                        <div key={i} className="flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_30%] pl-4 min-w-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="aspect-[3/4] relative rounded-xl overflow-hidden border border-surface-light group"
                                onClick={() => setSelectedImage(img.src)}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 70vw, 30vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal (Es manté igual) */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-6 right-6 p-4 rounded-full bg-white/10 hover:bg-accent text-white transition-colors z-[101]">
                            <X className="w-6 h-6" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="relative w-full max-w-6xl h-[80vh]"
                        >
                            <Image src={selectedImage} alt="Studio view" fill className="object-contain" priority />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}