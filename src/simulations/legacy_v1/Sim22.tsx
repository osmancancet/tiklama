"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";
import TerminalText from "@/components/TerminalText";

export default function Sim22() {
    const [phase, setPhase] = useState<"site" | "install" | "result">("site");

    const installLog = [
        "Extracting Adobe_Photoshop_2024_Crack.exe...",
        "Bypassing license verification...",
        "Patching host file...",
        "Injecting stealer.dll -> chrome.exe [SUCCESS]",
        "Harvesting saved passwords...",
        "Harvesting session cookies...",
        "Uploading to remote C2 server...",
        "Cleaning up traces..."
    ];

    return (
        <div>
            {phase === "site" && (
                <div className="max-w-2xl mx-auto bg-[#1e1e1e] text-white rounded-lg shadow-2xl border border-zinc-700 font-sans">
                    {/* Fake Warez Site Header */}
                    <div className="p-4 border-b border-zinc-700 flex justify-between items-center bg-[#252526]">
                        <span className="font-bold text-orange-500">CRACK-WORLD</span>
                        <div className="flex gap-2 text-xs">
                            <span className="text-zinc-400">Home / Software / Design</span>
                        </div>
                    </div>

                    <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">Adobe Photoshop 2024 Full (Pre-Cracked) - No Key Needed</h1>

                        <div className="bg-[#2d2d2d] p-4 rounded mb-6 text-sm">
                            <p className="text-green-400 mb-2">✅ Tested & Working</p>
                            <p className="text-zinc-400">Instructions: Turn off antivirus, run installer, enjoy!</p>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={() => setPhase("install")}
                                className="flex flex-col items-center bg-green-600 hover:bg-green-500 px-10 py-4 rounded font-bold shadow-lg transition-transform hover:scale-105"
                            >
                                <span className="text-xl">DOWNLOAD</span>
                                <span className="text-xs font-normal opacity-80">(1.2 GB - ZIP)</span>
                            </button>
                        </div>

                        <p className="text-center text-xs text-zinc-500 mt-4 italic">
                            Password for zip: 1234
                        </p>
                    </div>
                </div>
            )}

            {phase === "install" && (
                <div className="max-w-xl mx-auto">
                    <div className="bg-black rounded-t-lg p-2 border border-zinc-700 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-xs text-zinc-400 font-mono">Installer.exe</span>
                    </div>

                    <TerminalText
                        lines={installLog}
                        speed={50}
                        onComplete={() => setTimeout(() => setPhase("result"), 1500)}
                        className="rounded-t-none border-t-0"
                    />
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={false}
                    title="Şifreleriniz Çalındı!"
                    message="İndirdiğiniz crack dosyası içinde 'Stealer' (Hırsız) yazılımı vardı. Tarayıcınızda kayıtlı tüm şifreleri, çerezleri ve oturumları saniyeler içinde çaldı."
                    lesson="Bedava yazılımın bedeli, kişisel verilerinizdir. Antivirüs yazılımını kapatmanızı isteyen dosyalar %100 zararlıdır."
                    onReset={() => setPhase("site")}
                />
            )}
        </div>
    );
}
