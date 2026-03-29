"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim25() {
    const [phase, setPhase] = useState<"offer" | "bank" | "police" | "result">("offer");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-gray-100 min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-400 flex flex-col font-sans relative max-w-sm sm:max-w-md mx-auto text-gray-800">

            <AnimatePresence mode="wait">
                {/* 1. THE OFFER */}
                {phase === "offer" && (
                    <motion.div
                        key="offer"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col p-6 bg-white"
                    >
                        <div className="flex items-center gap-3 mb-6 bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl text-white">💵</div>
                            <div>
                                <h3 className="font-bold text-green-800">Kolay Para Fırsatı!</h3>
                                <p className="text-xs text-green-600">Sadece IBAN'ını kirala, kazan.</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-sm text-gray-700 mb-8">
                            <p><strong>Teklif:</strong> "Kardeşim, bizim e-ticaret sitesinin günlük limitleri doldu. Senin IBAN'ını kullanalım, gelen parayı bize gönder, her işlemde 2.000 TL senin olsun."</p>
                            <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                                *Hiçbir şey yapmadan günde 10.000 TL kazanabilirsin!
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 mt-auto">
                            <button
                                onClick={() => setPhase("bank")}
                                className="bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold shadow-lg"
                            >
                                Kabul Et (IBAN'ı Ver)
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded font-bold"
                            >
                                Reddet (Bu Suçtur!)
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 2. BANK ACTIVITY */}
                {phase === "bank" && (
                    <motion.div
                        key="bank"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 bg-gray-50 p-4"
                    >
                        <div className="bg-white rounded-xl shadow p-4 mb-4">
                            <h3 className="font-bold text-gray-800 mb-2 border-b pb-2">Hesap Hareketleri</h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between text-green-600 font-bold">
                                    <span>Gelen Transfer (A.Y.)</span>
                                    <span>+50.000 TL</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>Giden Transfer (Coin B.)</span>
                                    <span>-48.000 TL</span>
                                </div>
                                <div className="flex justify-between text-green-600 font-bold">
                                    <span>Gelen Transfer (B.K.)</span>
                                    <span>+75.000 TL</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                    <span>Giden Transfer (Coin B.)</span>
                                    <span>-73.000 TL</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-2 border-t text-right">
                                <span className="text-gray-500 text-xs">Senin Payın:</span>
                                <span className="text-xl font-bold text-blue-600 block">₺4.000,00</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setPhase("police")}
                            className="w-full bg-blue-600 text-white py-3 rounded font-bold animate-pulse"
                        >
                            Devam Et...
                        </button>
                    </motion.div>
                )}

                {/* 3. POLICE / BLOCKED */}
                {phase === "police" && (
                    <motion.div
                        key="police"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-red-900 z-20 flex flex-col items-center justify-center p-6 text-center text-white"
                    >
                        <div className="text-6xl mb-4">🚔</div>
                        <h2 className="text-2xl font-bold mb-4">HESABINIZ BLOKE EDİLDİ</h2>
                        <p className="mb-6">
                            Banka hesabınız, "Kara Para Aklama" ve "Dolandırıcılık" şüphesiyle MASAK tarafından dondurulmuştur. Hakkınızda savcılık soruşturması başlatılmıştır.
                        </p>
                        <div className="bg-black/30 p-4 rounded border border-red-500/50 text-sm">
                            İfade vermek üzere en yakın Emniyet Müdürlüğü'ne gitmeniz gerekmektedir.
                        </div>
                        <button
                            onClick={() => { setCorrect(false); setPhase("result"); }}
                            className="mt-8 bg-white text-red-900 px-8 py-3 rounded-full font-bold"
                        >
                            Sonucu Gör
                        </button>
                    </motion.div>
                )}

                {/* RESULT */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Suça Ortak Olmadınız!" : "Hayatınız Karardı!"}
                            message={correct
                                ? "Tebrikler. Banka hesabını başkasına kullandırmak (kiralatmak) Türk Ceza Kanunu'na göre suçtur. 'Kolay para' vaadine kanmayarak kendinizi hapis cezasından kurtardınız."
                                : "Büyük felaket. Hesabınız üzerinden geçen paralar çalıntıydı. Siz sadece 3-5 bin lira kazandığınızı sanırken aslında 'Money Mule' (Para Kuryesi) olarak uluslararası bir suç örgütüne yardım ettiniz. Hapis cezasıyla yargılanacaksınız."}
                            lesson="IBAN Şifreniz, kimliğiniz gibidir. Asla başkasına kullandırmayın. Hesabınıza gelen kaynağı belirsiz parayı hemen bankaya bildirin."
                            onReset={() => setPhase("offer")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
