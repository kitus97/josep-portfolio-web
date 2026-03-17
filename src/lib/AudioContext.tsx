"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
    type SyntheticEvent,
} from "react";
import ReactPlayer from "react-player";
import type { Track } from "./sanity.queries";

interface AudioContextType {
    queue: Track[];
    currentTrack: Track | null;
    isPlaying: boolean;
    progress: number;
    duration: number;
    volume: number;
    playTrack: (track: Track) => void;
    togglePlayPause: () => void;
    seek: (seconds: number) => void;
    skipForward: () => void;
    skipBackward: () => void;
    setVolume: (value: number) => void;
    setQueue: (tracks: Track[]) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const playerRef = useRef<HTMLVideoElement>(null);
    const [queue, setQueueState] = useState<Track[]>([]);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(1);

    const togglePlayPause = useCallback(() => {
        if (!currentTrack?.audioUrl) return;
        setIsPlaying((prev) => !prev);
    }, [currentTrack?.audioUrl]);

    const playTrack = useCallback((track: Track) => {
        if (!track.audioUrl) return;
        if (currentTrack?._id === track._id) {
            setIsPlaying((prev) => !prev);
            return;
        }
        setCurrentTrack(track);
        setProgress(0);
        setDuration(0);
        setIsPlaying(true);
    }, [currentTrack?._id]);

    const setQueue = useCallback((tracks: Track[]) => {
        const filtered = tracks.filter((t) => Boolean(t.audioUrl));
        setQueueState(filtered);
    }, []);

    const currentIndex = useMemo(() => {
        if (!currentTrack) return -1;
        return queue.findIndex((t) => t._id === currentTrack._id);
    }, [currentTrack, queue]);

    const skipForward = useCallback(() => {
        if (queue.length === 0) return;
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % queue.length : 0;
        const next = queue[nextIndex];
        if (next) playTrack(next);
    }, [currentIndex, playTrack, queue]);

    const skipBackward = useCallback(() => {
        if (queue.length === 0) return;
        const prevIndex =
            currentIndex >= 0 ? (currentIndex - 1 + queue.length) % queue.length : 0;
        const prev = queue[prevIndex];
        if (prev) playTrack(prev);
    }, [currentIndex, playTrack, queue]);

    const seek = useCallback((seconds: number) => {
        const max = Number.isFinite(duration) && duration > 0 ? duration : Infinity;
        const clamped = Math.max(0, Math.min(seconds, max));
        if (playerRef.current && Number.isFinite(clamped)) {
            playerRef.current.currentTime = clamped;
        }
        if (Number.isFinite(clamped)) setProgress(clamped);
    }, [duration]);

    const setVolume = useCallback((value: number) => {
        const next = Math.max(0, Math.min(1, value));
        setVolumeState(next);
    }, []);

    const handleTimeUpdate = useCallback((e: SyntheticEvent<HTMLVideoElement>) => {
        const t = e.currentTarget.currentTime;
        if (Number.isFinite(t)) setProgress(t);
    }, []);

    const handleDurationChange = useCallback((e: SyntheticEvent<HTMLVideoElement>) => {
        const d = e.currentTarget.duration;
        if (Number.isFinite(d)) setDuration(d);
    }, []);

    const handleLoadedMetadata = useCallback((e: SyntheticEvent<HTMLVideoElement>) => {
        const d = e.currentTarget.duration;
        if (Number.isFinite(d)) setDuration(d);
    }, []);

    const handleEnded = useCallback(() => {
        if (queue.length > 0) skipForward();
        else setIsPlaying(false);
    }, [queue.length, skipForward]);

    const ctxValue = useMemo<AudioContextType>(() => ({
        queue,
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        playTrack,
        togglePlayPause,
        seek,
        skipForward,
        skipBackward,
        setVolume,
        setQueue,
    }), [
        currentTrack,
        duration,
        isPlaying,
        playTrack,
        progress,
        queue,
        seek,
        setQueue,
        setVolume,
        skipBackward,
        skipForward,
        togglePlayPause,
        volume,
    ]);

    return (
        <AudioContext.Provider value={ctxValue}>
            {children}
            <ReactPlayer
                ref={playerRef}
                src={currentTrack?.audioUrl}
                playing={Boolean(currentTrack?.audioUrl) && isPlaying}
                volume={volume}
                height={0}
                width={0}
                style={{ display: "none" }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleEnded}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                onLoadedMetadata={handleLoadedMetadata}
                onError={() => {
                    console.error("ReactPlayer error", currentTrack?.audioUrl);
                    setIsPlaying(false);
                }}
            />
        </AudioContext.Provider>
    );
}

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};
