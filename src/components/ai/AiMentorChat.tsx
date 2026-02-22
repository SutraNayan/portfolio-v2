"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageSquare, Send } from "lucide-react";

type Message = { role: "user" | "assistant"; text: string };

export default function AiMentorChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", text: "Hello! I'm Nayan's AI proxy. Ask me anything about his recent architectural upgrades or skills." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef.current && isOpen) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userQ = input.trim();
        setInput("");

        // Add user message & empty AI placeholder
        setMessages(prev => [...prev, { role: "user", text: userQ }, { role: "assistant", text: "" }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [{ role: "user", content: userQ }] })
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullText = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // Decode chunk and append
                const chunk = decoder.decode(value, { stream: true });
                fullText += chunk;

                // Hide loading indicator as soon as we get the first chunk
                if (isLoading) setIsLoading(false);

                setMessages(prev => {
                    const clone = [...prev];
                    clone[clone.length - 1].text = fullText;
                    return clone;
                });
            }
        } catch (error) {
            setMessages(prev => {
                const clone = [...prev];
                clone[clone.length - 1].text = "Ops, communication with the Edge failed.";
                return clone;
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:bg-cyan-500/30 hover:scale-110 transition-all duration-300"
                    >
                        <Sparkles className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col glass-panel overflow-hidden border border-white/10"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-zinc-950/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-cyan-500/10 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-cyan-400/20 animate-pulse blur" />
                                    <MessageSquare className="w-4 h-4 text-cyan-400 relative z-10" />
                                </div>
                                <span className="font-medium text-white tracking-wide text-sm">Edge AI Proxy</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-neutral-400 hover:text-white transition-colors p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-4">
                            {messages.map((msg, i) => {
                                // Don't render empty message bubbles if text is completely empty (while loading)
                                if (i === messages.length - 1 && isLoading && msg.text === "") return null;
                                return (
                                    <div
                                        key={i}
                                        className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-cyan-600/20 text-cyan-50 border border-cyan-500/20 rounded-br-sm ml-auto'
                                            : 'bg-white/5 text-neutral-300 border border-white/5 rounded-bl-sm mr-auto'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                );
                            })}

                            {isLoading && (
                                <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-sm p-4 mr-auto w-[60px]">
                                    <div className="flex gap-1 justify-center">
                                        <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                                        <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                                        <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-zinc-950/90 via-zinc-950/80 to-transparent backdrop-blur-xl border-t border-white/5">
                            <form onSubmit={handleSubmit} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about Nayan's skills..."
                                    className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3 pr-12 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-2 rounded-full text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
