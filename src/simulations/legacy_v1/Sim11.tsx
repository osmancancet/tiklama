"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";
import GlitchText from "@/components/GlitchText";

export default function Sim11() {
    const [phase, setPhase] = useState<"screen" | "result">("screen");

    // Timer countdown logic
    const [timeLeft, setTimeLeft] = useState(72 * 60 * 60); // 72 hours

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            {phase === "screen" && (
                <div className="bg-red-900/20 border-2 border-red-600 rounded-xl p-8 max-w-2xl mx-auto text-center font-mono relative overflow-hidden">
                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>

                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-6xl mb-6 inline-block"
                    >
                        💀
                    </motion.div>

                    <GlitchText text="DOSYALARINIZ ŞİFRELENDİ!" className="text-3xl font-bold text-red-500 mb-6 block" as="h2" />

                    <div className="bg-black border border-red-500/50 p-4 mb-8 text-left text-sm text-red-100/80">
                        <p className="mb-2">Klinik hasta kayıtlarınız, röntgenleriniz ve mali verileriniz güçlü bir algoritma ile şifrelenmiştir.</p>
                        <p>Şifreyi çözmek için tek yol özel anahtarı satın almaktır.</p>
                    </div>

                    <div className="flex justify-center items-center gap-4 mb-8">
                        <div className="text-center">
                            <p className="text-xs text-red-400">KALAN SÜRE</p>
                            <p className="text-3xl font-bold text-white tracking-widest">{formatTime(timeLeft)}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setPhase("result")}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition-transform hover:scale-105"
                        >
                            💸 5000$ Bitcoin Öde
                        </button>
                        <button
                            onClick={() => setPhase("result")} // Both lead to result, teaching point is critical here
                            className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded font-bold"
                        >
                            💾 Yedekten Dön
                        </button>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={true} // Teaching point: Paying doesn't guarantee data. Backups do.
                    title="Fidyeciye Güven Olmaz!"
                    message="Fidye ödeseniz bile dosyalarınızın geri geleceği garanti değildir. Tek kurtuluş düzenli yedeklemedir."
                    lesson="3-2-1 Yedekleme kuralını uygulayın: Verilerinizin 3 kopyası olsun, 2 farklı medyada saklayın, 1 tanesi ofis dışında (Bulut/Offline) olsun. Asla fidye ödemeyin!"
                    onReset={() => setPhase("screen")}
                />
            )}
        </div>
    );
}
