"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim06() {
    const [phase, setPhase] = useState<"browser" | "inspection" | "result">("browser");
    const [correct, setCorrect] = useState(false);
    const [showHint, setShowHint] = useState(false);

    return (
        <div className="bg-gray-100 min-h-[480px] sm:min-h-[520px] max-w-sm sm:max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-400 flex flex-col font-sans relative">
            {/* Browser Window Chrome */}
            <div className="bg-gray-200 border-b border-gray-300 p-2 flex items-center gap-3">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 flex gap-2">
                    <div className="bg-white rounded px-3 py-1 text-xs text-gray-600 flex-1 flex items-center justify-between border border-gray-300 relative group cursor-help"
                        onMouseEnter={() => setShowHint(true)}
                        onMouseLeave={() => setShowHint(false)}>
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className="text-gray-400">🔒</span>
                            <span className="truncate">https://secure-banka.com.tr.login-update.xyz/giris</span>
                        </div>
                        <span className="text-[11px] text-blue-500 hover:underline">URL'yi İncele 🔍</span>

                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="absolute top-full left-0 mt-2 bg-yellow-100 border border-yellow-300 text-yellow-800 p-2 rounded text-xs shadow-lg z-50 w-full"
                            >
                                <strong>İpucu:</strong> Alan adına dikkat et! 'secure-banka.com.tr' gerçek alan adı değil, sadece bir alt alan adı (subdomain).
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {phase === "browser" && (
                    <motion.div
                        key="browser"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 bg-white p-4 md:p-8 flex flex-col items-center justify-center relative text-gray-800"
                    >
                        <div className="w-full max-w-sm border border-gray-200 rounded-lg p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">BankaGiriş</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Müşteri No / T.C.</label>
                                    <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="12345678" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Şifre</label>
                                    <input type="password" className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="••••••" />
                                </div>
                                <button
                                    onClick={() => { setCorrect(false); setPhase("result"); }}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors text-sm sm:text-base min-h-[44px]"
                                >
                                    Giriş Yap
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                                <p className="text-xs text-gray-400 mb-4">Güvenliğiniz için URL'yi kontrol ediniz.</p>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="text-red-500 text-sm hover:underline font-semibold"
                                >
                                    ⚠️ Bu site sahte! (Bildir)
                                </button>
                            </div>
                        </div>

                    </motion.div>
                )}

                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Phishing Sitesini Tespit Ettiniz!" : "Kimlik Bilgileriniz Çalındı!"}
                            message={correct
                                ? "Mükemmel dikkat! Adres çubuğundaki (URL) garipliği fark ettiniz. 'login-update.xyz' gibi alakasız bir alan adı kullanılmıştı."
                                : "Görünüşe aldandınız. Site tasarımı birebir aynı olsa da, yukarıdaki adres çubuğu sahte olduğunu haykırıyordu. Bilgilerinizi girdiniz ve korsanlara gönderildi."}
                            lesson="Bir siteye şifre girmeden önce MUTLAKA adres çubuğunu (URL) kontrol edin. Tasarım kopyalanabilir ama alan adı (domain) kopyalanamaz."
                            onReset={() => setPhase("browser")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
