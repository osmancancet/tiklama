"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim15() {
    const [phase, setPhase] = useState<"incoming" | "call" | "result">("incoming");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-gray-900 min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col font-sans relative max-w-sm mx-auto">

            {/* Phone Screen Container */}
            <AnimatePresence mode="wait">
                {phase === "incoming" && (
                    <motion.div
                        key="incoming"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-between py-12 bg-gray-900"
                    >
                        <div className="text-center mt-8">
                            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-white/20 overflow-hidden">
                                <span className="text-4xl">🏦</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-1">Müşteri Hiz.</h2>
                            <p className="text-lg text-gray-400">0850 444 0 444</p>
                            <p className="text-xs text-red-500 mt-2 font-bold animate-pulse">! Şüpheli Arama Olabilir</p>
                        </div>

                        <div className="w-full px-8 flex justify-between items-center mb-8">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-500/30">
                                    📞
                                </div>
                                <span className="text-sm text-white font-medium">Reddet</span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setPhase("call")}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl animate-pulse shadow-lg shadow-green-500/30">
                                    📞
                                </div>
                                <span className="text-sm text-white font-medium">Aç</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {phase === "call" && (
                    <motion.div
                        key="call"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center bg-gray-800 p-6"
                    >
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-white">Müşteri Hiz.</h3>
                            <p className="text-sm text-green-400">00:12</p>
                        </div>

                        <div className="bg-white/10 p-4 rounded-xl text-center mb-8 border border-white/5">
                            <p className="text-lg italic text-gray-300">
                                "İyi günler Osman Bey. Bankanızdan arıyoruz. Kart aidat iadenizi yatırmak için aradık. İşlemi onaylamak için lütfen kartınızın ön yüzündeki 16 haneli numarayı tuşlayın."
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => { setCorrect(false); setPhase("result"); }}
                                    className="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-2xl font-bold transition-colors"
                                >
                                    {num}
                                </button>
                            ))}
                            <div className="col-span-3 flex justify-center mt-4">
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full font-bold shadow-lg"
                                >
                                    📞 Kapat ve İnanma
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {phase === "result" && (
                    <motion.div className="absolute inset-0 bg-gray-900 z-30 p-4 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Bilinçli Davrandınız!" : "Kart Bilgilerinizi Verdiniz!"}
                            message={correct
                                ? "Tebrikler. Bankalar veya devlet kurumları ASLA telefonda şifre veya kart numarası tuşlamanızı istemez. Telefonu kapatıp bankayı kendiniz aramanız en doğrusudur."
                                : "Tuşlama yaparak kart numaranızı dolandırıcılara verdiniz. 'Aidat iadesi', 'Bonus kazandınız' gibi yalanlar yaşlıları hedef alan klasik yöntemlerdir."}
                            lesson="Telefonda size 'para iadesi yapacağız' veya 'hesabınız çalındı' diyenlere inanmayın. Bankayı, kartın arkasındaki numaradan KENDİNİZ arayın."
                            onReset={() => setPhase("incoming")}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
