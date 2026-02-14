"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Chapter, chapters } from "@/data/chapters";

interface ChapterLayoutProps {
    chapter: Chapter;
    children: React.ReactNode;
}

export default function ChapterLayout({ chapter, children }: ChapterLayoutProps) {
    const prevChapter = chapters.find((c) => c.id === chapter.id - 1);
    const nextChapter = chapters.find((c) => c.id === chapter.id + 1);

    return (
        <div className="min-h-screen pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Chapter header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-6">
                        <Link href="/" className="hover:text-neon-blue transition-colors no-underline text-text-muted">Ana Sayfa</Link>
                        <span>/</span>
                        <span style={{ color: chapter.color }}>Bölüm {chapter.id}</span>
                    </div>

                    {/* Title area */}
                    <div className="flex items-start gap-4 mb-8">
                        <motion.div
                            className="text-5xl flex-shrink-0"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        >
                            {chapter.icon}
                        </motion.div>
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest"
                                style={{ color: chapter.color }}>
                                Bölüm {chapter.id}
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mt-1 leading-tight">
                                {chapter.title}
                            </h1>
                            <p className="text-text-secondary mt-2 text-sm leading-relaxed">
                                {chapter.case}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Simulation area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="sim-container"
                >
                    <div className="status-bar">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse"></span>
                            <span>CANLI_ORTAM</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-50">
                            <span>ŞİFRELİ</span>
                            <span className="text-xs">🔒</span>
                        </div>
                    </div>

                    <div>
                        {children}
                    </div>
                </motion.div>

                {/* Lesson box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="lesson-box mt-8"
                >
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🎓</span>
                        <div>
                            <span className="text-xs font-mono text-neon-blue uppercase tracking-wider">
                                Bu Bölümün Dersi
                            </span>
                            <p className="text-text-primary mt-2 leading-relaxed">
                                {chapter.lesson}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-border-color">
                    {prevChapter ? (
                        <Link href={`/bolum/${prevChapter.slug}`}
                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-neon-blue transition-colors no-underline group">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span>
                            <div>
                                <span className="text-xs text-text-muted font-mono">Bölüm {prevChapter.id}</span>
                                <span className="block text-sm">{prevChapter.subtitle}</span>
                            </div>
                        </Link>
                    ) : <div />}
                    {nextChapter ? (
                        <Link href={`/bolum/${nextChapter.slug}`}
                            className="flex items-center gap-2 text-sm text-text-secondary hover:text-neon-blue transition-colors no-underline text-right group">
                            <div>
                                <span className="text-xs text-text-muted font-mono">Bölüm {nextChapter.id}</span>
                                <span className="block text-sm">{nextChapter.subtitle}</span>
                            </div>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    ) : (
                        <Link href="/"
                            className="flex items-center gap-2 text-sm text-neon-blue hover:text-neon-purple transition-colors no-underline">
                            Ana Sayfaya Dön →
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
