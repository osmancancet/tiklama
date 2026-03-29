"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim22() {
    const [phase, setPhase] = useState<"search" | "download" | "install" | "result">("search");
    const [correct, setCorrect] = useState(false);
    const [progress, setProgress] = useState(0);

    const startInstall = () => {
        setPhase("install");
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setCorrect(false);
                setPhase("result");
            }
        }, 100);
    };

    return (
        <div className="bg-[#2D2D2D] min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-600 flex flex-col font-sans relative select-none max-w-sm sm:max-w-md mx-auto">

            <AnimatePresence mode="wait">
                {/* 1. SEARCH/LANDING */}
                {phase === "search" && (
                    <motion.div
                        key="search"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 bg-white flex flex-col text-gray-900"
                    >
                        <div className="bg-gray-100 p-2 border-b flex items-center gap-2 text-sm text-gray-500">
                            <span className="bg-white px-2 rounded border">🔍 photoshop full crack indir ücretsiz</span>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="text-blue-800 text-xl font-medium underline cursor-pointer hover:text-blue-600" onClick={() => setPhase("download")}>
                                Adobe Photoshop 2024 FULL + Crack (Tek Link)
                            </div>
                            <div className="text-green-700 text-sm">www.fullprogram-indir-crack.net › software</div>
                            <p className="text-sm text-gray-600">
                                Bedava full sürüm indir. Keygen dahil. Serial key gerekmez. %100 Çalışıyor. Virüssüz.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* 2. DOWNLOAD PAGE */}
                {phase === "download" && (
                    <motion.div
                        key="download"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 bg-gray-900 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
                    >
                        {/* Annoying Ads Background */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-wrap gap-4 overflow-hidden">
                            {Array.from({ length: 10 }).map((_, i) => <div key={i} className="bg-red-500 w-32 h-32 rotate-12">DOWNLOAD</div>)}
                        </div>

                        <h2 className="text-3xl font-bold mb-8 z-10">DOSYA HAZIR</h2>

                        <div className="z-10 bg-black/50 p-6 rounded-xl border border-green-500/50 backdrop-blur-sm">
                            <p className="mb-4">Photoshop_Setup_Crack.exe (1.2 GB)</p>
                            <p className="text-red-400 text-xs mb-4 font-bold animate-pulse">
                                ! Kurulumdan önce antivirüsü kapatın, yoksa crack silinir!
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={startInstall}
                                    className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded font-bold shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                                >
                                    ⬇️ İNDİR VE KUR
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded font-bold"
                                >
                                    ❌ İPTAL ET
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 3. INSTALLING (Infection) */}
                {phase === "install" && (
                    <motion.div
                        key="install"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex-1 bg-black flex flex-col items-center justify-center p-8"
                    >
                        <div className="w-full max-w-md">
                            <h2 className="text-white mb-2">Kuruluyor...</h2>
                            <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 transition-all duration-75" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="mt-4 font-mono text-xs text-green-500 h-32 overflow-hidden">
                                {progress > 20 && <p>&gt; Injecting payload...</p>}
                                {progress > 40 && <p>&gt; Disabling Windows Defender...</p>}
                                {progress > 60 && <p>&gt; Stealing Chrome Passwords...</p>}
                                {progress > 80 && <p>&gt; Uploading to C2 Server...</p>}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* RESULT */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Bilgisayarınızı Korudunuz!" : "Truva Atı (Trojan) Şimdi İçeride!"}
                            message={correct
                                ? "Tebrikler. Korsan yazılım (Crack/Warez) siteleri, virüslerin bir numaralı kaynağıdır. 'Antivirüsü kapat' uyarısı, zararlı yazılımın sisteme girmesi için bir aldatmacadır."
                                : "Bedava yazılım kullanmak isterken tüm kişisel verilerinizi çaldırdınız. İndirdiğiniz dosya masum görünse de arka planda şifrelerinizi çalan bir 'Stealer' (Hırsız) yazılımıydı."}
                            lesson="Lisanslı yazılım kullanın. Korsan yazılımlar genellikle Trojan içerir. Bir program sizden antivirüsü kapatmanızı istiyorsa %99.9 zararlıdır."
                            onReset={() => { setPhase("search"); setProgress(0); }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
