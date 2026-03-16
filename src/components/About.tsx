"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="about">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Column: Portrait */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200" // A black and white studio portrait placeholder
                        alt="Producer Portrait"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Subtle purple-to-black gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-accent/20 to-transparent mix-blend-multiply opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Inner accent ring */}
                    <div className="absolute inset-0 border border-white/10 group-hover:border-accent/40 rounded-2xl transition-colors duration-500" />
                </motion.div>

                {/* Right Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col justify-center"
                >
                    <div className="inline-block text-accent font-mono text-sm tracking-widest uppercase mb-4">
                        Behind the Sound
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-8 text-foreground group-hover:text-accent transition-colors">
                        THE PRODUCER
                    </h2>

                    <div className="space-y-6 text-foreground-muted leading-relaxed text-lg">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
                        </p>
                        <p>
                            Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                            est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                            accusantium doloremque laudantium.
                        </p>
                        <p className="border-l-2 border-accent pl-6 italic text-foreground/80 mt-8 font-serif">
                            &quot;Sound is not just heard; it is felt. It is the invisible architecture of emotion.&quot;
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
