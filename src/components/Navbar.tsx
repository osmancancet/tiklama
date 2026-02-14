"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { chapters } from "@/data/chapters";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [chaptersOpen, setChaptersOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-color"
            style={{ background: "rgba(10, 10, 15, 0.85)", backdropFilter: "blur(20px)" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 no-underline">

                        <div>
                            <div className="font-black text-lg tracking-tighter leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
                                <span className="text-blue-600">TIKLA</span>
                                <span className="text-red-600">(MA)!</span>
                            </div>
                            <span className="hidden sm:block text-[8px] text-text-muted tracking-widest uppercase font-serif italic">
                                İNSAN ZİHNİNİ HACKLEME SANATI
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm text-text-secondary hover:text-neon-blue transition-colors no-underline">
                            Ana Sayfa
                        </Link>
                        <div className="relative"
                            onMouseEnter={() => setChaptersOpen(true)}
                            onMouseLeave={() => setChaptersOpen(false)}>
                            <button className="text-sm text-text-secondary hover:text-neon-blue transition-colors bg-transparent border-none cursor-pointer font-[inherit]">
                                Bölümler ▾
                            </button>
                            <AnimatePresence>
                                {chaptersOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl border border-border-color p-2"
                                        style={{ background: "rgba(18, 18, 26, 0.98)", backdropFilter: "blur(20px)" }}>
                                        {chapters.map((ch) => (
                                            <Link
                                                key={ch.id}
                                                href={`/bolum/${ch.slug}`}
                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-bg-card-hover transition-colors no-underline"
                                                onClick={() => setChaptersOpen(false)}>
                                                <span className="text-lg">{ch.icon}</span>
                                                <div>
                                                    <span className="text-xs text-text-muted font-mono">
                                                        Bölüm {ch.id}
                                                    </span>
                                                    <span className="block text-sm text-text-primary truncate max-w-[220px]">
                                                        {ch.subtitle}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden bg-transparent border-none text-text-primary cursor-pointer text-xl p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menü">
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden border-t border-border-color"
                        style={{ background: "rgba(10, 10, 15, 0.98)" }}>
                        <div className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
                            <Link href="/" className="block py-2 text-text-secondary hover:text-neon-blue transition-colors no-underline"
                                onClick={() => setMenuOpen(false)}>
                                🏠 Ana Sayfa
                            </Link>
                            <div className="border-t border-border-color pt-2 mt-2">
                                <span className="text-xs text-text-muted font-mono uppercase tracking-wider">Bölümler</span>
                                {chapters.map((ch) => (
                                    <Link
                                        key={ch.id}
                                        href={`/bolum/${ch.slug}`}
                                        className="flex items-center gap-3 py-2 text-sm text-text-secondary hover:text-neon-blue transition-colors no-underline"
                                        onClick={() => setMenuOpen(false)}>
                                        <span>{ch.icon}</span>
                                        <span>B{ch.id}: {ch.subtitle}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
