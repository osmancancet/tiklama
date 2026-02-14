"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim11() {
    const [phase, setPhase] = useState<"desktop" | "lock" | "result">("desktop");
    const [correct, setCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(72 * 3600); // 72 hours in seconds

    useEffect(() => {
        if (phase === "lock") {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [phase]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-gray-800 min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 relative font-sans select-none flex flex-col">

            <AnimatePresence mode="wait">
                {/* Normal Desktop Phase */}
                {phase === "desktop" && (
                    <motion.div
                        key="desktop"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 bg-cover bg-center p-4 relative"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1585241936939-be4099591252?auto=format&fit=crop&q=80")' }}
                    >
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur p-2 rounded text-white text-xs">
                            Veteriner Klinik Sistemi v2.0
                        </div>

                        <div className="flex flex-col items-center justify-center h-full">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setPhase("lock")}
                                className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center gap-2 max-w-xs text-center cursor-pointer"
                            >
                                <span className="text-4xl">📎</span>
                                <span className="font-bold text-gray-800">Fatura_Detay.exe</span>
                                <span className="text-xs text-gray-500">(E-postadan indirildi)</span>
                            </motion.button>
                            <p className="mt-4 text-white bg-black/50 px-3 py-1 rounded text-sm">
                                Kliniğe gelen bir e-postadaki eki açmak üzeresiniz...
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Ransomware Lock Screen */}
                {phase === "lock" && (
                    <motion.div
                        key="lock"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-red-900 border-[16px] border-red-700 flex flex-col items-center justify-center text-white p-6 text-center z-20"
                    >
                        <div className="text-6xl mb-4 animate-bounce">💀</div>
                        <h1 className="text-3xl font-bold mb-2 uppercase tracking-widest">Dosyalarınız Şifrelendi!</h1>
                        <p className="max-w-md text-sm mb-6 bg-black/30 p-4 rounded border border-red-500/50">
                            Kliniğinizin tüm hasta kayıtları, röntgenler ve muhasebe verileri askeri düzeyde şifreleme ile kilitlendi.
                        </p>

                        <div className="bg-black border-2 border-red-500 px-6 py-3 rounded-lg mb-8 shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                            <p className="text-xs text-red-500 uppercase font-bold mb-1">Kalan Süre</p>
                            <p className="text-4xl font-mono text-red-500 tracking-widest">{formatTime(timeLeft)}</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="flex-1 bg-white text-red-900 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
                            >
                                💸 Fidyeyi Öde ($5000)
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="flex-1 bg-transparent border-2 border-white text-white py-3 rounded font-bold hover:bg-white/10 transition-colors"
                            >
                                💾 Yedekten Geri Yükle
                            </button>
                        </div>
                        <p className="mt-4 text-[10px] text-white/50">
                            *Yedekleme: Dün gece 03:00'da harici diske alındı.
                        </p>
                    </motion.div>
                )}

                {/* Result */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/95 z-30 p-4 md:p-12 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Veriler Kurtarıldı!" : "Para Gitti, Veriler Gelmedi!"}
                            message={correct
                                ? "Harika bir karar! Düzenli yedekleme (Backup) hayat kurtarır. Bir günlük veri kaybıyla sistemi geri yüklediniz ve fidyecilere para kaptırmadınız."
                                : "Fidyeyi ödediniz ama dolandırıcılar şifre çözme anahtarını göndermedi (veya gönderip tekrar istediler). Hem paranızdan oldunuz hem de " +
                                "suçluları finanse ettiniz. Yedeklemeniz yoksa her şey bitti."}
                            lesson="Fidye yazılımlarından korunmanın tek kesin yolu 'Çevrimdışı Yedekleme'dir. Fidyeyi ödemek asla çözüm değildir."
                            onReset={() => { setPhase("desktop"); setTimeLeft(72 * 3600); }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
