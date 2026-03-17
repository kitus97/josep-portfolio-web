import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
    const contactPhone = "+44 0 7784 546006";

    return (
        <footer className="border-t border-surface-light py-16 px-6 relative z-10 bg-background/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-black tracking-tighter">Jep</h3>
                    <p className="text-sm text-foreground-muted mt-2 font-mono uppercase tracking-wider">Mix Engineer</p>
                    <p className="text-xs text-foreground-muted/50 mt-4">© {new Date().getFullYear()} All rights reserved.</p>
                    <p className="text-xs text-foreground-muted/50 mt-4">Developed by <a href="https://www.linkedin.com/in/marc-rams-estrada/" className="text-foreground-muted hover:text-accent hover:scale-110 transition-all">Marc Rams Estrada</a>.</p>
                </div>

                <div className="flex gap-8">
                    <a href="https://www.instagram.com/esmu_1111" className="text-foreground-muted hover:text-accent hover:scale-110 transition-all">
                        <Instagram className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/josep-escurriola-múrria-018845340" className="text-foreground-muted hover:text-accent hover:scale-110 transition-all">
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center gap-3 border border-surface-light text-foreground px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider bg-surface/30 select-text">
                        <Phone className="w-4 h-4" />
                        <span className="font-mono tracking-normal normal-case">{contactPhone}</span>
                    </div>

                    <a
                        href="mailto:josepescurriolamurria@gmail.com"
                        className="flex items-center gap-3 border border-surface-light hover:border-accent text-foreground hover:text-accent px-8 py-4 rounded-full transition-all text-sm font-bold uppercase tracking-wider bg-surface/30 hover:bg-surface"
                    >
                        <Mail className="w-4 h-4" />
                        Work with me
                    </a>
                </div>
            </div>
        </footer>
    );
}
