"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim17() {
    const [phase, setPhase] = useState<"website" | "payment" | "result">("website");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-white min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-300 flex flex-col font-serif relative max-w-sm sm:max-w-md mx-auto text-gray-800">

            {/* Website Header - Outside AnimatePresence since it persists */}
            <div className="bg-blue-900 text-white p-4 text-center border-b-4 border-yellow-500 z-10">
                <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider">Int. Science Congress 2024</h1>
                <p className="text-xs text-blue-200 mt-1">Barcelona, Spain | 15-18 July</p>
            </div>

            <AnimatePresence mode="wait">

                {phase === "website" && (
                    <motion.div
                        key="website"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 p-6 bg-gray-50 overflow-y-auto"
                    >
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-blue-900 border-b border-blue-200 pb-2 mb-4">Ana Konuşmacılar</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 bg-white p-2 rounded shadow-sm">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-2xl">👨‍🔬</div>
                                        <div>
                                            <div className="font-bold text-sm">Prof. Dr. John Doe</div>
                                            <div className="text-xs text-gray-500">Nobel Ödüllü Fizikçi</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-white p-2 rounded shadow-sm">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-2xl">👩‍🔬</div>
                                        <div>
                                            <div className="font-bold text-sm">Dr. Jane Smith</div>
                                            <div className="text-xs text-gray-500">CERN Direktörü</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 bg-white p-4 rounded shadow border border-gray-200">
                                <h3 className="text-lg font-bold text-red-600 mb-2">Erken Kayıt Fırsatı!</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Erken kayıt indirimi için son 2 saat! Konaklama dahil sadece <span className="font-bold text-black">€450</span>.
                                </p>
                                <button
                                    onClick={() => setPhase("payment")}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-bold transition-colors"
                                >
                                    Kayıt Ol ve Öde
                                </button>
                                <p className="text-[11px] text-gray-400 mt-2 text-center">*Kredi kartı ile güvenli ödeme</p>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-xs text-yellow-800">
                            <strong>Dikkat:</strong> Bu konferansın web sitesi 3 gün önce açılmış (Whois sorgusu). Resmi üniversite sponsorluğu görünmüyor.
                        </div>
                    </motion.div>
                )}

                {phase === "payment" && (
                    <motion.div
                        key="payment"
                        initial={{ x: "100%" }} animate={{ x: 0 }}
                        className="absolute inset-0 bg-white z-20 flex flex-col p-6"
                    >
                        <button onClick={() => setPhase("website")} className="self-start text-blue-500 mb-4">← Geri Dön</button>

                        <h2 className="text-xl font-bold text-gray-800 mb-6">Ödeme Sayfası</h2>
                        <div className="space-y-4 max-w-md mx-auto w-full">
                            <input type="text" placeholder="Ad Soyad" className="w-full border p-3 rounded bg-gray-50" />
                            <input type="text" placeholder="Kurum/Üniversite" className="w-full border p-3 rounded bg-gray-50" />
                            <div className="border-t pt-4"></div>
                            <input type="text" placeholder="Kart Numarası" className="w-full border p-3 rounded" />
                            <div className="flex gap-4">
                                <input type="text" placeholder="MM/YY" className="flex-1 border p-3 rounded" />
                                <input type="text" placeholder="CVV" className="flex-1 border p-3 rounded" />
                            </div>

                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold shadow-lg mt-4"
                            >
                                €450 Öde
                            </button>

                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="w-full text-red-500 text-sm font-bold hover:underline mt-2"
                            >
                                Şüpheli Siteyi Kapat (Araştır)
                            </button>
                        </div>
                    </motion.div>
                )}

                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto font-sans">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Akademik Sahteciliği Fark Ettiniz!" : "Sahte Konferansa Para Kaptırdınız!"}
                            message={correct
                                ? "Mükemmel araştırma! Web sitesinin yeni açıldığını ve konuşmacı listesinin 'fazla iyi' (gerçek dışı) olduğunu fark ettiniz. Resmi kurumlardan teyit almadan ödeme yapmadınız."
                                : "Tuzağa düştünüz. 'Nobel ödüllü konuşmacı' ve 'Barcelona' gibi cazip vaatlere kandınız. Parayı ödediniz ama ne konferans var ne de bir muhatap."}
                            lesson="Yırtıcı dergiler (Predatory Journals) ve sahte konferanslar akademik dünyada yaygındır. Siteyi Whois'den sorgulayın, önceki yılların kayıtlarına bakın."
                            onReset={() => setPhase("website")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
