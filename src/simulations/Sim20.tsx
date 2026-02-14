"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim20() {
    const [phase, setPhase] = useState<"dashboard" | "withdraw" | "result">("dashboard");
    const [balance, setBalance] = useState(250); // Initial lure amount

    return (
        <div>
            {/* Fake Earnings Dashboard */}
            {phase === "dashboard" && (
                <div className="max-w-lg mx-auto bg-[#0f172a] text-white rounded-xl overflow-hidden shadow-2xl border border-zinc-700">
                    <div className="p-6 bg-gradient-to-r from-indigo-900 to-slate-900 border-b border-zinc-700">
                        <div className="flex justify-between items-center mb-6">
                            <span className="font-bold text-lg text-indigo-400">TaskMaster Earn</span>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">VIP 1 Üye</span>
                        </div>

                        <div className="text-center py-4">
                            <p className="text-zinc-400 text-sm mb-1">Toplam Kazanç</p>
                            <motion.p
                                initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                                className="text-5xl font-bold mb-4"
                            >
                                ₺{balance.toLocaleString()}
                            </motion.p>
                            <div className="flex justify-center gap-4 text-xs">
                                <span className="text-green-400">▲ +₺250 bugün</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <p className="text-sm font-bold text-zinc-300">Günün Görevleri</p>

                        {/* Task Item */}
                        <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">▶️</div>
                                <div>
                                    <p className="font-bold text-sm">YouTube Video Beğen</p>
                                    <p className="text-xs text-zinc-400">3 Video • ₺150 Kazanç</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setBalance(prev => prev + 150)}
                                disabled={balance > 500}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {balance > 500 ? "Tamamlandı" : "Görevi Yap"}
                            </button>
                        </div>

                        {balance > 500 && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="pt-4">
                                <p className="text-yellow-400 text-sm text-center mb-3">Günlük limitinize ulaştınız! Paranızı çekebilirsiniz.</p>
                                <button
                                    onClick={() => setPhase("withdraw")}
                                    className="w-full py-4 bg-green-600 hover:bg-green-500 rounded font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-pulse"
                                >
                                    💰 PARAYI HESABA ÇEK
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}

            {phase === "withdraw" && (
                <div className="max-w-sm mx-auto bg-zinc-800 rounded-xl p-6 border border-zinc-600 text-center">
                    <h3 className="text-xl font-bold mb-4 text-white">VIP 2 Yükseltmesi Gerekli</h3>
                    <p className="text-zinc-300 text-sm mb-6">
                        Kazandığınız 550 TL'yi ve sonraki ödemeleri çekebilmek için hesabınızı VIP 2 seviyesine yükseltmelisiniz. Bu sadece bir teminattır ve geri ödenecektir.
                    </p>

                    <div className="bg-black/50 p-4 rounded mb-6 border border-zinc-700">
                        <p className="text-zinc-400 text-xs mb-1">İstenen Teminat:</p>
                        <p className="text-2xl font-bold text-white">20.000 TL</p>
                    </div>

                    <button
                        onClick={() => setPhase("result")}
                        className="w-full py-3 bg-indigo-600 text-white rounded font-bold mb-3"
                    >
                        Gönder ve Yükselt
                    </button>
                    <button
                        onClick={() => { setPhase("result"); }} // Simplified logic for demo
                        className="text-zinc-400 text-sm hover:text-white"
                    >
                        Vazgeç (Para İçeride Kalsın)
                    </button>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={true} // Educational simulation, always "Correct" outcome is effectively learning the lesson
                    title="Ponzi Şeması Tuzağı!"
                    message="İlk başta 250-500 TL gibi küçük paralar ödeyerek güveninizi kazanırlar. Sonra 'teminat' adı altında sizden 20.000 TL alıp kaybolurlar. İçerideki paranızı asla çekemezsiniz."
                    lesson="İnternetten 'video beğenerek' para kazanılmaz. Bir işveren sizden para istemez, size para öder. Para isteyen her 'iş' teklifi dolandırıcılıktır."
                    onReset={() => { setPhase("dashboard"); setBalance(250); }}
                />
            )}
        </div>
    );
}
