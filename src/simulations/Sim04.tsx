"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim04() {
    const [phase, setPhase] = useState<"scene" | "interaction" | "result">("scene");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="relative min-h-[480px] sm:min-h-[520px] max-w-sm sm:max-w-md mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 font-sans">

            {/* Background (Office Entrance) */}
            <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")' }}>
            </div>

            <AnimatePresence mode="wait">
                {/* IDLE SCENE */}
                {phase === "scene" && (
                    <motion.div
                        key="scene"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="relative h-full flex flex-col items-center justify-center p-6"
                    >
                        <div className="bg-black/80 backdrop-blur-md p-6 rounded-2xl max-w-sm text-center border border-white/10 shadow-xl">
                            <span className="text-4xl mb-4 block">🏢</span>
                            <h2 className="text-xl font-bold text-white mb-2">Plaza Girişi</h2>
                            <p className="text-gray-300 text-sm mb-6">
                                Sabah işe girerken turnikelere kartınızı okutuyorsunuz. Arkanızdan şık giyimli, elinde kahveler olan biri size sesleniyor.
                            </p>
                            <button
                                onClick={() => setPhase("interaction")}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105 text-sm sm:text-base min-h-[44px]"
                            >
                                Arkana Dön
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* INTERACTION SCENE */}
                {phase === "interaction" && (
                    <motion.div
                        key="interaction"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="relative h-full flex flex-col items-center justify-end p-0 md:p-6"
                    >
                        {/* Character */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-32 md:bottom-20 w-48 h-48 md:w-64 md:h-64 bg-gray-200 rounded-full border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden z-10"
                        >
                            <span className="text-8xl md:text-9xl mt-4">👨‍💼</span>
                        </motion.div>

                        {/* Dialogue Bubble */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                            className="bg-white text-gray-800 p-4 md:p-6 rounded-2xl rounded-bl-none shadow-2xl max-w-xs md:max-w-md relative z-20 mb-4 md:mb-8"
                        >
                            <h3 className="font-bold text-blue-600 text-sm mb-1">Tanımadığın Kişi</h3>
                            <p className="text-sm md:text-base leading-relaxed">
                                "Merhaba! Günaydın... Ellerim kahvelerle dolu da, kartımı çıkarmakta zorlanıyorum. Rica etsem benim için de okutabilir misin? Zaten geç kaldım, bir de güvenlik prosedürüyle uğraşmayayım..."
                            </p>
                        </motion.div>

                        {/* Choices */}
                        <div className="w-full max-w-md grid grid-cols-1 gap-3 relative z-30 mb-8 md:mb-0">
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="bg-[#10B981] hover:bg-[#059669] text-white p-4 rounded-xl font-bold flex items-center gap-3 transition-colors shadow-lg group"
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform">🤝</span>
                                <div className="text-left">
                                    <span className="block text-sm">Elbette, buyurun</span>
                                    <span className="text-xs text-white/70 font-normal">Kartınızı okutup geçirin</span>
                                </div>
                            </button>

                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-[#EF4444] hover:bg-[#DC2626] text-white p-4 rounded-xl font-bold flex items-center gap-3 transition-colors shadow-lg group"
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform">🛡️</span>
                                <div className="text-left">
                                    <span className="block text-sm">Üzgünüm, yapamam</span>
                                    <span className="text-xs text-white/70 font-normal">Güvenliğe yönlendirin</span>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* RESULT SCENE */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Güvenlik İhlali Önlendi!" : "Tailgating Saldırısı Başarılı!"}
                            message={correct
                                ? "Nezaket kuralları güvenlikten önemli değildir. Kişiyi güvenliğe yönlendirerek izinsiz birinin binaya girmesini (veya kartsız giriş yapılmasını) engellediniz."
                                : "Nezaketinize yenildiniz. 'Tailgating' (Kuyruk Takibi) saldırısına izin verdiniz. Bu kişi rakip firma casusu veya kötü niyetli biri olabilirdi."}
                            lesson="Profesyonel nezaket güvenlik açıklarına sebep olmamalıdır. Kartını unutan veya 'elleri dolu' olan kişileri her zaman güvenlik görevlisine yönlendirin."
                            onReset={() => setPhase("scene")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
