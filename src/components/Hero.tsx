"use client";

import { motion } from "framer-motion";
import { Headphones } from "lucide-react";

export function Hero() {
    const handleScrollToTracks = () => {
        const target = document.getElementById("discography");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            // Fire highlight event after scroll settles
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent("highlight-first-track"));
            }, 800);
        }
    };

    return (
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--color-surface)_0%,_var(--color-background)_100%)]" />

            <div className="relative z-10 text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter"
                >
                    JOSEP
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="mt-4 text-foreground-muted text-sm md:text-xl font-mono tracking-widest uppercase"
                >
                    Sound Architect / Producer
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="mt-12"
                >
                    <button
                        onClick={handleScrollToTracks}
                        className="group flex items-center gap-3 mx-auto bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-accent/20"
                    >
                        <Headphones className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Listen to Latest Tracks
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
