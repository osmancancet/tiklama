"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";
import GlitchText from "@/components/GlitchText";

export default function Sim09() {
    const [phase, setPhase] = useState<"site" | "alert" | "virus" | "result">("site");

    return (
        <div>
            {phase === "site" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto bg-[#1a1c23] rounded-xl overflow-hidden border border-zinc-700 font-sans">
                    {/* Gamers UI */}
                    <div className="h-40 bg-gradient-to-r from-purple-800 to-blue-900 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                        <h2 className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 z-10 drop-shadow-lg">
                            FREE SKINS 2024
                        </h2>
                    </div>

                    <div className="p-8 text-center">
                        <p className="text-white text-lg font-bold mb-2">CS:GO Butterfly Knife - Fade</p>
                        <p className="text-green-400 font-mono text-sm mb-6">Status: AVAILABLE (Only 2 left!)</p>

                        <div className="bg-zinc-800/50 p-4 rounded border border-dashed border-zinc-600 mb-6">
                            <p className="text-zinc-400 text-xs mb-2">Instructions:</p>
                            <ol className="text-left text-xs text-zinc-300 space-y-1 list-decimal pl-4">
                                <li>Download the skin injector tool</li>
                                <li>Disable Antivirus (False positive detection)</li>
                                <li>Run as Administrator</li>
                            </ol>
                        </div>

                        <button
                            onClick={() => setPhase("alert")}
                            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all transform hover:scale-105"
                        >
                            DOWNLOAD NOW (5.2 MB)
                        </button>
                    </div>
                </motion.div>
            )}

            {phase === "alert" && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 border-2 border-yellow-500 rounded-lg max-w-sm w-full p-6 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4 text-yellow-500">
                            <span className="text-3xl">🛡️</span>
                            <h3 className="font-bold text-lg">Antivirus Uyarısı</h3>
                        </div>
                        <p className="text-white mb-6">
                            Bu dosya potansiyel olarak tehlikeli olabilir. İndirme engellendi.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setPhase("site")}
                                className="py-3 bg-zinc-700 text-white rounded hover:bg-zinc-600 border border-zinc-600"
                            >
                                Geri Dön (Güvenli)
                            </button>
                            <button
                                onClick={() => setPhase("virus")}
                                className="py-3 bg-transparent text-zinc-400 text-sm underline hover:text-white"
                            >
                                Korumayı Kapat ve Devam Et (Tehlikeli)
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {phase === "virus" && (
                <div className="max-w-lg mx-auto text-center pt-10">
                    <GlitchText text="SYSTEM COMPROMISED" className="text-4xl font-mono font-bold text-danger-red mb-8" as="h2" />
                    <motion.div
                        className="font-mono text-left bg-black text-green-500 p-4 rounded border border-green-500/30 text-xs h-40 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p>{">"} Injecting payload...</p>
                        <p>{">"} Disabling Windows Defender... OK</p>
                        <p>{">"} Installing Keylogger (v2.4)... OK</p>
                        <p>{">"} Capture keystrokes started...</p>
                        <p>{">"} Sending data to C&C server...</p>
                        <p className="animate-pulse">{">"} Steam_Credentials.txt sent.</p>
                    </motion.div>

                    <button onClick={() => setPhase("result")} className="mt-8 text-white underline">Simülasyonu Bitir</button>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={false}
                    title="Oyun Hesabınız Çalındı!"
                    message="Bedava skin vaadiyle indirdiğiniz 'hyle' programı aslında bir Keylogger (Tuş kaydedici) idi. Yazdığınız tüm şifreleri saldırgana gönderdi."
                    lesson="Güvenlik sistemini (Antivirüs) kapatmanızı isteyen her dosya %99.9 zararlıdır. Bedava peynir sadece fare kapanında olur."
                    onReset={() => setPhase("site")}
                />
            )}
        </div>
    );
}
