"use client";

import type { Track } from "@/lib/sanity.queries";
import { useAudio } from "@/lib/AudioContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

type AudioPlayerCardProps = {
    track: Track;
    priority?: boolean;
};

export function AudioPlayerCard({ track, priority }: AudioPlayerCardProps) {
    const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();

    const isCurrent = currentTrack?._id === track._id;
    const isActive = isCurrent && isPlaying;
    const canPlay = Boolean(track.audioUrl);

    const handleToggle = () => {
        if (!canPlay) return;
        if (isCurrent) togglePlayPause();
        else playTrack(track);
    };

    return (
        <div className="group relative rounded-2xl overflow-hidden border border-surface-light bg-surface/30 shadow-[0_0_18px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[16/10] w-full">
                {track.coverArtUrl ? (
                    <Image
                        src={track.coverArtUrl}
                        alt={`${track.title} cover`}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 80vw, 420px"
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15)_0%,_rgba(0,0,0,0.8)_70%)]" />
                )}

                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute top-4 left-4">
                    <div
                        className={[
                            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase",
                            "border backdrop-blur-md",
                            isActive
                                ? "border-accent/40 bg-accent/15 text-accent shadow-[0_0_22px_rgba(139,92,246,0.35)]"
                                : "border-white/10 bg-black/40 text-foreground-muted",
                        ].join(" ")}
                    >
                        {!canPlay ? "Missing audio" : isActive ? "Now playing" : "Selected work"}
                    </div>
                </div>

                <div className="absolute right-4 bottom-4">
                    <motion.button
                        type="button"
                        onClick={handleToggle}
                        whileHover={{ scale: 1.06, rotate: isActive ? -2 : 2 }}
                        whileTap={{ scale: 0.96, rotate: 0 }}
                        className={[
                            "relative grid place-items-center w-12 h-12 rounded-full",
                            "border border-white/10 bg-black/55 backdrop-blur-md",
                            "transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0",
                            isActive
                                ? "text-accent shadow-[0_0_26px_rgba(139,92,246,0.45)]"
                                : canPlay
                                    ? "text-white hover:text-accent"
                                    : "text-foreground-muted/60 cursor-not-allowed",
                        ].join(" ")}
                        aria-label={isActive ? "Pause" : "Play"}
                        disabled={!canPlay}
                    >
                        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.22)_0%,_rgba(0,0,0,0)_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {isActive ? (
                            <Pause className="relative w-5 h-5 fill-current" />
                        ) : (
                            <Play className="relative w-5 h-5 fill-current ml-0.5" />
                        )}
                    </motion.button>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h3 className="text-base md:text-lg font-black tracking-tight truncate">
                            {track.title}
                        </h3>
                        <p className="mt-1 text-xs md:text-sm font-mono tracking-widest uppercase text-foreground-muted truncate">
                            {track.artist}
                        </p>
                    </div>
                </div>

                {track.authorComment ? (
                    <p className="mt-4 text-sm text-foreground-muted/90 leading-relaxed line-clamp-2">
                        {track.authorComment}
                    </p>
                ) : null}
            </div>
        </div>
    );
}

