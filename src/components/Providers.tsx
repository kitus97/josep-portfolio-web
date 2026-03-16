"use client";

import { AudioProvider } from "@/lib/AudioContext";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AudioProvider>
            {children}
        </AudioProvider>
    );
}
