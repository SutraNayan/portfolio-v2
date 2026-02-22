'use client';

import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: "E-Commerce Experience",
        category: "Web App",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "Fintech Dashboard",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "3D Product Viewer",
        category: "WebGL",
        image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 4,
        title: "Brand Identity",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800",
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-background relative z-10">
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Selected Work</h2>
                    <p className="text-accent-400 text-lg">A showcase of recent projects and explorations.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group cursor-pointer block w-full"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-accent-900 border border-white/5">
                                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[50%] group-hover:grayscale-0"
                                />
                            </div>
                            <div>
                                <span className="text-accent-400 text-sm font-medium tracking-wider uppercase mb-2 block">{project.category}</span>
                                <h3 className="text-2xl font-semibold text-foreground group-hover:text-white transition-colors">
                                    {project.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
