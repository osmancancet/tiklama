"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim04() {
    const [phase, setPhase] = useState<"reader" | "scan" | "open" | "interaction" | "result">("reader");
    const [correct, setCorrect] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    // Scan animation effect
    useEffect(() => {
        if (phase === "scan") {
            const interval = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setPhase("open");
                        return 100;
                    }
                    return prev + 5;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [phase]);

    // Auto trigger interaction after gate opens
    useEffect(() => {
        if (phase === "open") {
            const timer = setTimeout(() => {
                setPhase("interaction");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Simulation Container */}
            <div className="relative aspect-video bg-[#0a0a0f] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">

                {/* 1. READER PHASE: Standard State */}
                {(phase === "reader" || phase === "scan") && (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                        {/* Background ambience */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,100,255,0.05),_transparent_70%)]"></div>

                        {/* Card Reader Device */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-64 bg-[#1a1a20] rounded-3xl border border-white/10 p-6 shadow-2xl relative z-10 flex flex-col items-center gap-6"
                        >
                            {/* Screen */}
                            <div className="w-full h-32 bg-black rounded-xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                                {phase === "reader" ? (
                                    <>
                                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mb-2 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                                        <span className="text-red-500 font-mono text-xs tracking-widest">KİLİTLİ</span>
                                        <span className="text-white/30 text-[10px] mt-1">LÜTFEN KART OKUTUNUZ</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin mb-2"></div>
                                        <span className="text-blue-400 font-mono text-xs tracking-widest">OKUNUYOR...</span>
                                    </>
                                )}

                                {/* Scan line */}
                                {phase === "scan" && (
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    />
                                )}
                            </div>

                            {/* Signal Area */}
                            <div className="w-full flex justify-between px-2">
                                <div className="flex gap-1">
                                    <div className={`w-2 h-2 rounded-full ${phase === 'scan' ? 'bg-blue-500' : 'bg-white/20'}`}></div>
                                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                </div>
                                <span className="text-[10px] text-white/30 font-mono">SECURE_ACCESS_V2.0</span>
                            </div>

                            {/* Action Button */}
                            {phase === "reader" && (
                                <button
                                    onClick={() => setPhase("scan")}
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold text-white shadow-lg hover:shadow-blue-500/25 transition-all text-sm tracking-wide"
                                >
                                    💳 KART OKUT
                                </button>
                            )}
                        </motion.div>
                    </div>
                )}

                {/* 2. OPEN & INTERACTION PHASE: Gate View */}
                {(phase === "open" || phase === "interaction") && (
                    <div className="relative flex-1 bg-[#050505] flex items-center justify-center overflow-hidden">

                        {/* 3D Perspective Floor info */}
                        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none"></div>

                        {/* Turnstile Gates (Glass Panels) */}
                        <div className="flex gap-20 items-end perspective-[1000px] relative z-10">
                            {/* Left Gate */}
                            <motion.div
                                initial={{ rotateY: 0 }}
                                animate={{ rotateY: -80, x: -50 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="w-4 h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-l-lg origin-bottom-left shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                            ></motion.div>

                            {/* Right Gate */}
                            <motion.div
                                initial={{ rotateY: 0 }}
                                animate={{ rotateY: 80, x: 50 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="w-4 h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-r-lg origin-bottom-right shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                            ></motion.div>
                        </div>

                        {/* Success Message Overlay */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-10 flex flex-col items-center z-20"
                        >
                            <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-green-400 font-mono text-xs font-bold tracking-wider">ERİŞİM İZNİ VERİLDİ</span>
                            </div>
                        </motion.div>

                        {/* INTERACTION: Tailgater Appears */}
                        {phase === "interaction" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", bounce: 0.4 }}
                                className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center justify-end h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                            >
                                <div className="text-center mb-8 max-w-md px-6">
                                    <div className="w-16 h-16 bg-zinc-800 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-white/10 shadow-xl">
                                        <span className="text-3xl">☕</span>
                                        <div className="absolute -right-2 bottom-0 bg-red-500 text-white rounded-full p-1 text-[10px] w-6 h-6 flex items-center justify-center font-bold">!</div>
                                    </div>

                                    <div className="bg-[#1a1a20] border border-white/10 p-5 rounded-2xl shadow-2xl relative">
                                        {/* Speech bubble arrow */}
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a1a20] border-t border-l border-white/10 rotate-45"></div>

                                        <h4 className="text-white font-bold mb-2">Aceleci Çalışan (?)</h4>
                                        <p className="text-text-secondary text-sm leading-relaxed mb-6">
                                            "Pardon! Kartımı masada unutmuşum, ellerim de kahvelerle dolu.
                                            <span className="text-white font-medium"> Kapı kapanmadan seninle geçebilir miyim?</span> Toplantıya çok geç kaldım!"
                                        </p>

                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                                className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-white transition-colors"
                                            >
                                                🚪 Kapıyı Tut (Geçsin)
                                            </button>
                                            <button
                                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                                className="px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs text-white font-bold transition-colors shadow-lg shadow-blue-900/20"
                                            >
                                                🛡️ Güvenliğe Yönlendir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                )}

                {/* 3. RESULT PHASE */}
                {phase === "result" && (
                    <div className="absolute inset-0 z-40 bg-black">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Profesyonel Duruş!" : "Güvenlik İhlali!"}
                            message={correct
                                ? "Harika! Nezaket tuzağına (Social Engineering) düşmediniz. Prosedürler herkes içindir."
                                : "Nezaketiniz istismar edildi. İçeri aldığınız kişi bir saldırgandı ve sunucu odasına erişim sağladı."}
                            lesson="Profesyonel nezaket güvenlikten önemli değildir. 'Tailgating' (kuyruk takibi) en yaygın fiziksel sızma yöntemidir. Tanımadığınız veya kartı olmayan kişileri asla kendi kartınızla içeri almayın."
                            onReset={() => setPhase("reader")}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
