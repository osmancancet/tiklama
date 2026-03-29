"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim08() {
    const [phase, setPhase] = useState<"setup" | "cracking" | "result">("setup");
    const [password, setPassword] = useState("");
    const [correct, setCorrect] = useState(false);
    const [progress, setProgress] = useState(0);

    const checkStrength = (pass: string) => {
        let score = 0;
        if (pass.length > 7) score += 1;
        if (pass.length > 11) score += 1;
        if (/[A-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^A-Za-z0-9]/.test(pass)) score += 1;
        return score; // Max 5
    };

    const handleTest = () => {
        const score = checkStrength(password);
        if (score < 4) {
            setCorrect(false);
            setPhase("cracking");
        } else {
            setCorrect(true);
            setPhase("result");
        }
    };

    useEffect(() => {
        if (phase === "cracking") {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setPhase("result");
                        return 100;
                    }
                    return prev + 2;
                });
            }, 30); // Fast crack visualization
            return () => clearInterval(interval);
        }
    }, [phase]);

    return (
        <div className="bg-gray-900 min-h-[480px] sm:min-h-[520px] max-w-sm sm:max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-mono text-green-500 relative p-6">

            <AnimatePresence mode="wait">
                {phase === "setup" && (
                    <motion.div
                        key="setup"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 animate-pulse">Yeni Şifre Belirle</h2>

                        <div className="w-full mb-8">
                            <label className="block text-gray-400 text-xs mb-2">YENİ ŞİFRE GİRİNİZ:</label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-green-500/50 rounded p-4 text-xl text-center text-white focus:outline-none focus:border-green-400 transition-colors"
                                placeholder="Şifreniz..."
                            />

                            {/* Strength Bar */}
                            <div className="flex mt-2 gap-1 h-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`flex-1 rounded-full transition-colors duration-300 ${i < checkStrength(password)
                                        ? (checkStrength(password) < 3 ? "bg-red-500" : checkStrength(password) < 4 ? "bg-yellow-500" : "bg-green-500")
                                        : "bg-gray-800"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-center text-xs mt-2 text-gray-500">
                                {checkStrength(password) < 3 ? "Çok Zayıf" : checkStrength(password) < 4 ? "Orta" : "Güçlü"}
                            </p>
                        </div>

                        <button
                            onClick={handleTest}
                            disabled={!password}
                            className="bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 disabled:scale-100 disabled:opacity-50 text-sm sm:text-base min-h-[44px]"
                        >
                            TEST ET VE ONAYLA
                        </button>
                    </motion.div>
                )}

                {phase === "cracking" && (
                    <motion.div
                        key="cracking"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-4 w-full bg-black font-mono text-green-500 overflow-hidden relative"
                    >
                        {/* Matrix Background Effect (Simple CSS Animation) */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-around">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="animate-[pulse_0.5s_infinite] text-xs writing-vertical">
                                    {Math.random().toString(36).substring(2, 10)} 10101
                                </div>
                            ))}
                        </div>

                        <div className="text-6xl mb-4 animate-bounce">🔓</div>
                        <h2 className="text-xl text-red-500 font-bold mb-8 animate-pulse text-center">
                            BRUTE FORCE ATTACK<br />INITIATED...
                        </h2>

                        <div className="w-full max-w-sm bg-gray-900 border border-green-500/30 rounded-lg p-4 font-mono text-xs h-32 overflow-hidden flex flex-col-reverse shadow-[0_0_15px_rgba(0,255,0,0.2)]">
                            <div className="text-green-400">
                                &gt; Access granted: {progress >= 98 ? "YES" : "NO"}
                            </div>
                            <div className="text-green-500/80">
                                &gt; Progress: [{Array(Math.floor(progress / 5)).fill("=").join("")}{Array(20 - Math.floor(progress / 5)).fill(" ").join("")}] {Math.floor(progress)}%
                            </div>
                            <div className="text-green-600/60">
                                &gt; Trying: {Math.random().toString(36).slice(-8)}
                            </div>
                            <div className="text-green-700/40">
                                &gt; Trying property: user_password
                            </div>
                            <div className="text-green-800/30">
                                &gt; Connecting to 192.168.1.1:80...
                            </div>
                        </div>
                    </motion.div>
                )}

                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Güçlü Şifre: Kırılamadı!" : "Şifreniz Saniyeler İçinde Kırıldı!"}
                            message={correct
                                ? "Tebrikler! Karmaşık karakterler, sayılar ve yeterli uzunluk kullandığınız için Brute-Force saldırıları başarısız oldu."
                                : "Seçtiğiniz şifre çok basitti. Saldırganlar otomatik araçlarla bu şifreyi saniyeler içinde çözebilir."}
                            lesson="Şifreleriniz en az 12 karakter; büyük/küçük harf, rakam ve özel karakter içermelidir. Veya daha iyisi: Passphrase (Parola Cümlesi) kullanın."
                            onReset={() => { setPhase("setup"); setPassword(""); setProgress(0); }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
