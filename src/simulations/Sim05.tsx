"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim05() {
    const [phase, setPhase] = useState<"story" | "scanning" | "result">("story");

    const hackedData = [
        { label: "Konum", value: "Bodrum, Muğla (Ev Boş!)", delay: 0.5 },
        { label: "Kimlik No", value: "TCKN: 123*****890", delay: 1.0 },
        { label: "Uçuş Bilgisi", value: "PNR: XQ923 (Tam İsim Görünüyor)", delay: 1.5 },
        { label: "İş Yeri", value: "X Holding (Kart Fotoğrafından)", delay: 2.0 },
    ];

    useEffect(() => {
        if (phase === "scanning") {
            const timer = setTimeout(() => {
                setPhase("result");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <div>
            {phase === "story" && (
                <div className="max-w-sm mx-auto bg-black border border-zinc-800 rounded-3xl overflow-hidden aspect-[9/16] relative">
                    {/* Instagram Story UI */}
                    <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
                        <div className="h-1 flex-1 bg-white/50 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className="h-full bg-white"
                                onAnimationComplete={() => setPhase("scanning")}
                            />
                        </div>
                    </div>

                    <div className="absolute top-8 left-4 flex items-center gap-2 z-10">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600"></div>
                        <span className="text-white text-sm font-semibold">beyzanur_98</span>
                        <span className="text-white/60 text-xs">2s</span>
                    </div>

                    <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                        <div className="text-center p-6">
                            <span className="text-6xl mb-4 block">✈️</span>
                            <p className="text-white font-bold text-xl mb-2">Tatile Gidiyorum! 🌞</p>
                            <div className="relative inline-block mt-4 transform rotate-6 border-4 border-white p-1 bg-white shadow-xl">
                                <div className="bg-blue-100 p-2 w-48 h-24 flex flex-col justify-center items-center text-black text-xs">
                                    <span className="font-bold text-lg">UÇUŞ KARTI</span>
                                    <span>PNR: XQ923</span>
                                    <span>Beyzanur Yılmaz</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-sm">Sonunda beklenen tatil başladı! 🥳 Evim sana emanet İstanbul 👋</p>
                    </div>
                </div>
            )}

            {phase === "scanning" && (
                <div className="max-w-sm mx-auto bg-black border border-terminal-green rounded-xl p-6 font-mono text-xs">
                    <p className="text-terminal-green mb-4 border-b border-terminal-green/30 pb-2">Analyzing Target Profile...</p>
                    {hackedData.map((data, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: data.delay }}
                            className="mb-2 flex justify-between"
                        >
                            <span className="text-zinc-500">{data.label}:</span>
                            <span className="text-danger-red font-bold">{data.value}</span>
                        </motion.div>
                    ))}
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={false}
                    title="Bilgileriniz İfşa Oldu!"
                    message="Paylaştığınız bir 'Masum' hikaye, hırsızlara evinizin boş olduğunu ve kimlik hırsızlarına kişisel bilgilerinizi verdi."
                    lesson="Konumunuzu 'o an' paylaşmayın, tatil dönüşü paylaşın. Bilet, kimlik ve kredi kartı görsellerini asla paylaşmayın."
                    onReset={() => setPhase("story")}
                />
            )}
        </div>
    );
}
