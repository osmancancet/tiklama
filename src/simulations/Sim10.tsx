"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim10() {
    const [phase, setPhase] = useState<"cam" | "hacked" | "result">("cam");

    return (
        <div>
            {(phase === "cam" || phase === "hacked") && (
                <div className="max-w-lg mx-auto bg-black border-4 border-zinc-800 rounded-xl overflow-hidden relative aspect-video">
                    {/* Camera Overlay UI */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                        <span className="text-red-500 font-mono text-xs animate-pulse">● LIVE</span>
                        <span className="text-white/70 font-mono text-xs">CAM-01 [Baby Room]</span>
                        <span className="text-white/50 font-mono text-[10px]">192.168.1.105:8080</span>
                    </div>

                    <div className="absolute top-4 right-4 z-10 text-white/70 font-mono text-xs">
                        22:42:15 PM
                    </div>

                    {/* Scene */}
                    <div className="w-full h-full bg-zinc-900 flex items-center justify-center relative">
                        <div className="text-6xl grayscale opacity-30">🛏️</div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                    </div>

                    {/* Hacked Message */}
                    {phase === "hacked" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 flex-col"
                        >
                            <span className="text-6xl mb-2">👁️</span>
                            <p className="text-red-500 font-mono font-bold text-xl px-4 text-center">
                                "Merhaba, Annesi de buradaymış..."
                            </p>
                            <p className="text-white/70 text-sm mt-2 font-mono">Ses bağlantısı aktif...</p>
                        </motion.div>
                    )}

                    {phase === "cam" && (
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
                            <button
                                onClick={() => setPhase("hacked")}
                                className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs rounded-full hover:bg-white/20 transition-colors"
                            >
                                Varsayılan Şifreyle Giriş Yap (admin/1234)
                            </button>
                        </div>
                    )}
                </div>
            )}

            {phase === "hacked" && (
                <div className="text-center mt-6">
                    <button onClick={() => setPhase("result")} className="btn-danger">
                        ⚠️ Bağlantıyı Kes
                    </button>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={false}
                    title="Eviniz Gözetleniyor!"
                    message="Kamera sisteminizin şifresini 'admin/admin' veya '1234' olarak bıraktığınız için tarayıcı botları kameranızı buldu ve sisteme sızdı."
                    lesson="Aldığınız her akıllı cihazın (Kamera, Süpürge, Modem) varsayılan şifresini kurulumda MUTLAKA değiştirin. Kullanmadığınız zaman fişini çekin veya kamerasını kapatın."
                    onReset={() => setPhase("cam")}
                />
            )}
        </div>
    );
}
