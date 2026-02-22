'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function NavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass shadow-lg shadow-black/20' : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                <div className="text-xl font-bold tracking-tighter mix-blend-difference">
                    O<span className="text-accent-400">/</span><span className="text-accent-200">S</span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <a href="#work" className="text-sm font-medium text-accent-200 hover:text-white transition-colors">Work</a>
                    <a href="#about" className="text-sm font-medium text-accent-200 hover:text-white transition-colors">About</a>
                    <a href="#contact" className="text-sm font-medium text-accent-200 hover:text-white transition-colors">Contact</a>
                </nav>

                <button className="md:hidden p-2 text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </motion.header>
    );
}
