"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim20() {
    const [phase, setPhase] = useState<"tasks" | "withdraw" | "result">("tasks");
    const [balance, setBalance] = useState(0);
    const [taskCount, setTaskCount] = useState(0);
    const [correct, setCorrect] = useState(false);

    const handleTask = () => {
        setBalance(prev => prev + 50);
        setTaskCount(prev => prev + 1);
    };

    return (
        <div className="bg-gray-900 min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-mono relative max-w-sm sm:max-w-md mx-auto">

            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-lg z-10">
                <div className="text-xs opacity-70 mb-1">TOPLAM KAZANÇ</div>
                <div className="text-4xl font-bold flex items-center gap-2">
                    <span className="text-2xl">₺</span>
                    <motion.span
                        key={balance}
                        initial={{ scale: 1.5, color: "#ffff00" }}
                        animate={{ scale: 1, color: "#ffffff" }}
                    >
                        {balance.toFixed(2)}
                    </motion.span>
                </div>
                <div className="text-xs text-green-300 mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Canlı Sistem
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* TASKS PHASE */}
                {phase === "tasks" && (
                    <motion.div
                        key="tasks"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 p-4 bg-gray-800 relative overflow-hidden"
                    >
                        {/* Fake Social Proof Ticker */}
                        <div className="absolute top-0 left-0 w-full bg-black/30 backdrop-blur text-[11px] text-green-400 whitespace-nowrap overflow-hidden py-1 z-10">
                            <motion.div
                                animate={{ x: ["100%", "-100%"] }}
                                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                className="inline-block"
                            >
                                💸 Ahmet K. 500TL kazandı! • 💸 Ayşe Y. 2000TL çekti! • 💸 Mehmet T. VIP oldu! • 💸 Zeynep S. 150TL kazandı!
                            </motion.div>
                        </div>

                        <h3 className="text-white text-sm mb-4 mt-6 font-bold border-b border-gray-700 pb-2">GÜNLÜK GÖREVLER ({taskCount}/5)</h3>

                        <div className="space-y-4">
                            {taskCount < 5 ? (
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleTask}
                                    className="w-full bg-gray-700 hover:bg-gray-600 border border-gray-600 p-4 rounded-xl flex items-center gap-4 transition-colors group relative overflow-hidden"
                                >
                                    {/* Particle Effect Hint */}
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg shadow-red-500/30">
                                        ▶️
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold group-hover:text-green-400 transition-colors">YouTube Videosunu Beğen</div>
                                        <div className="text-gray-400 text-xs">+50.00 TL</div>
                                    </div>
                                </motion.button>
                            ) : (
                                <div className="text-center py-4">
                                    <motion.div
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        className="text-green-500 text-4xl mb-2"
                                    >
                                        ✅
                                    </motion.div>
                                    <p className="text-white mb-4">Günlük limit doldu! Paran içeride birikti.</p>
                                    <button
                                        onClick={() => setPhase("withdraw")}
                                        className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-green-600/20 animate-bounce"
                                    >
                                        PARAYI ÇEK 💸
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 bg-black/20 p-2 rounded text-[11px] text-gray-500 text-center">
                            *Görevleri tamamla, anında kazan. Yatırım tavsiyesidir. (!)
                        </div>
                    </motion.div>
                )}

                {/* WITHDRAW PHASE */}
                {phase === "withdraw" && (
                    <motion.div
                        key="withdraw"
                        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        className="absolute inset-0 bg-gray-800 z-20 flex flex-col p-6 items-center justify-center"
                    >
                        <h2 className="text-2xl text-white font-bold mb-6">Para Çekme Talebi</h2>
                        <div className="text-4xl text-green-400 font-bold mb-8">₺{balance.toFixed(2)}</div>

                        <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-xl mb-8 max-w-xs text-center">
                            <h3 className="text-red-400 font-bold mb-2">⚠️ Hesabınız Doğrulanmadı</h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Güvenlik nedeniyle parayı çekebilmek için <strong>2.000 TL</strong> teminat yatırarak hesabınızı "VIP Üye" statüsüne yükseltmelisiniz. (Teminat 10 dk sonra iade edilir)
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 w-full max-w-xs">
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-bold"
                            >
                                2.000 TL Teminat Yatır
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-transparent border border-gray-500 text-gray-300 hover:text-white py-3 rounded-lg font-bold"
                            >
                                Dolandırıcılık! (Çık)
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* RESULT */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Ponzi Sistemini Fark Ettiniz!" : "Teminatı Kaptırdınız!"}
                            message={correct
                                ? "Tebrikler. 'Görev yap para kazan' sistemleri klasik bir Ponzi şemasıdır. İlk başta küçük paralar verirler, sonra 'içeride biriken' büyük parayı çekebilmeniz için sizden para isterler."
                                : "Teminatı yatırdınız ama paranızı yine çekemediniz. Şimdi de 'Vergi ödemesi' adı altında 5.000 TL daha isteyecekler. Bu bataklık hiç bitmez."}
                            lesson="İnternette 'Sadece video beğenerek günlük 2000 TL kazan' gibi işler GERÇEK DEĞİLDİR. İş veren size para öder, sizden para istemez."
                            onReset={() => { setPhase("tasks"); setBalance(0); setTaskCount(0); }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
