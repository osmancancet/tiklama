"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim10() {
    const [phase, setPhase] = useState<"login" | "dashboard" | "result">("login");
    const [correct, setCorrect] = useState(false);

    // Login form state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (isDefault: boolean) => {
        if (isDefault) {
            // User tried default credentials (admin/admin) - this is actually the "bad" outcome in a real scenario, 
            // but for the simulation, we want them to CHANGE it.
            // Wait, the simulation lesson is usually about CHANGING defaults.
            // Scenario: You bought a new camera. It asks for login.
            // Choice A: Keep using admin/admin (FAIL security)
            // Choice B: Change password (WIN security)

            // Let's adjust: The prompt asks to "Setup Device".
        }
    };

    return (
        <div className="bg-gray-100 min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-400 flex flex-col font-sans relative">
            <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">📹</span>
                    <h2 className="font-bold text-gray-700">Akıllı Kamera Kurulum</h2>
                </div>
                <div className="text-xs text-gray-500">v2.1.0</div>
            </div>

            <AnimatePresence mode="wait">
                {phase === "login" && (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50"
                    >
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-sm w-full text-center">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Cihaz Erişimi</h3>
                            <p className="text-xs text-gray-500 mb-6">Lütfen varsayılan fabrika şifresini değiştiriniz.</p>

                            <div className="space-y-3 mb-6">
                                <button
                                    onClick={() => { setCorrect(false); setPhase("result"); }}
                                    className="w-full border border-gray-300 bg-gray-50 text-gray-600 py-3 rounded hover:bg-gray-100 transition-colors text-sm flex items-center justify-center gap-2"
                                >
                                    <span>⏩</span> Geç (Daha Sonra)
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors text-sm font-bold shadow-lg shadow-blue-500/20"
                                >
                                    🔒 Yeni Şifre Oluştur
                                </button>
                            </div>

                            <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-[10px] text-yellow-800 text-left">
                                <strong>Varsayılan:</strong> Kullanıcı adı 'admin', şifre 'admin' olarak tanımlıdır. Değiştirilmezse internetteki botlar kameranıza erişebilir.
                            </div>
                        </div>
                    </motion.div>
                )}

                {phase === "result" && (
                    <div className="absolute inset-0 bg-white z-20 p-4 md:p-12 overflow-y-auto">
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
