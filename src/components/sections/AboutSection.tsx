"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Sparkles, TerminalSquare } from "lucide-react";

const bentoItems = [
    {
        title: "Philosophy",
        description: "Code is poetry. Architecture is art. I build scalable digital ecosystems that prioritize user immersion without sacrificing performance metrics.",
        icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
        className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-zinc-900/80 to-black/80",
    },
    {
        title: "Stack",
        description: "Next.js 16, TypeScript, Tailwind 4",
        icon: <Code2 className="w-6 h-6 text-emerald-400" />,
        className: "md:col-span-1 bg-zinc-900/40",
    },
    {
        title: "WebGL",
        description: "Spline, Three.js, React Three Fiber",
        icon: <Cpu className="w-6 h-6 text-purple-400" />,
        className: "md:col-span-1 bg-zinc-900/40",
    },
    {
        title: "AI Integrations",
        description: "Gemini 1.5 Pro, Agentic Workflows",
        icon: <TerminalSquare className="w-6 h-6 text-rose-400" />,
        className: "md:col-span-2 bg-zinc-900/50",
    }
];

export default function AboutSection() {
    return (
        <section id="about" className="relative w-full py-32 bg-black px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
                        Mind & <span className="gradient-text">Machine.</span>
                    </h2>
                    <p className="text-neutral-400 font-light max-w-lg md:text-lg">
                        A deeply technical approach to creative development. Bridging the gap between raw backend processing power and frontend spatial aesthetics.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
                    {bentoItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`glass-panel p-8 flex flex-col justify-between group overflow-hidden relative ${item.className}`}
                        >
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-black/60 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                                    {item.description}
                                </p>
                            </div>

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
