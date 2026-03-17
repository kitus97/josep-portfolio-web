"use client";

import type { Track } from "@/lib/sanity.queries";
import { useAudio } from "@/lib/AudioContext";
import { useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AudioPlayerCard } from "@/components/AudioPlayerCard";

type AudioPlayerGridProps = {
    tracks?: Track[];
};

function buildLoopTracks(input: Track[]) {
    if (input.length >= 8) return input;
    const out: Track[] = [];
    while (out.length < 8) out.push(...input);
    return out.slice(0, 8);
}

export function AudioPlayerGrid({ tracks = [] }: AudioPlayerGridProps) {
    const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true });
    const { playTrack, setQueue } = useAudio();

    const loopTracks = useMemo(() => buildLoopTracks(tracks), [tracks]);

    useEffect(() => {
        setQueue(tracks);
    }, [setQueue, tracks]);

    useEffect(() => {
        const onPlayFirst = () => {
            if (tracks[0]) playTrack(tracks[0]);
        };
        window.addEventListener("play-first-track", onPlayFirst);
        return () => window.removeEventListener("play-first-track", onPlayFirst);
    }, [playTrack, tracks]);

    if (tracks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[260px] border border-dashed border-accent/20 rounded-2xl">
                <p className="text-foreground-muted font-mono text-sm">No tracks yet.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -ml-4">
                {loopTracks.map((track, i) => (
                    <div
                        key={`${track._id}-${i}`}
                        className="flex-[0_0_86%] sm:flex-[0_0_56%] md:flex-[0_0_40%] lg:flex-[0_0_32%] pl-4 min-w-0"
                    >
                        <AudioPlayerCard track={track} priority={i < 2} />
                    </div>
                ))}
            </div>
        </div>
    );
}

