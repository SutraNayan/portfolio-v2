"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LogEntry = {
    id: string;
    date: string;
    title: string;
    description: string;
    tags: string[];
};

// Dummy data representing MDX parsed entries
const MOCK_LOGS: LogEntry[] = [
    {
        id: "01",
        date: "Feb 2026",
        title: "Mastering Next.js 16 PPR",
        description: "Deep dive into partial prerendering architectures and edge streaming capabilities. Exploring how Server Components bridge the gap between static CDN speeds and dynamic application states.",
        tags: ["React 19", "Next.js 16", "Architecture"]
    },
    {
        id: "02",
        date: "Jan 2026",
        title: "Spatial Computing w/ Spline",
        description: "Integrating high-fidelity WebGPU 3D assets natively within DOM layouts. Focusing on GSAP hooks to drive interactions through scroll velocity and pointer parallax.",
        tags: ["WebGL", "Spline", "GSAP"]
    },
    {
        id: "03",
        date: "Dec 2025",
        title: "Agentic AI Search Implementation",
        description: "Built an embedded custom LLM overlay using Gemini 1.5 Pro to query personalized knowledge bases built from MDX logs.",
        tags: ["Gemini 1.5 Pro", "Edge", "AI"]
    }
];

export function LearningTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Staggered node entry
            nodesRef.current.forEach((node, i) => {
                if (!node) return;
                gsap.fromTo(node,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.7,
                        delay: i * 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: node,
                            start: "top 85%",
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-40 bg-zinc-950 px-6 overflow-hidden">

            {/* Background glow effects */}
            <div className="absolute top-1/4 -left-[20%] w-[50%] h-[50%] bg-cyan-900/20 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-[20%] w-[50%] h-[50%] bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="relative max-w-4xl mx-auto">
                <div
                    ref={headerRef}
                    className="mb-24 text-center md:text-left flex flex-col items-center md:items-start"
                >
                    <h2 className="text-fluid-h2 font-medium tracking-tight text-white mb-4">
                        The <span className="gradient-text">Journey.</span>
                    </h2>
                    <p className="text-neutral-400 font-light max-w-lg text-fluid-p">
                        A chronological timeline of my deep-dives into modern web architectures and artificial intelligence.
                    </p>
                </div>

                <div className="relative border-l border-white/10 pl-8 md:pl-12 ml-4">
                    {MOCK_LOGS.map((log, index) => (
                        <div
                            key={log.id}
                            ref={el => { nodesRef.current[index] = el; }}
                            className="mb-16 last:mb-0 relative group"
                        >
                            {/* Timeline Node Indicator */}
                            <div className="absolute -left-[45px] md:-left-[61px] w-5 h-5 rounded-full bg-zinc-950 border border-white/20 group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300" />
                            <div className="absolute -left-[39px] md:-left-[55px] top-[6px] w-2 h-2 rounded-full bg-neutral-600 group-hover:bg-cyan-400 transition-colors duration-300" />

                            {/* Date */}
                            <span className="text-sm font-mono tracking-widest text-cyan-500 mb-3 block opacity-80 uppercase">
                                {log.date}
                            </span>

                            {/* Card Container */}
                            <div className="glass-panel p-6 md:p-8 cursor-pointer group-hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                                <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                    {log.title}
                                </h3>
                                <p className="text-neutral-400 text-fluid-p font-light leading-relaxed mb-6">
                                    {log.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {log.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-white/10 text-neutral-400"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
