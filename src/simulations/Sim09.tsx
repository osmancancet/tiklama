"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim09() {
    const [phase, setPhase] = useState<"game" | "chat_modal" | "result">("game");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="relative min-h-[480px] sm:min-h-[520px] max-w-sm sm:max-w-md mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 font-sans select-none">

            {/* Background Game Scene */}
            <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80")' }}>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Game HUD */}
            <div className="absolute top-4 left-4 flex gap-4">
                <div className="bg-black/50 text-white px-3 py-1 rounded border border-white/20">❤️ 100</div>
                <div className="bg-black/50 text-blue-400 px-3 py-1 rounded border border-white/20">🛡️ 50</div>
            </div>

            <AnimatePresence>
                {/* Chat Area */}
                <div className="absolute bottom-4 left-2 right-2 sm:left-4 sm:right-auto sm:w-72 md:w-80 flex flex-col gap-2">
                    <div className="bg-black/60 p-3 rounded-lg text-xs md:text-sm text-white space-y-2 font-mono h-40 overflow-hidden flex flex-col justify-end shadow-lg border border-white/10">
                        <p className="opacity-50"><span className="text-blue-400">[Team] Viper:</span> B site rush!</p>
                        <p className="opacity-70"><span className="text-yellow-400">[All] NoobSlayer:</span> gg wp</p>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 }}
                            className="bg-purple-900/50 p-2 rounded border border-purple-500/30"
                        >
                            <span className="text-purple-400 font-bold">[PM] GM_Admin_01:</span>
                            <span className="text-white ml-1">Hesabında şüpheli işlem tespit edildi. Ban yememek için hemen doğrula: <span className="text-blue-300 underline cursor-pointer">game-security-verify.com/login</span></span>
                        </motion.div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => { setCorrect(false); setPhase("result"); }}
                            className="bg-purple-600 hover:bg-purple-500 text-white flex-1 py-3 rounded text-xs sm:text-sm font-bold transition-colors shadow-lg min-h-[44px]"
                        >
                            🔗 Linke Tıkla
                        </button>
                        <button
                            onClick={() => { setCorrect(true); setPhase("result"); }}
                            className="bg-red-600 hover:bg-red-500 text-white flex-1 py-3 rounded text-xs sm:text-sm font-bold transition-colors shadow-lg min-h-[44px]"
                        >
                            🚫 Raporla & Engelle
                        </button>
                    </div>
                </div>
            </AnimatePresence>

            {/* Result */}
            {phase === "result" && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                    <SimulationResult
                        isCorrect={correct}
                        title={correct ? "Hesabınızı Çaldırmadınız!" : "Game Over: Hesap Çalındı!"}
                        message={correct
                            ? "Oyun yöneticileri (GM) asla oyun içi sohbetten (PM) size ulaşıp şifre veya link göndermez. Raporlayarak doğru olanı yaptınız."
                            : "Kendini Admin/GM olarak tanıtan dolandırıcıya inandınız. Gönderilen linke tıkladığınız an giriş bilgileriniz (cookies) çalındı ve hesabınız boşaltıldı."}
                        lesson="Oyunlarda 'Bedava Skin', 'RP', veya 'GM Doğrulaması' vaatlerine inanmayın. Yöneticiler asla şifrenizi istemez."
                        onReset={() => setPhase("game")}
                    />
                </div>
            )}
        </div>
    );
}
