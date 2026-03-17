"use client";

import { AudioProvider } from "@/lib/AudioContext";
import React from "react";
import { BottomPlayer } from "@/components/BottomPlayer";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AudioProvider>
            {children}
            <BottomPlayer />
        </AudioProvider>
    );
}
