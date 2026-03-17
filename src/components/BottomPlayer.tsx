"use client";

import { useAudio } from "@/lib/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

export function BottomPlayer() {
    const {
        currentTrack,
        isPlaying,
        togglePlayPause,
        skipForward,
        skipBackward,
        progress,
        duration,
        seek,
        volume,
        setVolume,
    } = useAudio();

    if (!currentTrack) return null;

    const formatTime = (time: number) => {
        if (isNaN(time) || time < 0) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const accent = "#8b5cf6";
    const progressPercent =
        duration > 0 ? Math.max(0, Math.min(100, (progress / duration) * 100)) : 0;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 110, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 110, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 w-full"
            >
                <div className="border-t border-white/10 bg-black/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
                    {/* Mobile Progress Bar (Top edge) */}
                    <div className="block md:hidden h-[2px] w-full bg-white/10 relative">
                        <div
                            className="absolute top-0 left-0 h-full"
                            style={{
                                width: `${progressPercent}%`,
                                backgroundColor: accent,
                                boxShadow: `0 0 10px ${accent}80`,
                            }}
                        />
                    </div>

                    {/* Desktop Thin purple line at the top */}
                    <div
                        className="hidden md:block h-[2px] w-full"
                        style={{ backgroundColor: accent, boxShadow: `0 0 16px ${accent}80` }}
                    />

                    {/* Main Bar */}
                    <div className="h-20 md:h-[90px] px-4 md:px-8">
                        {/* Mobile Layout (below md) */}
                        <div className="flex md:hidden items-center justify-between h-full gap-4">
                            {/* Left: Track info */}
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0 bg-white/5 border border-white/10">
                                    {currentTrack.coverArtUrl ? (
                                        <Image src={currentTrack.coverArtUrl} alt={currentTrack.title} fill sizes="48px" className="object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 bg-white/5" />
                                    )}
                                </div>
                                <div className="min-w-0 flex flex-col justify-center">
                                    <div className="text-sm font-semibold truncate text-white">{currentTrack.title}</div>
                                    <div className="text-xs truncate font-medium text-white/70">{currentTrack.artist}</div>
                                </div>
                            </div>

                            {/* Right: Controls */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={skipBackward} className="text-white/70 hover:text-white transition-colors w-11 h-11 flex items-center justify-center" aria-label="Previous track">
                                    <SkipBack className="w-5 h-5 fill-current" />
                                </button>
                                <button onClick={togglePlayPause} className="w-12 h-12 rounded-full text-white flex items-center justify-center transition-transform active:scale-95" style={{ backgroundColor: accent, boxShadow: `0 0 22px ${accent}66` }} aria-label={isPlaying ? "Pause" : "Play"}>
                                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                                </button>
                                <button onClick={skipForward} className="text-white/70 hover:text-white transition-colors w-11 h-11 flex items-center justify-center" aria-label="Next track">
                                    <SkipForward className="w-5 h-5 fill-current" />
                                </button>
                            </div>
                        </div>

                        {/* Desktop Layout (md and up) */}
                        <div className="hidden md:grid max-w-7xl mx-auto h-full grid-cols-12 items-center gap-4">
                            {/* Left: Track info */}
                            <div className="col-span-4 flex items-center gap-3 min-w-0">
                                <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0 bg-white/5 border border-white/10">
                                    {currentTrack.coverArtUrl ? (
                                        <Image
                                            src={currentTrack.coverArtUrl}
                                            alt={currentTrack.title}
                                            fill
                                            sizes="56px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-white/5" />
                                    )}
                                </div>
                                <div className="min-w-0 flex flex-col justify-center">
                                    <div className="text-sm font-semibold truncate" style={{ color: accent }}>
                                        {currentTrack.title}
                                    </div>
                                    <div className="text-xs truncate font-medium" style={{ color: accent, opacity: 0.85 }}>
                                        {currentTrack.artist}
                                    </div>
                                </div>
                            </div>

                            {/* Center: Controls + Desktop Progress */}
                            <div className="col-span-5 flex flex-col items-center justify-center gap-2 w-full max-w-2xl mx-auto">
                                <div className="flex items-center gap-8">
                                    <button
                                        onClick={skipBackward}
                                        className="text-white/70 hover:text-white transition-colors w-11 h-11 flex items-center justify-center"
                                        aria-label="Previous track"
                                    >
                                        <SkipBack className="w-5 h-5 fill-current" />
                                    </button>

                                    <button
                                        onClick={togglePlayPause}
                                        className="w-12 h-12 rounded-full text-white flex items-center justify-center transition-transform hover:scale-105"
                                        style={{ backgroundColor: accent, boxShadow: `0 0 22px ${accent}66` }}
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-5 h-5 fill-current" />
                                        ) : (
                                            <Play className="w-5 h-5 fill-current ml-0.5" />
                                        )}
                                    </button>

                                    <button
                                        onClick={skipForward}
                                        className="text-white/70 hover:text-white transition-colors w-11 h-11 flex items-center justify-center"
                                        aria-label="Next track"
                                    >
                                        <SkipForward className="w-5 h-5 fill-current" />
                                    </button>
                                </div>

                                {/* Desktop Progress Bar */}
                                <div className="w-full flex items-center gap-3 text-[11px] text-white/60 font-mono">
                                    <span className="w-10 text-right tabular-nums">{formatTime(progress)}</span>
                                    <div
                                        className="relative flex-1 h-[6px] rounded-full bg-white/15 cursor-pointer group"
                                        onClick={(e) => {
                                            if (!duration) return;
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                                            seek(ratio * duration);
                                        }}
                                        aria-label="Seek"
                                    >
                                        <div
                                            className="absolute inset-y-0 left-0 rounded-full"
                                            style={{
                                                width: `${progressPercent}%`,
                                                backgroundColor: accent,
                                                boxShadow: `0 0 14px ${accent}55`,
                                            }}
                                        />
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            style={{
                                                left: `calc(${progressPercent}% - 6px)`,
                                                boxShadow: `0 0 10px ${accent}80`,
                                            }}
                                        />
                                    </div>
                                    <span className="w-10 tabular-nums">{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Right: Volume + mute (Desktop only) */}
                            <div className="col-span-3 flex items-center justify-end gap-3">
                                <button
                                    onClick={() => setVolume(volume === 0 ? 1 : 0)}
                                    className="text-white/70 hover:text-white transition-colors w-11 h-11 flex items-center justify-center"
                                    aria-label={volume === 0 ? "Unmute" : "Mute"}
                                >
                                    {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                </button>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={volume}
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                    className="w-28 h-1.5 rounded-full appearance-none cursor-pointer bg-white/15 accent-[#8b5cf6] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8b5cf6]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}