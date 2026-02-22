"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";


export default function Footer() {
    const [currentYear, setCurrentYear] = useState<number>(2026);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer id="connect" className="relative w-full overflow-hidden bg-black pt-32 pb-8 px-6 border-t border-white/5">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <h2 className="text-5xl md:text-8xl font-medium tracking-tighter text-white mb-6">
                            Let&apos;s build <br className="hidden md:block" />
                            <span className="text-neutral-500 hover:text-cyan-400 transition-colors duration-500 cursor-pointer">
                                something great.
                            </span>
                        </h2>
                    </motion.div>

                    <motion.a
                        href="mailto:hello@example.com"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-medium text-lg overflow-hidden"
                    >
                        <span className="relative z-10">hello@nayan.dev</span>
                        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-cyan-400 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </motion.a>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-6">
                        <SocialLink href="https://github.com" icon={<Github className="w-5 h-5" />} />
                        <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
                        <SocialLink href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} />
                        <SocialLink href="mailto:hello@example.com" icon={<Mail className="w-5 h-5" />} />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-neutral-500 text-sm">
                        <span>&copy; {currentYear} Nayan Sutradhar. All rights reserved.</span>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300"
        >
            {icon}
        </a>
    );
}
