"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
    { name: "Journey", href: "#journey" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Connect", href: "#connect" },
];

export default function NavBar() {
    const [isHidden, setIsHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const top = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "-100%", opacity: 0 },
            }}
            animate={isHidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
        >
            <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-8 pointer-events-auto shadow-[0_4px_30px_rgba(0,0,0,0.5)]">

                {/* Logo */}
                <button
                    onClick={scrollToTop}
                    className="text-white font-medium tracking-tight text-lg hover:text-cyan-400 transition-colors"
                >
                    Nayan.
                </button>

                {/* Links */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <MagneticLink
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.name}
                        </MagneticLink>
                    ))}
                </div>

                {/* Mobile indicator could go here */}
            </div>
        </motion.nav>
    );
}

function MagneticLink({
    children,
    href,
    onClick
}: {
    children: React.ReactNode;
    href: string;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            onClick={onClick}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="text-sm font-medium text-neutral-300 hover:text-white px-2 py-1 transition-colors duration-200"
        >
            {children}
        </motion.a>
    );
}
