"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SimulationResultProps {
    isCorrect: boolean;
    title: string;
    message: string;
    lesson: string;
    onReset: () => void;
}

export default function SimulationResult({ isCorrect, title, message, lesson, onReset }: SimulationResultProps) {
    const [show, setShow] = useState(true);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mt-4 sm:mt-6 rounded-xl border overflow-hidden"
                    style={{
                        borderColor: isCorrect ? "var(--success-green)" : "var(--danger-red)",
                        background: isCorrect
                            ? "linear-gradient(135deg, rgba(48, 209, 88, 0.1), rgba(48, 209, 88, 0.03)), #0f172a"
                            : "linear-gradient(135deg, rgba(255, 45, 85, 0.1), rgba(255, 45, 85, 0.03)), #0f172a",
                    }}
                >
                    {/* Header */}
                    <div className="px-4 sm:px-5 py-3 sm:py-4 border-b"
                        style={{ borderColor: isCorrect ? "rgba(48,209,88,0.2)" : "rgba(255,45,85,0.2)" }}>
                        <div className="flex items-start gap-3">
                            <motion.span
                                className="text-2xl sm:text-3xl shrink-0 mt-0.5"
                                initial={{ rotate: -180, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                {isCorrect ? "🛡️" : "💥"}
                            </motion.span>
                            <div className="min-w-0">
                                <h3 className="text-base sm:text-lg font-bold leading-tight" style={{ color: isCorrect ? "var(--success-green)" : "var(--danger-red)" }}>
                                    {title}
                                </h3>
                                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">{message}</p>
                            </div>
                        </div>
                    </div>

                    {/* Lesson */}
                    <div className="px-4 sm:px-5 py-3 sm:py-4">
                        <div className="flex items-start gap-2">
                            <span className="text-neon-blue text-base sm:text-lg mt-0.5 shrink-0">💡</span>
                            <div className="min-w-0">
                                <span className="text-[10px] sm:text-xs font-mono text-neon-blue uppercase tracking-wider">Ders</span>
                                <p className="text-xs sm:text-sm text-text-primary mt-1 leading-relaxed">{lesson}</p>
                            </div>
                        </div>
                    </div>

                    {/* Reset */}
                    <div className="px-4 sm:px-5 py-2 sm:py-3 border-t border-border-color flex justify-center">
                        <button
                            onClick={() => { setShow(false); setTimeout(onReset, 300); }}
                            className="text-xs font-mono text-neon-blue hover:text-neon-purple active:text-neon-purple transition-colors bg-transparent border-none cursor-pointer py-2 px-4 min-h-[44px] flex items-center"
                        >
                            🔄 Simülasyonu Tekrarla
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
