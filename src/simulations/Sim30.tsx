"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stolenDataLines = [
    "Cihaz bilgileri alınıyor...",
    "IP Adresi: 85.103.XX.XXX (Türkiye)",
    "Tarayıcı: Chrome 124.0 — Mobil",
    "İşletim Sistemi: Android 14 / iOS 18",
    "Ekran Çözünürlüğü: " + (typeof window !== "undefined" ? `${window.screen?.width || 390}x${window.screen?.height || 844}` : "390x844"),
    "Konum izni sorgulanıyor...",
    "Rehber taranıyor... 847 kişi bulundu",
    "Fotoğraf galerisine erişiliyor...",
    "Banka uygulamaları taranıyor...",
    "Kayıtlı şifreler kopyalanıyor...",
    "Sosyal medya oturumları ele geçiriliyor...",
    "Veriler dışarı aktarılıyor... %100",
];

export default function Sim30() {
    const [phase, setPhase] = useState<"hack" | "reveal">("hack");
    const [visibleLines, setVisibleLines] = useState(0);
    const [showSkull, setShowSkull] = useState(false);
    const [showReveal, setShowReveal] = useState(false);
    const [glitchActive, setGlitchActive] = useState(true);
    const [countdown, setCountdown] = useState(10);

    // Terminal lines appearing one by one
    useEffect(() => {
        if (phase === "hack" && visibleLines < stolenDataLines.length) {
            const timer = setTimeout(() => {
                setVisibleLines(prev => prev + 1);
            }, 600);
            return () => clearTimeout(timer);
        }
        if (phase === "hack" && visibleLines >= stolenDataLines.length && !showSkull) {
            const timer = setTimeout(() => setShowSkull(true), 800);
            return () => clearTimeout(timer);
        }
    }, [phase, visibleLines, showSkull]);

    // Countdown after skull appears
    useEffect(() => {
        if (showSkull && countdown > 0) {
            const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
        if (showSkull && countdown === 0) {
            setPhase("reveal");
        }
    }, [showSkull, countdown]);

    // Glitch flicker effect
    useEffect(() => {
        if (phase === "hack") {
            const interval = setInterval(() => {
                setGlitchActive(false);
                setTimeout(() => setGlitchActive(true), 80);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [phase]);

    // Reveal animation
    useEffect(() => {
        if (phase === "reveal") {
            const timer = setTimeout(() => setShowReveal(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <div className="min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-sans relative max-w-sm sm:max-w-md mx-auto text-white">
            <AnimatePresence mode="wait">
                {/* PHASE 1: SCARY HACK SCREEN */}
                {phase === "hack" && (
                    <motion.div
                        key="hack"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: glitchActive ? 1 : 0.3 }}
                        className="flex-1 flex flex-col bg-black relative overflow-hidden"
                    >
                        {/* Scan lines overlay */}
                        <div
                            className="absolute inset-0 pointer-events-none z-10 opacity-20"
                            style={{
                                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
                            }}
                        />

                        {/* Red flashing header */}
                        <motion.div
                            animate={{ backgroundColor: ["rgba(220,38,38,0.8)", "rgba(220,38,38,0.3)", "rgba(220,38,38,0.8)"] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="px-4 py-3 text-center z-20 relative"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="text-xl"
                                >
                                    ⚠️
                                </motion.span>
                                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider">
                                    CİHAZINIZ ELE GEÇİRİLDİ
                                </h2>
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="text-xl"
                                >
                                    ⚠️
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Terminal output */}
                        <div className="flex-1 p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-y-auto z-20 relative">
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-red-500/30">
                                <span className="text-red-500 animate-pulse text-xs">● REC</span>
                                <span className="text-red-400 text-[11px]">root@attacker:~$</span>
                            </div>

                            {stolenDataLines.slice(0, visibleLines).map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-start gap-2 mb-1.5"
                                >
                                    <span className="text-red-500 shrink-0">{'>'}</span>
                                    <span className={`${i >= 6 ? "text-red-400" : "text-green-400"}`}>
                                        {line}
                                    </span>
                                    {i === visibleLines - 1 && i < stolenDataLines.length - 1 && (
                                        <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-0.5" />
                                    )}
                                </motion.div>
                            ))}

                            {/* Skull + countdown after all lines */}
                            {showSkull && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-6 text-center"
                                >
                                    <div className="text-6xl sm:text-7xl mb-3">💀</div>
                                    <p className="text-red-500 font-bold text-base sm:text-lg uppercase tracking-widest mb-2">
                                        TÜM VERİLERİNİZ ÇALINDI
                                    </p>
                                    <p className="text-red-400/70 text-xs mb-4">
                                        Fidye ödemezseniz verileriniz yayınlanacak
                                    </p>

                                    {/* Fake countdown */}
                                    <div className="inline-block bg-red-900/50 border border-red-500/50 rounded-lg px-6 py-3">
                                        <p className="text-[11px] text-red-300 uppercase mb-1">Kalan Süre</p>
                                        <p className="text-3xl sm:text-4xl font-mono font-bold text-red-500 tracking-widest">
                                            00:00:{countdown.toString().padStart(2, "0")}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Skip button - small, subtle */}
                        <div className="p-2 z-20 relative text-center">
                            <button
                                onClick={() => setPhase("reveal")}
                                className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors bg-transparent border-none cursor-pointer py-2 px-4"
                            >
                                Geç →
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* PHASE 2: THE REVEAL */}
                {phase === "reveal" && (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 flex flex-col relative overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #0a0a1a, #0f172a)" }}
                    >
                        {/* Green "safe" header */}
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-4 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                                className="text-4xl sm:text-5xl mb-2"
                            >
                                🛡️
                            </motion.div>
                            <h2 className="text-lg sm:text-xl font-bold">RAHAT OLUN — HACKLENMEDİNİZ!</h2>
                            <p className="text-green-100 text-xs sm:text-sm mt-1">Bu bir farkındalık deneyimiydi.</p>
                        </motion.div>

                        {/* Message */}
                        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="space-y-4"
                            >
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                                        Az önce yaşadığınız o kalp çarpıntısı, o panik hissi...
                                        İşte <strong className="text-white">sosyal mühendisliğin</strong> gücü tam olarak budur.
                                    </p>
                                </div>

                                <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-4">
                                    <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
                                        <strong className="text-blue-300">Gerçekte ne oldu?</strong> Hiçbir şey.
                                        Hiçbir verinize erişilmedi, hiçbir bilginiz çalınmadı. Gördüğünüz her şey
                                        sadece bir animasyondu. Ama gerçek bir dolandırıcı tam olarak bu korkuyu kullanır.
                                    </p>
                                </div>

                                <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4">
                                    <p className="text-xs sm:text-sm text-red-200 leading-relaxed">
                                        <strong className="text-red-300">Ders:</strong> QR kod taradığınızda açılan sayfa
                                        sizi korkutuyorsa, kişisel bilgi veya para istiyorsa — durun ve düşünün.
                                        Tarayıcıyı kapatın. Gerçek bir tehlike olsaydı, size &quot;fidye ödeyin&quot; demezlerdi.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Finale - Book ending */}
                            {showReveal && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                    className="mt-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-5 border border-blue-500/20 text-center"
                                >
                                    <div className="text-3xl sm:text-4xl mb-3">🏆</div>
                                    <h3 className="font-bold text-blue-300 text-base sm:text-lg mb-3">Kitabın Sonuna Ulaştınız!</h3>
                                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                                        30 bölüm boyunca sosyal mühendisliğin en yaygın taktiklerini deneyimlediniz.
                                        Artık bir telefon çaldığında, bir e-posta geldiğinde veya bir QR kod gördüğünüzde
                                        durup düşüneceksiniz:
                                    </p>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="text-sm sm:text-base font-bold text-white mt-4 italic leading-relaxed"
                                    >
                                        &quot;Bu benim düşüncem mi, yoksa birisi bana bunu düşündürtüyor mu?&quot;
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                        className="text-xs text-gray-400 mt-4"
                                    >
                                        — Osman Can Çetlenbik
                                    </motion.p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
