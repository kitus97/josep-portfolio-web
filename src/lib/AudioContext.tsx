"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { Track } from './data';
import { tracks } from './data';

interface AudioContextType {
    currentTrack: Track | null;
    isPlaying: boolean;
    progress: number;
    duration: number;
    volume: number;
    playTrack: (track: Track) => void;
    togglePlayPause: () => void;
    skipForward: () => void;
    skipBackward: () => void;
    seek: (value: number) => void;
    setVolume: (value: number) => void;
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(1);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlayPause = useCallback(() => {
        if (!audioRef.current || !currentTrack) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(prev => !prev);
    }, [currentTrack, isPlaying]);

    const playTrack = useCallback((track: Track) => {
        if (currentTrack?.id === track.id) {
            togglePlayPause();
        } else {
            setCurrentTrack(track);
            setIsPlaying(true);
        }
    }, [currentTrack, togglePlayPause]);

    const skipForward = useCallback(() => {
        if (!currentTrack) return;
        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % tracks.length;
        playTrack(tracks[nextIndex]);
    }, [currentTrack, playTrack]);

    const skipBackward = useCallback(() => {
        if (!currentTrack) return;
        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
        playTrack(tracks[prevIndex]);
    }, [currentTrack, playTrack]);

    const seek = useCallback((value: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setProgress(value);
        }
    }, []);

    const setVolume = useCallback((value: number) => {
        setVolumeState(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => setProgress(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => {
            skipForward();
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [currentTrack, skipForward]);

    // Handle auto-play when track changes
    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.src = currentTrack.audioUrl;
            if (isPlaying) {
                audioRef.current.play().catch(console.error);
            }
        }
    }, [currentTrack, isPlaying]);


    return (
        <AudioContext.Provider value={{
            currentTrack,
            isPlaying,
            progress,
            duration,
            volume,
            playTrack,
            togglePlayPause,
            skipForward,
            skipBackward,
            seek,
            setVolume,
            audioRef
        }}>
            {children}
            <audio ref={audioRef} />
        </AudioContext.Provider>
    );
}

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
