"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim24() {
    const [phase, setPhase] = useState<"telegram" | "blackmail" | "result">("telegram");

    return (
        <div>
            {/* Telegram Channel UI */}
            {phase === "telegram" && (
                <div className="max-w-md mx-auto bg-[#17212b] rounded overflow-hidden shadow-xl text-white font-sans h-[500px] flex flex-col">
                    <div className="bg-[#242f3d] p-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">Ö</div>
                        <div>
                            <p className="font-bold">ÖSYM Soruları Teyitli 2024</p>
                            <p className="text-xs text-zinc-400">14.500 abone</p>
                        </div>
                    </div>

                    <div className="flex-1 bg-[#0e1621] p-4 overflow-y-auto space-y-4">
                        <div className="bg-[#182533] p-2 rounded-lg max-w-[85%] self-start">
                            <div className="h-32 bg-white/10 rounded mb-2 overflow-hidden relative">
                                {/* Blurred Image */}
                                <div className="absolute inset-0 bg-white blur-xl opacity-30"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-400">
                                    [GÖRÜNTÜ SANSÜRLENDİ]
                                </div>
                            </div>
                            <p className="text-sm">Matematik 2. oturum soruları elimize ulaştı! Fiyat sadece 1500 TL. Sınavdan sonra 10k olacak. Almak isteyenler DM.</p>
                            <span className="text-[10px] text-zinc-500 block text-right mt-1">11:45</span>
                        </div>
                    </div>

                    <div className="p-3 bg-[#17212b]">
                        <button
                            onClick={() => setPhase("blackmail")}
                            className="w-full bg-[#5288c1] hover:bg-[#4679ae] text-white py-3 rounded font-bold"
                        >
                            DM: "Satın Almak İstiyorum" (1500 TL Gönder)
                        </button>
                    </div>
                </div>
            )}

            {/* Blackmail UI */}
            {phase === "blackmail" && (
                <div className="max-w-md mx-auto bg-[#17212b] rounded p-4 text-white text-center">
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-red-500/20 text-red-400 p-4 rounded mb-6 border border-red-500/50">
                        <h3 className="font-bold text-lg mb-2">⚠️ TUZAK!</h3>
                        <p className="text-sm">Parayı gönderdiniz ama sorular gelmedi...</p>
                    </motion.div>

                    <div className="bg-[#182533] p-4 rounded text-left mb-6">
                        <p className="font-bold text-red-400 mb-1">Admin:</p>
                        <p className="text-sm">"Kimlik bilgilerini ve IBAN ismini bulduk Ecrin. Soruları almaya çalıştığını ailene ve okuluna bildirmememizi istiyorsan 5000 TL daha ateşle. Yoksa hayatın kayar."</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setPhase("result")}
                            className="flex-1 bg-zinc-700 py-3 rounded hover:bg-zinc-600 text-sm"
                        >
                            Korktum, parayı atıyorum...
                        </button>
                        <button
                            onClick={() => setPhase("result")}
                            className="flex-1 bg-blue-600 py-3 rounded hover:bg-blue-500 font-bold text-sm"
                        >
                            Engelle ve İhbar Et
                        </button>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={true} // Lesson is important regardless of choice
                    title="Soru Yok, Şantaj Var!"
                    message="ÖSYM soruları sızdırılamaz. Bu gruplar tamamen dolandırıcıdır. Parayı kaptırdığınız yetmezmiş gibi bir de 'suça teşebbüs ettiğiniz' için şantaja maruz kalırsınız."
                    lesson="Sınav sorularını sattığını iddia edenlere asla inanmayın. Şantaja boyun eğmeyin, para göndermeyi kesin ve savcılığa başvurun."
                    onReset={() => setPhase("telegram")}
                />
            )}
        </div>
    );
}
