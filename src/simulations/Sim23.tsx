"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim23() {
    const [phase, setPhase] = useState<"email" | "analyze" | "result">("email");

    return (
        <div>
            {/* Simulation: Email View */}
            {phase === "email" && (
                <div className="bg-white text-black p-6 rounded-lg max-w-2xl mx-auto shadow-xl font-sans">
                    <div className="border-b pb-4 mb-4">
                        <h2 className="text-xl font-bold mb-2">Acil: Güvenlik Güncellemesi Gerekiyor</h2>
                        <div className="text-sm">
                            <p><span className="font-bold">Kimden:</span> IT Support &lt;admin@universite-guvenlik.com&gt;</p>
                            <p><span className="font-bold">Kime:</span> Ahmet Ali Süzen</p>
                        </div>
                    </div>

                    <div className="mb-6 text-sm leading-relaxed">
                        <p className="mb-4">Sayın Hocam,</p>
                        <p className="mb-4">Üniversite e-posta sunucularımızda yapılan bakım nedeniyle hesabınız risk altındadır. Lütfen aşağıdaki güvenlik yamasını indirip kurarak erişiminizi koruyun.</p>

                        <div className="border border-zinc-200 p-3 rounded flex items-center gap-3 w-fit hover:bg-zinc-50 cursor-pointer">
                            <div className="text-2xl text-red-500">🖇️</div>
                            <div>
                                <p className="font-semibold text-sm">security_patch_v2.exe</p>
                                <p className="text-xs text-zinc-500">450 KB</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => setPhase("result")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold text-sm">
                            İndir ve Kur
                        </button>
                        <button onClick={() => setPhase("analyze")} className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded font-bold text-sm">
                            🔍 Header Analizi Yap
                        </button>
                    </div>
                </div>
            )}

            {/* Simulation: Analysis Tool */}
            {phase === "analyze" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto bg-black border border-green-500/50 p-4 rounded font-mono text-xs">
                    <h3 className="text-green-500 font-bold text-lg mb-4 border-b border-green-500/30 pb-2">HEADER ANALYZER TOOL</h3>

                    <div className="space-y-2 text-zinc-300">
                        <div className="flex gap-4">
                            <span className="w-24 text-zinc-500">From:</span>
                            <span className="text-red-400">admin@universite-guvenlik.com</span>
                            <span className="text-yellow-500">[!] Domain NOT registered to University</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="w-24 text-zinc-500">Return-Path:</span>
                            <span className="text-white">attacker_34@gmail.com</span>
                            <span className="text-red-500 font-bold">[!] MISMATCH</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="w-24 text-zinc-500">Origin IP:</span>
                            <span className="text-white">185.10.xx.xx</span>
                            <span className="text-yellow-500">[!] Hosting Provider (DigitalOcean)</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="w-24 text-zinc-500">DMARC:</span>
                            <span className="text-red-500">FAIL</span>
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-zinc-800 text-center">
                        <p className="text-lg text-red-500 font-bold mb-4">VERDICT: PHISHING ATTACK DETECTED</p>
                        <button onClick={() => setPhase("result")} className="bg-green-600 px-6 py-2 rounded text-white font-bold hover:bg-green-500">
                            Analizi Raporla ve Bitir
                        </button>
                    </div>
                </motion.div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={document.querySelector(".text-green-500") !== null} // Bit hacky but works for demo if coming from Analyze phase
                    title={document.querySelector(".text-green-500") !== null ? "Saldırıyı Tespit Ettiniz!" : "Bilgisayarınız Enfekte Oldu!"}
                    message="Spear Phishing (Hedefli Oltalama), size özel hazırlanmış gibi görünür. Header analizi veya basit domain kontrolü ile sahteciliği yakalayabilirsiniz."
                    lesson="Sıfır Güven (Zero Trust) prensibini benimseyin. IT birimleri asla .exe dosyası göndermez. E-posta başlıklarını ve gönderen adresini dikkatlice inceleyin."
                    onReset={() => setPhase("email")}
                />
            )}
        </div>
    );
}
