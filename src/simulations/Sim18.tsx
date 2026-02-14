"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim18() {
    const [phase, setPhase] = useState<"diagram" | "result">("diagram");
    const [correct, setCorrect] = useState(false);

    return (
        <div>
            {phase === "diagram" && (
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-center mb-8 font-bold text-xl">Aracı (Sazan Sarmalı) Nasıl Çalışır?</h3>

                    <div className="relative h-64 bg-zinc-900 rounded-xl border border-zinc-700 p-4">

                        {/* Seller */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="absolute top-4 left-4 w-32 bg-blue-900/50 border border-blue-500 p-3 rounded text-center"
                        >
                            <span className="text-2xl">🚗</span>
                            <p className="font-bold text-blue-400">Satıcı</p>
                            <p className="text-xs text-blue-200">Aracını 900.000 TL'ye satıyor</p>
                        </motion.div>

                        {/* Buyer (User) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                            className="absolute top-4 right-4 w-32 bg-green-900/50 border border-green-500 p-3 rounded text-center"
                        >
                            <span className="text-2xl">👤</span>
                            <p className="font-bold text-green-400">Siz (Alıcı)</p>
                            <p className="text-xs text-green-200">Aracı 600.000 TL'ye (Ucuza) buldu</p>
                        </motion.div>

                        {/* Scammer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 bg-red-900/50 border border-red-500 p-3 rounded text-center z-10"
                        >
                            <span className="text-2xl">🎭</span>
                            <p className="font-bold text-red-500">Dolandırıcı (Aracı)</p>
                            <p className="text-xs text-red-200">Satıcıyı "Alıcı babam", Alıcıyı "Satıcı dayım" diye kandırıyor.</p>
                        </motion.div>

                        {/* Connections */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <motion.line x1="20%" y1="30%" x2="50%" y2="70%" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }} />
                            <motion.line x1="80%" y1="30%" x2="50%" y2="70%" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 1 }} />
                        </svg>

                    </div>

                    <div className="mt-8 bg-zinc-800 p-6 rounded-xl border border-zinc-600">
                        <p className="mb-4 text-center">Noterde satış anı. Aracı diyor ki:</p>
                        <p className="italic text-yellow-400 text-center mb-6">"Dayım (Satıcı) biraz yaşlıdır, para işlerinden anlamaz. Sen parayı benim hesabıma gönder, ben ona veririm."</p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="flex-1 btn-danger"
                            >
                                💸 Aracıya Gönder (Ruhsat Sahibine Değil)
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="flex-1 btn-safe"
                            >
                                🛑 Dur! Sadece Ruhsat Sahibine Gönderirim
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Tuzağı Bozdunuz!" : "Hem Para Hem Araba Gitti!"}
                    message={correct
                        ? "Para sadece ruhsat sahibinin (Satıcının) adına kayıtlı banka hesabına gönderilir. Bu kuralı bildiğiniz için dolandırıcı kaçtı."
                        : "Parayı aracıya gönderdiniz. Satıcı 'Param gelmedi' diyerek imzayı atmadı. Dolandırıcı parayla birlikte kayıplara karıştı."}
                    lesson="Sazan Sarmalı tuzağına düşmemek için kural basit: Para sadece ve sadece noterdeki ruhsat sahibi kimse, onun hesabına gönderilir. Aracı, akraba, kuzen kabul edilemez."
                    onReset={() => setPhase("diagram")}
                />
            )}
        </div>
    );
}
