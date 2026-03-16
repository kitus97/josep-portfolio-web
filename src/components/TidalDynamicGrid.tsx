"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

// Easily paste Track IDs or full Tidal URLs here
const TRACK_LIST = [
    "501330996",
    "501330997",
    "501330998",
    "501330999",
    "501331000",
];

// Helper to extract Tidal ID from numbers or URLs
export function extractTidalId(input: string): string {
    if (/^\d+$/.test(input)) return input;

    try {
        const url = new URL(input);
        const parts = url.pathname.split('/');
        const lastPart = parts[parts.length - 1];
        if (/^\d+$/.test(lastPart)) return lastPart;
    } catch (e) {
        // Not a valid URL, ignore
    }
    return input;
}

interface TidalDynamicGridProps {
    trackIds?: string[];
}

export function TidalDynamicGrid({ trackIds = TRACK_LIST }: TidalDynamicGridProps) {
    const [isClient, setIsClient] = useState(false);
    const [highlightAll, setHighlightAll] = useState(false);
    const controls = useAnimationControls();

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Listen for highlight event from Hero
    useEffect(() => {
        const handleHighlight = () => {
            setHighlightAll(true);
            controls.start({
                scale: [1, 1.04, 1, 1.04, 1, 1.04, 1],
                transition: { duration: 2.4, ease: "easeInOut" },
            });
            setTimeout(() => setHighlightAll(false), 3000);
        };

        window.addEventListener("highlight-first-track", handleHighlight);
        return () => window.removeEventListener("highlight-first-track", handleHighlight);
    }, [controls]);

    const processedIds = trackIds.map(extractTidalId).filter(Boolean);

    if (!isClient) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
                <p className="text-accent font-mono text-sm">Loading tracks...</p>
            </div>
        );
    }

    if (processedIds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[300px] border border-dashed border-accent/20 rounded-xl">
                <p className="text-foreground-muted font-mono text-sm">No tracks provided.</p>
            </div>
        );
    }

    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6 md:mx-0 md:px-0 hide-scrollbar scroll-smooth">
            {processedIds.map((trackId, i) => (
                <motion.div
                    key={`${trackId}-${i}`}
                    animate={controls}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`snap-center shrink-0 w-[280px] sm:w-[340px] h-[140px] relative group rounded-[12px] overflow-hidden border-2 transition-all duration-300
                            ${highlightAll
                            ? 'border-accent shadow-[0_0_25px_var(--color-accent),0_0_50px_var(--color-accent)]'
                            : 'border-accent/20 hover:border-accent shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                        }`}
                >
                    {/* Track Number Badge */}
                    <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-md px-2 py-1 flex items-center justify-center rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-2 group-hover:translate-y-0">
                        <span className="text-[10px] font-mono font-bold text-accent tracking-widest">
                            #{(i + 1).toString().padStart(2, '0')}
                        </span>
                    </div>

                    <iframe
                        src={`https://embed.tidal.com/tracks/${trackId}?layout=gridplayer&theme=dark`}
                        width="100%"
                        height="100%"
                        allow="encrypted-media; fullscreen; clipboard-write https://embed.tidal.com; web-share"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: "light dark" }}
                        title={`TIDAL Embed Player ${i + 1}`}
                    />
                </motion.div>
            ))}
        </div>
    );
}

