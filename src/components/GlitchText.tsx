"use client";
import { motion } from "framer-motion";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: "h1" | "h2" | "h3" | "span" | "p";
}

export default function GlitchText({ text, className = "", as: Tag = "h2" }: GlitchTextProps) {
    return (
        <motion.div
            className="relative inline-block"
            whileHover="glitch"
        >
            <Tag className={`relative ${className}`}>
                {text}
                <motion.span
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ color: "var(--neon-blue)", clipPath: "inset(0 0 0 0)" }}
                    variants={{
                        glitch: {
                            x: [0, -2, 2, -1, 0],
                            clipPath: [
                                "inset(0 0 85% 0)",
                                "inset(15% 0 60% 0)",
                                "inset(40% 0 30% 0)",
                                "inset(70% 0 5% 0)",
                                "inset(0 0 0 0)",
                            ],
                            transition: { duration: 0.3, repeat: Infinity },
                        },
                    }}
                    aria-hidden
                >
                    {text}
                </motion.span>
                <motion.span
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ color: "var(--danger-red)", clipPath: "inset(0 0 0 0)" }}
                    variants={{
                        glitch: {
                            x: [0, 2, -2, 1, 0],
                            clipPath: [
                                "inset(60% 0 0 0)",
                                "inset(30% 0 40% 0)",
                                "inset(10% 0 70% 0)",
                                "inset(50% 0 20% 0)",
                                "inset(0 0 0 0)",
                            ],
                            transition: { duration: 0.3, repeat: Infinity },
                        },
                    }}
                    aria-hidden
                >
                    {text}
                </motion.span>
            </Tag>
        </motion.div>
    );
}
