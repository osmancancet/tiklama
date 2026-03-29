"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim21() {
    const [phase, setPhase] = useState<"ad" | "platform" | "result">("ad");
    const [correct, setCorrect] = useState(false);
    const [balance, setBalance] = useState(1000);
    const [graphData, setGraphData] = useState<number[]>([]);

    useEffect(() => {
        if (phase === "platform") {
            const interval = setInterval(() => {
                setBalance(prev => prev + (prev * 0.05)); // Fake 5% profit every tick
                setGraphData(prev => [...prev, Math.random() * 10].slice(-20));
            }, 500);
            return () => clearInterval(interval);
        }
    }, [phase]);

    return (
        <div className="bg-gray-900 min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-sans relative max-w-sm sm:max-w-md mx-auto">

            <AnimatePresence mode="wait">
                {/* DEEPFAKE AD PHASE */}
                {phase === "ad" && (
                    <motion.div
                        key="ad"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-6 bg-black"
                    >
                        <div className="w-full aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group">
                            {/* Fake Video Thumbnail */}
                            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80")' }}></div>
                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-4xl z-10 cursor-pointer group-hover:scale-110 transition-transform">▶️</div>
                            <div className="absolute bottom-2 left-2 bg-red-600 text-white text-[11px] px-1 rounded">SPONSORED</div>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-2 text-center">"Devlet Destekli Yatırım Fırsatı!"</h2>
                        <p className="text-gray-400 text-sm text-center mb-6">
                            Ünlü iş adamı X.Y. açıklıyor: "Her Türk vatandaşı bu sistemle ayda 50.000 TL kazanabilir."
                        </p>

                        <button
                            onClick={() => setPhase("platform")}
                            className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full animate-pulse"
                        >
                            HEMEN BAŞVUR 🚀
                        </button>
                    </motion.div>
                )}

                {/* FAKE PLATFORM PHASE */}
                {phase === "platform" && (
                    <motion.div
                        key="platform"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col bg-slate-900"
                    >
                        <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                            <span className="font-bold text-white">ForexProTrade (Sahte)</span>
                            <span className="text-xs text-green-400">Canlı ●</span>
                        </div>

                        <div className="p-6 text-center">
                            <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-1">TOPLAM BAKİYENİZ</h3>
                            <div className="text-4xl font-bold text-green-400 mb-6">
                                ${balance.toFixed(2)}
                            </div>

                            {/* Fake Graph */}
                            <div className="h-32 flex items-end justify-between gap-1 mb-8 opacity-50">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-full bg-green-500 rounded-t"
                                        style={{ height: `${Math.random() * 100}%`, transition: 'height 0.5s' }}
                                    ></div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => { setCorrect(false); setPhase("result"); }}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded font-bold"
                                >
                                    💸 Para Yatır (Kredi Çek)
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="w-full border border-red-500 text-red-500 hover:bg-red-500/10 py-3 rounded font-bold"
                                >
                                    🛑 İnanma (SPK Lisansı Yok)
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* RESULT */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Yatırım Tuzağına Düşmediniz!" : "Tüm Birikiminiz Gitti!"}
                            message={correct
                                ? "Tebrikler. 'Kısa yoldan zenginlik' vaat eden, ünlülerin yüzünü yapay zeka (Deepfake) ile kullanan reklamlara inanmadınız. SPK lisansı olmayan kurumlara para yatırmamak en doğrusu."
                                : "Ekranda artan rakamlara aldandınız. O bakiye tamamen sahte. Gerçekte paranız dolandırıcıların kripto cüzdanına gitti ve asla çekemeyeceksiniz."}
                            lesson="Yatırım yapmadan önce kurumun SPK lisansını sorgulayın. Ünlülerin 'gizli yatırım tavsiyesi' verdiği videolar genellikle Deepfake (Sahte) üretimdir."
                            onReset={() => { setPhase("ad"); setBalance(1000); }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
