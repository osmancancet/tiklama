"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim07() {
    const [phase, setPhase] = useState<"player" | "decision" | "result">("player");
    const [correct, setCorrect] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
        } else {
            const text = "Baba... Baba yardım et! Çok kötü bir kaza yaptım... Lütfen babacığım, acil paraya ihtiyacım var... Telefonum kapanmak üzere, lütfen yardım et!";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "tr-TR";
            utterance.pitch = 1.2; // Biraz daha tiz (çocuksu/kadınsı)
            utterance.rate = 1.1;  // Telaşlı ve hızlı

            utterance.onend = () => setIsPlaying(false);

            window.speechSynthesis.cancel(); // Öncekileri temizle
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        }
    };

    return (
        <div>
            {phase === "player" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto">
                    <div className="bg-bg-card border border-border-color rounded-2xl p-6 shadow-2xl relative overflow-hidden">

                        {/* Audio Wave Visualization (Fake) */}
                        <div className="flex items-center justify-center gap-1 h-32 mb-6">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-neon-blue rounded-full"
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
                            <p className="text-xs text-text-muted mb-2">Bilinmeyen Numara</p>
                            <h3 className="text-2xl font-bold text-text-primary mb-1">05XX XXX XX XX</h3>
                            <p className="text-sm text-danger-red italic">&quot;Baba yardım et, çok kötüyüm...&quot;</p>
                        </div>

                        <div className="flex justify-center gap-4 mb-4">
                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl hover:scale-105 transition-transform shadow-lg shadow-white/20 active:scale-95"
                            >
                                {isPlaying ? "⏸" : "▶"}
                            </button>
                        </div>

                        <p className="text-center text-xs text-text-secondary mb-6">
                            {isPlaying ? "Ses oynatılıyor..." : "Sesi dinlemek için oynatın"}
                        </p>

                        <button
                            onClick={() => setPhase("decision")}
                            className="w-full py-3 bg-zinc-800 text-white rounded-xl border border-zinc-700 hover:bg-zinc-700"
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
                            className="btn-danger text-center py-4"
                        >
                            💸 Hemen Parayı Gönder (Panik)
                        </button>
                        <button
                            onClick={() => { setCorrect(true); setPhase("result"); }}
                            className="btn-safe text-center py-4"
                        >
                            🔒 Aile Parolasını / Özel Bir Anı Sor
                        </button>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Deepfake Tespit Edildi!" : "Yapay Zeka Tuzağı!"}
                    message={correct
                        ? "Sakin kalıp doğrulama sorusu sorarak bunun bir yapay zeka klonlaması olduğunu anladınız."
                        : "Panikle hareket ettiniz. Telefondaki ses, kızınızın sosyal medyadaki videolarından üretilmiş bir Deepfake sesiydi."}
                    lesson="Aile içi güvenlik parolası belirleyin. Yapay zeka ile sesler kolayca klonlanabilir, telefonda duyduğunuz sesin gerçek olduğundan emin olmak için özel bir soru sorun."
                    onReset={() => { setPhase("player"); setIsPlaying(false); }}
                />
            )}
        </div>
    );
}
