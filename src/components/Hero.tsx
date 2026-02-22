'use client';

import { motion } from 'framer-motion';
import { SplineScene } from './SplineScene';

// Using the user-provided custom Spline scene URL
const HERO_SCENE_URL = "https://prod.spline.design/6Tyrs0fKW-1Twia4/scene.splinecode";

export function Hero() {
    return (
        <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden bg-background">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                {/* Mask removed to ensure the custom 3D element is fully visible without being darkened */}

                <SplineScene scene={HERO_SCENE_URL} className="scale-110 sm:scale-100" />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="max-w-3xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full glass border border-white/10 text-sm font-medium tracking-wide text-accent-100"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                        </span>
                        Available for new projects
                    </motion.div>

                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]">
                        <span className="block text-foreground">Creative</span>
                        <span className="block gradient-text">Developer.</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-accent-300 max-w-xl leading-relaxed mb-10 font-light">
                        I craft immersive digital experiences bringing design and engineering together on the web.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#projects"
                            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-accent-100 transition-colors"
                        >
                            View Work
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="px-8 py-4 glass border border-white/10 text-white font-semibold rounded-full hover:bg-white/5 transition-colors"
                        >
                            Contact Me
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-accent-400 font-semibold mb-2">Scroll</span>
                <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
                    <motion.div
                        animate={{ y: [0, 48] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-accent-400"
                    />
                </div>
            </motion.div>
        </section>
    );
}
