"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TerminalTextProps {
    lines: string[];
    speed?: number;
    onComplete?: () => void;
    className?: string;
}

export default function TerminalText({ lines, speed = 30, onComplete, className = "" }: TerminalTextProps) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentLineIndex >= lines.length) {
            setIsComplete(true);
            onComplete?.();
            return;
        }

        const currentLine = lines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
            const timer = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
                    return newLines;
                });
                setCurrentCharIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [currentLineIndex, currentCharIndex, lines, speed, onComplete]);

    return (
        <div className={`font-mono text-sm bg-bg-primary rounded-lg p-4 border border-border-color ${className}`}>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border-color">
                <span className="w-3 h-3 rounded-full bg-danger-red inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-warning-yellow inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-success-green inline-block"></span>
                <span className="ml-2 text-xs text-text-muted">terminal</span>
            </div>
            {displayedLines.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="leading-6"
                >
                    <span className="text-terminal-green mr-2">$</span>
                    <span className="text-text-primary">{line}</span>
                    {i === currentLineIndex && !isComplete && (
                        <span className="inline-block w-2 h-4 bg-terminal-green ml-1 animate-pulse"></span>
                    )}
                </motion.div>
            ))}
            {isComplete && (
                <div className="mt-1">
                    <span className="text-terminal-green mr-2">$</span>
                    <span className="inline-block w-2 h-4 bg-terminal-green animate-pulse"></span>
                </div>
            )}
        </div>
    );
}
