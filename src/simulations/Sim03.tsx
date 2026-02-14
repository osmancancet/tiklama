"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim03() {
    const [phase, setPhase] = useState<"desktop" | "window" | "hacked" | "result">("desktop");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-cover bg-center min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 relative select-none font-sans"
            style={{ backgroundImage: 'linear-gradient(to bottom right, #2c3e50, #4ca1af)' }}>

            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/50 backdrop-blur-md border-t border-white/10 flex items-center px-4 gap-4 z-20">
                <div className="w-6 h-6 bg-blue-500 rounded-sm hover:bg-blue-400 transition-colors cursor-pointer flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-1 h-1 bg-white"></div>
                        <div className="w-1 h-1 bg-white"></div>
                        <div className="w-1 h-1 bg-white"></div>
                        <div className="w-1 h-1 bg-white"></div>
                    </div>
                </div>
                <div className="text-white/80 text-xs font-mono">{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>

            <AnimatePresence>
                {/* Desktop Icons */}
                <div className="p-6 grid grid-cols-1 gap-6 w-32">
                    <div className="flex flex-col items-center gap-1 group cursor-pointer">
                        <div className="w-12 h-12 bg-blue-400/20 rounded border border-blue-400/30 flex items-center justify-center text-2xl group-hover:bg-blue-400/40 transition-colors">
                            🗑️
                        </div>
                        <span className="text-white text-xs drop-shadow-md bg-black/20 px-1 rounded">Geri Dönüşüm</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center gap-1 group cursor-pointer"
                        onDoubleClick={() => setPhase("window")}
                        onClick={() => setPhase("window")} // Single click for mobile playability
                    >
                        <div className="w-12 h-12 bg-yellow-400/20 rounded border border-yellow-400/30 flex items-center justify-center text-2xl group-hover:bg-yellow-400/40 transition-colors relative">
                            💾
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border border-black"></div>
                        </div>
                        <span className="text-white text-xs drop-shadow-md bg-black/20 px-1 rounded text-center">FUSB (E:)</span>
                    </motion.div>
                </div>

                {/* Simulated Window */}
                {phase === "window" && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="absolute inset-4 md:inset-12 md:bottom-16 bg-[#fafafa] rounded shadow-2xl overflow-hidden flex flex-col z-10"
                    >
                        {/* Window Header */}
                        <div className="h-8 bg-white border-b border-gray-200 flex items-center justify-between px-3 select-none">
                            <span className="text-sm text-gray-700">FUSB (E:)</span>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></div>
                                <div onClick={() => setPhase("desktop")} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600"></div>
                            </div>
                        </div>

                        {/* Address Bar */}
                        <div className="px-3 py-2 bg-white border-b border-gray-200 flex text-xs text-gray-500 gap-2 items-center">
                            <span>⬅</span> <span>➡</span>
                            <div className="bg-gray-100 flex-1 px-2 py-1 rounded border border-gray-200">Bilgisayarım &gt; FUSB (E:)</div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 bg-white">
                            <div
                                className="w-24 flex flex-col items-center gap-2 group cursor-pointer hover:bg-blue-50 p-2 rounded border border-transparent hover:border-blue-100"
                                onClick={() => { setCorrect(false); setPhase("hacked"); }}
                            >
                                <div className="w-12 h-12 relative">
                                    <span className="text-4xl absolute inset-0">📄</span>
                                    <span className="text-lg absolute bottom-0 right-0 bg-white rounded-full">⚙️</span>
                                </div>
                                <span className="text-xs text-center text-gray-700 leading-tight group-hover:text-blue-600 font-medium">
                                    Maaş_Zamları_2024.pdf.exe
                                </span>
                            </div>
                        </div>

                        {/* Warning/Footer */}
                        <div className="bg-yellow-50 p-2 border-t border-yellow-100 text-[10px] text-yellow-800 flex justify-between items-center">
                            <span>⚠️ Bu sürücüdeki dosyalar taranmadı.</span>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-white border border-yellow-600 text-yellow-800 px-2 py-0.5 rounded hover:bg-yellow-100"
                            >
                                Güvenli Çıkar
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Hacked Screen */}
                {phase === "hacked" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono text-green-500 p-8 text-center"
                    >
                        <div className="text-4xl mb-4 animate-bounce">💀</div>
                        <h2 className="text-2xl font-bold mb-2">SİSTEM KİLİTLENDİ</h2>
                        <p className="mb-4 text-sm">Zararlı yazılım tespit edildi.</p>
                        <div className="w-full max-w-xs bg-gray-800 h-2 rounded mb-1">
                            <motion.div
                                initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2 }}
                                className="h-full bg-green-500 rounded"
                            ></motion.div>
                        </div>
                        <p className="text-xs text-gray-500">Kişisel verileriniz şifreleniyor...</p>

                        <button
                            onClick={() => setPhase("result")}
                            className="mt-8 px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-colors text-sm"
                        >
                            &gt; DEVAM ET_
                        </button>
                    </motion.div>
                )}

                {/* Result */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 p-4 md:p-12 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Tebrikler: Cihazınızı Korumayı Başardınız!" : "USB Tuzağına Düştünüz!"}
                            message={correct
                                ? "Kaynağı bilinmeyen bir USB belleği asla bilgisayarınıza takmamalı veya içindeki dosyaları açmamalısınız. BT birimine teslim etmek en doğrusu."
                                : "Merakınıza yenildiniz. Dosya simgesi PDF gibi görünse de uzantısı '.exe' idi. Bu bir 'Double Extension' (Çift Uzantı) saldırısıdır."}
                            lesson="Bulduğunuz USB bellekleri asla bilgisayarınıza takmayın. 'Rubber Ducky' gibi cihazlar klavye taklidi yaparak saniyeler içinde bilgisayarınızı ele geçirebilir."
                            onReset={() => setPhase("desktop")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
