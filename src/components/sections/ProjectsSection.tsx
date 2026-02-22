"use client";

import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MOCK_PROJECTS = [
    {
        title: "Project Zero",
        description: "A high-frequency trading dashboard utilizing WebSockets and hardware-accelerated WebGL charts for sub-millisecond data visualization.",
        tech: ["Next.js", "Three.js", "Go"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
        color: "from-cyan-500/20"
    },
    {
        title: "NeuroSphere",
        description: "An open-source intelligence platform aggregating unstructured data into spatial graphs powered by custom embedding models.",
        tech: ["React", "Python", "Gemini Pro"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
        color: "from-purple-500/20"
    },
    {
        title: "Agentic Runner",
        description: "A headless browser orchestration tool used for rigorous end-to-end visual tests on generative AI applications.",
        tech: ["TypeScript", "Playwright", "Docker"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000",
        color: "from-emerald-500/20"
    }
];

export default function ProjectsSection() {
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 0.8,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="work" className="relative w-full py-40 bg-zinc-950 px-6">
            <div className="max-w-6xl mx-auto">
                <div
                    ref={headerRef}
                    className="mb-24 text-center md:text-left flex flex-col items-center md:items-start"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass-panel border border-white/10 select-none">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-sm font-medium tracking-wider text-cyan-400">SELECTED WORKS</span>
                    </div>
                    <h2 className="text-fluid-h2 font-medium tracking-tight text-white mb-4">
                        Featured <span className="gradient-text">Projects.</span>
                    </h2>
                    <p className="text-neutral-400 font-light max-w-lg text-fluid-p">
                        A curated selection of architecture spanning full-stack infrastructure and creative frontends.
                    </p>
                </div>

                <div className="flex flex-col gap-32">
                    {MOCK_PROJECTS.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: typeof MOCK_PROJECTS[0], index: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            if (prefersReducedMotion) {
                gsap.set(cardRef.current, { opacity: 1, scale: 1 });
                gsap.set(imageWrapperRef.current, { y: 0 });
                return;
            }

            // Enter animation scale + opacity
            gsap.fromTo(cardRef.current,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1, scale: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 90%",
                        end: "center center",
                        scrub: true,
                    }
                }
            );

            // Parallax movement inside the image wrapper
            gsap.fromTo(imageWrapperRef.current,
                { y: "-10%" },
                {
                    y: "10%",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative group w-full flex flex-col md:flex-row gap-8 items-center"
        >
            <div ref={cardRef} className="w-full flex flex-col md:flex-row gap-8 items-center">
                {/* Visual Container */}
                <div className={`relative w-full md:w-[60%] h-[400px] md:h-[600px] rounded-3xl overflow-hidden glass-panel border border-white/5 order-2 ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                    <div ref={imageWrapperRef} className="w-full h-[120%] -top-[10%] absolute left-0">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                    </div>

                    {/* Overlay Gradients */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.color} to-transparent opacity-60 mix-blend-overlay`} />
                </div>

                {/* Content Container */}
                <div className={`w-full md:w-[40%] flex flex-col order-1 ${index % 2 !== 0 ? 'md:order-2 md:pl-12' : 'md:pr-12'}`}>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t) => (
                            <span key={t} className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-white/5 border border-white/10 text-neutral-300">
                                {t}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-3xl md:text-5xl font-medium text-white mb-6 group-hover:text-cyan-400 transition-colors duration-500">
                        {project.title}
                    </h3>

                    <p className="text-neutral-400 text-fluid-p font-light leading-relaxed mb-8">
                        {project.description}
                    </p>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm font-medium text-white px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition-colors">
                            View Live <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <button className="flex items-center justify-center p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all">
                            <Github className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
