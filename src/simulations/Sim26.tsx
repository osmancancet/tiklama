"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";
import TerminalText from "@/components/TerminalText";

const chatMessages = [
    { name: "Hüseyin", msg: "Hilmi ne oldu lan?", color: "#3b82f6" },
    { name: "Yusuf", msg: "Abi virus falan mı geldi?", color: "#22c55e" },
    { name: "Ozan", msg: "Kapatsana tarayıcıyı Ctrl+W bas!", color: "#f59e0b" },
    { name: "Hilmi", msg: "Kapanmıyor! Numarayı arıyorum...", color: "#ef4444" },
];

const hackerActions = [
    "[BAĞLANTI] Uzaktan erişim kuruldu...",
    "[TARAMA] Kayıtlı şifreler aranıyor...",
    "[BULUNDU] Chrome: 47 kayıtlı şifre",
    "[KOPYALANDI] instagram.com → h*****@mail.com",
    "[KOPYALANDI] garanti.com.tr → TC: 123*****",
    "[KOPYALANDI] e-devlet → şifre: ********",
    "[YÜKLEME] Keylogger arka plana yerleştirildi",
    "[TAMAMLANDI] Tüm veriler dışarı sızdırıldı!",
];

export default function Sim26() {
    const [phase, setPhase] = useState<"browsing" | "lockscreen" | "call" | "remote" | "decision" | "result">("browsing");
    const [correct, setCorrect] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);
    const [chatIndex, setChatIndex] = useState(0);
    const [terminalDone, setTerminalDone] = useState(false);

    // Countdown timer for lock screen
    useEffect(() => {
        if (phase === "lockscreen" && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [phase, timeLeft]);

    // Chat messages animation
    useEffect(() => {
        if (phase === "lockscreen" && chatIndex < chatMessages.length) {
            const timer = setTimeout(() => setChatIndex(prev => prev + 1), 2000);
            return () => clearTimeout(timer);
        }
    }, [phase, chatIndex]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <div className="bg-gray-900 min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-sans relative max-w-sm sm:max-w-md mx-auto text-white">

            <AnimatePresence mode="wait">
                {/* 1. Browsing - Normal State */}
                {phase === "browsing" && (
                    <motion.div
                        key="browsing"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Browser chrome */}
                        <div className="bg-gray-800 px-3 py-2 flex items-center gap-2 border-b border-gray-700">
                            <div className="flex gap-1">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            </div>
                            <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-400">
                                🔒 oyun-hileleri-bedava.com
                            </div>
                        </div>

                        <div className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900 p-6 flex flex-col items-center justify-center text-center">
                            <div className="text-5xl mb-4">🎮</div>
                            <h3 className="font-bold text-lg mb-2">Oyun Hileleri & Modlar</h3>
                            <p className="text-xs text-gray-400 mb-6">Hilmi, Hüseyin, Yusuf ve Ozan internet kafede oyun oynuyor...</p>

                            <div className="bg-gray-700/50 rounded-lg p-4 w-full mb-4">
                                <p className="text-sm text-gray-300">
                                    Hilmi şüpheli bir sitede hile programı ararken...
                                </p>
                            </div>

                            <button
                                onClick={() => setPhase("lockscreen")}
                                className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold transition-colors animate-pulse"
                            >
                                💀 Pop-up Beliriyor!
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 2. Fake Lock Screen / BSOD */}
                {phase === "lockscreen" && (
                    <motion.div
                        key="lockscreen"
                        initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 z-20 flex flex-col"
                    >
                        {/* Fake BSOD */}
                        <div className="flex-1 bg-[#0078d4] p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                            {/* Scan lines effect */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)" }}
                            />

                            <motion.div
                                animate={{ opacity: [1, 0.7, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-6xl mb-4"
                            >
                                ⚠️
                            </motion.div>

                            <h1 className="text-xl font-bold mb-2">WİNDOWS DEFENDER UYARISI</h1>
                            <p className="text-sm mb-4 max-w-xs">
                                Bilgisayarınızda <span className="font-bold text-yellow-300">Trojan:Win32/Emotet</span> tespit edildi!
                                Kişisel verileriniz tehlikede.
                            </p>

                            {/* Fake countdown */}
                            <div className="bg-black/30 border-2 border-white/50 rounded-lg px-6 py-3 mb-4">
                                <p className="text-xs text-yellow-300 uppercase font-bold mb-1">Sistem kilitlenmeye kalan süre</p>
                                <p className="text-3xl font-mono tracking-widest">{formatTime(timeLeft)}</p>
                            </div>

                            <div className="bg-red-600 border border-red-400 rounded-lg p-3 mb-4 max-w-xs">
                                <p className="text-sm font-bold">Hemen Arayın!</p>
                                <p className="text-2xl font-mono font-bold mt-1">0850 XXX XX XX</p>
                                <p className="text-[11px] mt-1">Microsoft Türkiye Teknik Destek</p>
                            </div>

                            {/* Decision buttons */}
                            <div className="flex flex-col gap-2 w-full max-w-xs">
                                <button
                                    onClick={() => setPhase("call")}
                                    className="bg-red-700 hover:bg-red-600 text-white py-3 rounded font-bold text-sm transition-colors"
                                >
                                    📞 Numarayı Ara
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="bg-white/20 hover:bg-white/30 text-white py-3 rounded font-bold text-sm transition-colors"
                                >
                                    ✕ Ctrl+W ile Tarayıcıyı Kapat
                                </button>
                            </div>
                        </div>

                        {/* Chat bubbles overlay */}
                        <div className="absolute bottom-2 left-2 right-2 space-y-1 pointer-events-none">
                            {chatMessages.slice(0, chatIndex).map((chat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-black/80 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-2"
                                >
                                    <span className="text-xs font-bold" style={{ color: chat.color }}>{chat.name}:</span>
                                    <span className="text-xs text-gray-300">{chat.msg}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 3. Phone Call Phase */}
                {phase === "call" && (
                    <motion.div
                        key="call"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col bg-gray-900"
                    >
                        <div className="bg-green-900 px-4 py-6 text-center">
                            <div className="text-4xl mb-2">📞</div>
                            <p className="text-xs text-green-300">Arama bağlandı</p>
                            <p className="text-sm font-bold mt-1">Microsoft Teknik Destek</p>
                            <p className="text-xs text-green-400 mt-1 font-mono">0850 XXX XX XX</p>
                        </div>

                        <div className="flex-1 p-4">
                            <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm shrink-0">🎧</div>
                                    <div className="bg-gray-700 rounded-lg p-3 text-sm">
                                        <p>&quot;Merhaba, Microsoft Güvenlik Merkezi. Bilgisayarınızda ciddi bir virüs tespit ettik. Sizi korumak için uzaktan bağlantı kurmamız gerekiyor.&quot;</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm shrink-0">🎧</div>
                                    <div className="bg-gray-700 rounded-lg p-3 text-sm">
                                        <p>&quot;Lütfen AnyDesk programını indirip erişim kodunu bize verin. Bu tamamen ücretsiz ve güvenlidir.&quot;</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setPhase("remote")}
                                    className="bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold transition-colors"
                                >
                                    ⚠️ Uzaktan Bağlantıya İzin Ver
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition-colors"
                                >
                                    ✅ Telefonu Kapat
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 4. Remote Access - Hacker View */}
                {phase === "remote" && (
                    <motion.div
                        key="remote"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Top: User's desktop (looks normal) */}
                        <div className="bg-gray-800 p-3 border-b border-gray-600">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-green-400 text-xs font-mono">● AnyDesk Bağlı</span>
                                <span className="text-xs text-gray-500">— Hilmi&apos;nin Ekranı</span>
                            </div>
                            <div className="bg-gray-700 rounded-lg p-3 text-center">
                                <p className="text-sm text-gray-400">&quot;Teknisyen&quot; fare imlecini kontrol ediyor...</p>
                                <motion.div
                                    animate={{ x: [0, 20, -10, 30, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    className="text-xl mt-2"
                                >
                                    🖱️
                                </motion.div>
                            </div>
                        </div>

                        {/* Bottom: Hacker's terminal */}
                        <div className="flex-1 bg-black p-3 overflow-hidden">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-red-500 text-xs font-bold animate-pulse">● REC</span>
                                <span className="text-xs text-gray-500">Saldırgan Terminali — Gerçekte Olan</span>
                            </div>
                            <TerminalText
                                lines={hackerActions}
                                speed={35}
                                onComplete={() => {
                                    setTerminalDone(true);
                                    setTimeout(() => {
                                        setCorrect(false);
                                        setPhase("result");
                                    }, 2000);
                                }}
                            />
                            {terminalDone && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-xs mt-3 font-bold text-center"
                                >
                                    💀 Tüm veriler ele geçirildi!
                                </motion.p>
                            )}
                        </div>

                        {/* Friend chat overlay */}
                        <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2 }}
                                className="bg-black/80 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-2"
                            >
                                <span className="text-xs font-bold text-yellow-400">Ozan:</span>
                                <span className="text-xs text-gray-300">Abi dur! Microsoft seni asla aramaz!!!</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* 5. Decision (only if came from browsing directly) */}
                {phase === "decision" && (
                    <motion.div
                        key="decision"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <p className="text-lg mb-6">Hilmi ne yapmalı?</p>
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                onClick={() => setPhase("call")}
                                className="bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold"
                            >
                                ⚠️ Numarayı Ara
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold"
                            >
                                ✅ Tarayıcıyı Zorla Kapat
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 6. Result */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Tuzaktan Kurtuldunuz!" : "Bilgisayar Ele Geçirildi!"}
                            message={correct
                                ? "Doğru karar! Ozan'ın dediği gibi tarayıcıyı kapattınız (Ctrl+W veya zorla kapat). Sahte uyarı kayboldu ve hiçbir virüs yoktu. O pop-up tamamen sahte bir korkutma taktiğiydi."
                                : "Hilmi numarayı aradı ve uzaktan bağlantı verdi. 'Teknisyen' 47 kayıtlı şifreyi, e-Devlet bilgilerini ve banka girişlerini saniyeler içinde kopyaladı. Ayrıca arka plana keylogger yerleştirdi. Artık Hilmi'nin her tuş vuruşu saldırgana gidiyor."}
                            lesson="Microsoft, Apple veya Google sizi asla arayarak pop-up ile uyarmaz. Tarayıcı kilitlenen ekranlar %100 sahtedir. Ctrl+W, Alt+F4 veya Görev Yöneticisi ile kapatın. Asla uzaktan erişim programı yüklemeyin."
                            onReset={() => {
                                setPhase("browsing");
                                setCorrect(false);
                                setTimeLeft(180);
                                setChatIndex(0);
                                setTerminalDone(false);
                            }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
