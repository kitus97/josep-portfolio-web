"use client";

import { useAudio } from "@/lib/AudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

export function AudioPlayer() {
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
        setVolume
    } = useAudio();

    if (!currentTrack) return null;

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 w-full"
            >
                <div className="bg-background/80 backdrop-blur-md border-t border-surface-light px-4 py-3 md:px-6 md:py-4">
                    {/* Main Container - Stack on mobile, row on desktop */}
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">

                        {/* Top Row (Mobile) / Left Column (Desktop) - Track Info */}
                        <div className="flex items-center justify-between w-full md:w-1/4 md:min-w-[200px]">
                            <div className="flex items-center gap-3 md:gap-4">
                                <Image src={currentTrack.cover} alt={currentTrack.title} width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 rounded-md object-cover" />
                                <div className="overflow-hidden">
                                    <h4 className="font-bold text-sm truncate">{currentTrack.title}</h4>
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-foreground-muted truncate">{currentTrack.artist}</p>
                                        {/* BPM / Key - hidden on mobile to save space, visible on large screens */}
                                        <span className="hidden lg:inline-flex text-[10px] items-center text-accent/80 font-mono">
                                            • {currentTrack.bpm} BPM • Key {currentTrack.key}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Play/Pause Button - shown inline on mobile next to track info for compactness */}
                            <div className="flex md:hidden items-center ml-2">
                                <button onClick={skipBackward} className="p-2 text-foreground-muted hover:text-white transition-colors">
                                    <SkipBack className="w-5 h-5 fill-current" />
                                </button>
                                <button
                                    onClick={togglePlayPause}
                                    className="w-11 h-11 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center transition-transform hover:scale-105 mx-1"
                                >
                                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                                </button>
                                <button onClick={skipForward} className="p-2 text-foreground-muted hover:text-white transition-colors">
                                    <SkipForward className="w-5 h-5 fill-current" />
                                </button>
                            </div>
                        </div>

                        {/* Middle Column - Player Controls & Scrub Bar */}
                        <div className="flex flex-col items-center w-full md:w-2/4 max-w-xl">
                            {/* Desktop Controls - Hidden on mobile, shown on md+ */}
                            <div className="hidden md:flex items-center gap-6 mb-2">
                                <button onClick={skipBackward} className="text-foreground-muted hover:text-white transition-colors w-11 h-11 flex items-center justify-center">
                                    <SkipBack className="w-5 h-5 fill-current" />
                                </button>
                                <button
                                    onClick={togglePlayPause}
                                    className="w-11 h-11 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center transition-transform hover:scale-105"
                                >
                                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
                                </button>
                                <button onClick={skipForward} className="text-foreground-muted hover:text-white transition-colors w-11 h-11 flex items-center justify-center">
                                    <SkipForward className="w-5 h-5 fill-current" />
                                </button>
                            </div>

                            {/* Scrub Bar - Full width on all devices */}
                            <div className="flex items-center gap-2 md:gap-3 w-full text-[10px] md:text-xs text-foreground-muted font-mono">
                                <span className="w-8 text-right min-w-max">{formatTime(progress)}</span>
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 100}
                                    value={progress}
                                    onChange={(e) => seek(Number(e.target.value))}
                                    className="flex-1 h-1.5 md:h-1 bg-surface-light rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full cursor-pointer accent-accent"
                                />
                                <span className="w-8 min-w-max">{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Right Column - Volume Control (Hidden on mobile) */}
                        <div className="hidden md:flex items-center gap-3 w-1/4 justify-end min-w-[150px]">
                            <button
                                onClick={() => setVolume(volume === 0 ? 1 : 0)}
                                className="text-foreground-muted hover:text-white transition-colors w-11 h-11 flex items-center justify-center"
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
                                className="w-24 h-1 bg-surface-light rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer accent-white"
                            />
                        </div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>

    );
}
