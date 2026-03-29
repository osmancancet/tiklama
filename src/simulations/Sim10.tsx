"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim10() {
    const [phase, setPhase] = useState<"login" | "dashboard" | "result">("login");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-gray-100 min-h-[480px] sm:min-h-[520px] max-w-sm sm:max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-400 flex flex-col font-sans relative">
            <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">📹</span>
                    <h2 className="font-bold text-gray-700">Akıllı Kamera Kurulum</h2>
                </div>
                <div className="text-xs text-gray-500">v2.1.0</div>
            </div>

            <AnimatePresence mode="wait">
                {phase === "login" && (
                    <div className="relative h-full flex flex-col">
                        {/* Fake Camera Feed Background */}
                        <div className="absolute inset-0 z-0 bg-black">
                            <img
                                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80"
                                alt="Living Room Camera"
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded text-red-500 font-mono text-xs animate-pulse border border-red-500/50">
                                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                                REC
                            </div>
                            <div className="absolute top-4 left-4 text-white font-mono text-xs bg-black/50 px-2 py-1 rounded">
                                CAM_01 • {new Date().toLocaleTimeString()}
                            </div>

                            {/* Viewer Count - Pressure Element */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 }}
                                className="absolute bottom-4 left-4 bg-red-900/80 text-white px-3 py-1 rounded border border-red-500/50 text-xs flex items-center gap-2"
                            >
                                👁️ <span className="font-bold">LIVE VIEWERS: {Math.floor(Date.now() / 1000 % 10) + 1}</span>
                            </motion.div>
                        </div>

                        {/* Login Modal Overlay */}
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
                        >
                            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 max-w-sm w-full text-center relative overflow-hidden">
                                {/* Alert Banner */}
                                <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-[11px] py-1 font-bold tracking-widest animate-pulse">
                                    UNAUTHORIZED ACCESS DETECTED
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">Cihaz Erişimi</h3>
                                    <p className="text-xs text-gray-500 mb-6">Fabrika şifresi (admin/admin) savunmasızdır.</p>

                                    <div className="space-y-3 mb-6">
                                        <button
                                            onClick={() => { setCorrect(false); setPhase("result"); }}
                                            className="w-full border border-gray-300 bg-gray-50 text-gray-600 py-3 rounded hover:bg-gray-100 transition-colors text-sm sm:text-base flex items-center justify-center gap-2 group min-h-[44px]"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform">⏩</span> Geç (Riske At)
                                        </button>
                                        <button
                                            onClick={() => { setCorrect(true); setPhase("result"); }}
                                            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group min-h-[44px]"
                                        >
                                            🔒 Yeni Şifre Oluştur
                                        </button>
                                    </div>

                                    <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-[11px] text-yellow-800 text-left flex gap-2">
                                        <span className="text-lg">⚠️</span>
                                        <span><strong>Uyarı:</strong> Şu an şifreniz varsayılan olduğu için kamera görüntünüz internette yayınlanıyor olabilir.</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Eviniz Güvende!" : "Kameranız İzlendi!"}
                            message={correct
                                ? "Harika! Varsayılan şifreleri değiştirmek, IoT cihaz güvenliğinin ilk ve en önemli kuralıdır. Artık Mirai gibi botnetler cihazınızı ele geçiremez."
                                : "Büyük hata! 'admin/admin' gibi varsayılan şifreleri değiştirmediniz. Shodan gibi arama motorlarında kameranız listelendi ve tüm dünyadan izlenebilir hale geldi."}
                            lesson="Akıllı ev aletleri, modemler ve kameralar satın aldığınızda İLK işiniz varsayılan şifreyi değiştirmek ve varsa güncellemeleri yapmaktır."
                            onReset={() => setPhase("login")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
