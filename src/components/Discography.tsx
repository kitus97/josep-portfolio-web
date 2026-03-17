"use client";

import { motion } from "framer-motion";
import type { Track } from "@/lib/sanity.queries";
import { AudioPlayerGrid } from "@/components/AudioPlayerGrid";

interface DiscographyProps {
    tracks?: Track[];
}

export function Discography({ tracks }: DiscographyProps) {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="discography">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-3xl md:text-5xl font-black mb-12 tracking-tight uppercase"
            >
                Selected Works
            </motion.h2>

            <AudioPlayerGrid tracks={tracks} />
        </section>
    );
}

