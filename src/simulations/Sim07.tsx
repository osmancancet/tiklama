"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim07() {
    const [phase, setPhase] = useState<"player" | "decision" | "result">("player");
    const [correct, setCorrect] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (typeof window === 'undefined' || !window.speechSynthesis) {
            // speechSynthesis not supported, just toggle visual state
            setIsPlaying(prev => !prev);
            if (!isPlaying) {
                setTimeout(() => setIsPlaying(false), 5000);
            }
            return;
        }

        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            const text = "Baba... Baba yardım et! Çok kötü bir kaza yaptım... Lütfen babacığım, acil paraya ihtiyacım var... Telefonum kapanmak üzere, lütfen yardım et!";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "tr-TR";
            utterance.pitch = 1.2;
            utterance.rate = 1.1;

            utterance.onend = () => setIsPlaying(false);
            utterance.onerror = () => setIsPlaying(false);

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        }
    };

    return (
        <div className="relative min-h-[480px] sm:min-h-[520px] max-w-sm sm:max-w-md mx-auto rounded-xl overflow-hidden">
            {phase === "player" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden">

                        {/* Audio Wave Visualization (Fake) */}
                        <div className="flex items-center justify-center gap-1 h-32 mb-6">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-cyan-400 rounded-full"
                                    animate={{
                                        height: isPlaying ? [10, 60, 20, 80, 40] : 10,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: i * 0.05
                                    }}
                                />
                            ))}
                        </div>

                        <div className="text-center mb-6">
                            <p className="text-xs text-gray-500 mb-2">Bilinmeyen Numara</p>
                            <h3 className="text-2xl font-bold text-white mb-1">05XX XXX XX XX</h3>
                            <p className="text-sm text-red-500 italic">&quot;Baba yardım et, çok kötüyüm...&quot;</p>
                        </div>

                        <div className="flex justify-center gap-4 mb-4">
                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform shadow-lg shadow-white/20 active:scale-95"
                            >
                                {isPlaying ? "⏸" : "▶"}
                            </button>
                        </div>

                        <p className="text-center text-xs text-gray-400 mb-6">
                            {isPlaying ? "Ses oynatılıyor..." : "Sesi dinlemek için oynatın"}
                        </p>

                        <button
                            onClick={() => setPhase("decision")}
                            className="w-full py-3 bg-zinc-800 text-white rounded-xl border border-zinc-700 hover:bg-zinc-700 text-sm sm:text-base min-h-[44px]"
                        >
                            Karar Ver
                        </button>
                    </div>
                </motion.div>
            )}

            {phase === "decision" && (
                <div className="mt-8">
                    <h3 className="text-xl text-center mb-6">Kızınızın sesi olduğunu iddia ediyor ve acil para istiyor. Ne yaparsınız?</h3>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => { setCorrect(false); setPhase("result"); }}
                            className="btn-danger text-center py-4 text-sm sm:text-base min-h-[44px]"
                        >
                            💸 Hemen Parayı Gönder (Panik)
                        </button>
                        <button
                            onClick={() => { setCorrect(true); setPhase("result"); }}
                            className="btn-safe text-center py-4 text-sm sm:text-base min-h-[44px]"
                        >
                            🔒 Aile Parolasını / Özel Bir Anı Sor
                        </button>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Deepfake Tespit Edildi!" : "Yapay Zeka Tuzağı!"}
                    message={correct
                        ? "Sakin kalıp doğrulama sorusu sorarak bunun bir yapay zeka klonlaması olduğunu anladınız."
                        : "Panikle hareket ettiniz. Telefondaki ses, kızınızın sosyal medyadaki videolarından üretilmiş bir Deepfake sesiydi."}
                    lesson="Aile içi güvenlik parolası belirleyin. Yapay zeka ile sesler kolayca klonlanabilir, telefonda duyduğunuz sesin gerçek olduğundan emin olmak için özel bir soru sorun."
                    onReset={() => { setPhase("player"); setIsPlaying(false); }}
                />
                </div>
            )}
        </div>
    );
}
