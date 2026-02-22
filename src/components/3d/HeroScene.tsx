"use client";

import Spline from "@splinetool/react-spline";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function HeroScene() {
    const containerRef = useRef<HTMLDivElement>(null);

    // -- Parallax on Scroll --
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 800], [1, 1.4]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0.4]);
    const y = useTransform(scrollY, [0, 800], [0, 200]);

    // -- Cursor Interaction --
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const [isLoaded, setIsLoaded] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-transparent z-0"
            style={{ opacity, y }}
        >
            {/* Fallback Loader */}
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-t-2 border-cyan-500 animate-spin" />
                </div>
            )}

            {/* 3D Scene Wrapper */}
            <motion.div
                className="w-full h-full max-w-7xl mx-auto absolute inset-0 z-0 pointer-events-none sm:pointer-events-auto filter drop-shadow-[0_0_30px_rgba(6,182,212,0.1)]"
                style={{
                    scale,
                    rotateX,
                    rotateY,
                    perspective: 1000
                }}
            >
                <Spline
                    scene="https://prod.spline.design/6Tyrs0fKW-1Twia4/scene.splinecode"
                    onLoad={() => setIsLoaded(true)}
                    className="w-full h-full"
                />
            </motion.div>

            {/* Front Content Layer */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pointer-events-none mt-32 md:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center md:text-left"
                >
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full glass-panel border border-white/10 select-none">
                        <span className="text-sm font-medium tracking-wider text-cyan-400">STAFF SOFTWARE ENGINEER</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-6 leading-tight">
                        Spatial <br />
                        <span className="gradient-text">Storytelling.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-lg mx-auto md:mx-0 font-light tracking-wide leading-relaxed">
                        Exploring the intersection of AI architecture and high-fidelity web experiences.
                    </p>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2"
            >
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Scroll to explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
            </motion.div>
        </motion.section>
    );
}
