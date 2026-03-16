import { Instagram, Music2, Mail, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-surface-light py-16 px-6 relative z-10 bg-background/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-black tracking-tighter uppercase">JOSEP</h3>
                    <p className="text-sm text-foreground-muted mt-2 font-mono uppercase tracking-wider">Sound Architect</p>
                    <p className="text-xs text-foreground-muted/50 mt-4">© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                <div className="flex gap-8">
                    <a href="#" className="text-foreground-muted hover:text-accent hover:scale-110 transition-all">
                        <Instagram className="w-6 h-6" />
                    </a>
                    <a href="https://open.spotify.com/artist/5Zh1rfDCx5fE5GnGmUe1tY?si=GFRE3LKrTxa1EiQ_A9RCWg" className="text-foreground-muted hover:text-accent hover:scale-110 transition-all">
                        <Music2 className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-foreground-muted hover:text-accent hover:scale-110 transition-all">
                        <Twitter className="w-6 h-6" />
                    </a>
                </div>

                <a
                    href="mailto:hello@example.com"
                    className="flex items-center gap-3 border border-surface-light hover:border-accent text-foreground hover:text-accent px-8 py-4 rounded-full transition-all text-sm font-bold uppercase tracking-wider bg-surface/30 hover:bg-surface"
                >
                    <Mail className="w-4 h-4" />
                    Work with me
                </a>
            </div>
        </footer>
    );
}
