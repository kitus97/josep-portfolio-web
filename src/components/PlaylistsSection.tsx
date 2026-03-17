"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Headphones, Music2, Radio } from "lucide-react";

const items = [
  { label: "Spotify", href: "https://open.spotify.com/playlist/0ldjtBd3WvjRXUYPVaMxGe?si=YNHVi-njQ2qPsA284Zv1Pw", Icon: Music2, accent: "#1ED761" },
  { label: "Apple Music", href: "https://music.apple.com/es/playlist/mixed-by-jep/pl.u-Ldbqz1qtxME1Z8W?l=en", Icon: Radio, accent: "#FF4E6B" },
  { label: "Tidal", href: "https://tidal.com/playlist/6f8e6379-4e01-4995-ac87-0cc02dd3a16b", Icon: Headphones, accent: "#000000" },
] as const;

export function PlaylistsSection() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="w-full">
        <div className="ml-auto w-full md:w-1/3 text-right">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-5xl font-black tracking-tight uppercase"
          >
            My Playlists
          </motion.h3>

          <div className="mt-8 flex flex-col items-center gap-3 w-full">
            {items.map(({ label, href, Icon, accent }) => (
              <Link
                key={label}
                href={href}
                className="playlist-btn w-full group flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white border border-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02]"
                style={
                  {
                    "--brand": accent,
                    "--brand-glow": `${accent}4D`,
                    "--brand-hover": `${accent}99`,
                  } as React.CSSProperties
                }
              >
                <Icon className="w-5 h-5 text-white" />
                <span className="text-white">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .playlist-btn {
          background-color: var(--brand);
          box-shadow: 0 0 20px var(--brand-glow);
        }
        .playlist-btn:hover {
          box-shadow: 0 0 32px var(--brand-hover);
        }
      `}} />
    </section>
  );
}

