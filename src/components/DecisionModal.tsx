"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DecisionModalProps {
    safeOption: string;
    dangerOption: string;
    onSafe: () => void;
    onDanger: () => void;
    question?: string;
}

export default function DecisionModal({ safeOption, dangerOption, onSafe, onDanger, question }: DecisionModalProps) {
    const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
        >
            {question && (
                <p className="text-center text-text-secondary mb-4 text-sm">
                    {question}
                </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                    className="btn-safe relative overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onMouseEnter={() => setHoveredBtn("safe")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    onClick={onSafe}
                >
                    <span className="relative z-10">✅ {safeOption}</span>
                    <AnimatePresence>
                        {hoveredBtn === "safe" && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.15 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute inset-0 bg-success-green rounded-xl"
                            />
                        )}
                    </AnimatePresence>
                </motion.button>

                <motion.button
                    className="btn-danger relative overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onMouseEnter={() => setHoveredBtn("danger")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    onClick={onDanger}
                >
                    <span className="relative z-10">⚠️ {dangerOption}</span>
                    <AnimatePresence>
                        {hoveredBtn === "danger" && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.15 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute inset-0 bg-danger-red rounded-xl"
                            />
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </motion.div>
    );
}
