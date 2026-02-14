"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim08() {
    const [phase, setPhase] = useState<"setup" | "cracking" | "result">("setup");
    const [password, setPassword] = useState("");
    const [correct, setCorrect] = useState(false);
    const [crackTime, setCrackTime] = useState(0); // in ms
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
        <div className="bg-gray-900 min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-mono text-green-500 relative p-6">

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
                            className="bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 disabled:scale-100 disabled:opacity-50"
                        >
                            TEST ET VE ONAYLA
                        </button>
                    </motion.div>
                )}

                {phase === "cracking" && (
                    <motion.div
                        key="cracking"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center"
                    >
                        <div className="text-6xl mb-4">🔓</div>
                        <h2 className="text-xl text-red-500 font-bold mb-8 animate-pulse">ŞİFRE KIRILIYOR...</h2>

                        <div className="w-full max-w-sm bg-gray-800 rounded-full h-4 overflow-hidden mb-2 relative">
                            <motion.div
                                className="bg-red-500 h-full absolute left-0 top-0"
                                style={{ width: `${progress}%` }}
                            ></motion.div>
                        </div>
                        <p className="font-mono text-red-400 w-full text-center">Brute-Force Attack: {Math.floor(progress)}%</p>

                        <div className="mt-8 text-xs text-gray-500 font-mono text-center space-y-1">
                            <p>&gt; trying '123456'...</p>
                            <p>&gt; trying 'password'...</p>
                            <p>&gt; match found!</p>
                        </div>
                    </motion.div>
                )}

                {phase === "result" && (
                    <div className="absolute inset-0 bg-gray-900 z-20 p-4 md:p-12 overflow-y-auto">
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
