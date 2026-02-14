"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import DecisionModal from "@/components/DecisionModal";
import SimulationResult from "@/components/SimulationResult";

export default function Sim04() {
    const [phase, setPhase] = useState<"video" | "decision" | "result">("video");
    const [correct, setCorrect] = useState(false);

    return (
        <div>
            {/* POV Scene */}
            {phase === "video" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-xl overflow-hidden aspect-video bg-black border border-border-color">
                    {/* Simple CSS illustration of a POV scene */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                        <div className="w-full h-full relative">
                            {/* Turnstile */}
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-zinc-800 border-t-2 border-zinc-700"></div>

                            {/* Person with coffee */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1 }}
                                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
                            >
                                <div className="w-32 h-32 bg-zinc-700 rounded-full mb-2 flex items-center justify-center relative">
                                    <span className="text-6xl">☕</span>
                                    {/* Hands full */}
                                    <span className="absolute -left-10 top-10 text-4xl">📁</span>
                                </div>
                                <div className="bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-600 text-center">
                                    <p className="text-white text-sm">"Pardon, kartımı unuttum da kapıyı tutabilir misin?"</p>
                                </div>
                            </motion.div>
                        </div>

                        <div className="absolute bottom-6 left-0 right-0 text-center">
                            <button
                                onClick={() => setPhase("decision")}
                                className="px-6 py-3 bg-neon-blue text-black font-bold rounded-full hover:scale-105 transition-transform"
                            >
                                Devam Et
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {phase === "decision" && (
                <DecisionModal
                    question="Elleri dolu ve telaşlı görünüyor. Ne yaparsın?"
                    safeOption="Güvenliğe Yönlendir"
                    dangerOption="Kapıyı Tut / Kart Bas"
                    onSafe={() => { setCorrect(true); setPhase("result"); }}
                    onDanger={() => { setCorrect(false); setPhase("result"); }}
                />
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Güvenlik İhlali Önlendi!" : "İçeri Sızıldı!"}
                    message={correct
                        ? "Nezaket tuzağına düşmediniz. Saldırgan güvenlik protokolüne takılırdı."
                        : "Saldırgan (Tailgater) sizin kartınızla içeri girdi ve sunucu odasına erişim sağladı."}
                    lesson="Profesyonel nezaket güvenlikten önemli değildir. Tanımadığınız kişileri güvenliğe yönlendirin, kartlarını sorgulamadan geçirmeyin."
                    onReset={() => setPhase("video")}
                />
            )}
        </div>
    );
}
