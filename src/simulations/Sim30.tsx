"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
    { text: "Bağlantı kuruluyor...", color: "text-yellow-400" },
    { text: "Hedef cihaz tespit edildi.", color: "text-green-400" },
    { text: "IP Adresi: 85.103.██.███ (Türkiye)", color: "text-green-400" },
    { text: "Tarayıcı: Chrome 124.0 — Mobil", color: "text-green-400" },
    { text: "İşletim Sistemi: Android 14 / iOS 18", color: "text-green-400" },
    { text: "Konum izni alınıyor......... BAŞARILI", color: "text-green-400" },
    { text: "Konum: 40.98██, 29.02██ — İstanbul", color: "text-green-400" },
    { text: "Rehber taranıyor............. 1.247 kişi bulundu", color: "text-red-400" },
    { text: "Fotoğraf galerisine erişiliyor... 3.891 dosya", color: "text-red-400" },
    { text: "WhatsApp veritabanı kopyalanıyor...", color: "text-red-400" },
    { text: "Banka uygulamaları tespit edildi: 3 adet", color: "text-red-400" },
    { text: "Kayıtlı şifreler çıkartılıyor... 94 adet", color: "text-red-500" },
    { text: "Instagram oturumu ele geçirildi", color: "text-red-500" },
    { text: "Gmail oturumu ele geçirildi", color: "text-red-500" },
    { text: "Tüm veriler şifreleniyor...", color: "text-red-500" },
    { text: "TRANSFER TAMAMLANDI — %100", color: "text-red-600" },
];

export default function Sim30() {
    const [phase, setPhase] = useState<"hack" | "skull" | "reveal">("hack");
    const [visibleLines, setVisibleLines] = useState(0);
    const [countdown, setCountdown] = useState(15);
    const [screenFlicker, setScreenFlicker] = useState(true);

    // Terminal lines
    useEffect(() => {
        if (phase === "hack" && visibleLines < terminalLines.length) {
            const delay = visibleLines < 2 ? 800 : visibleLines < 7 ? 500 : 400;
            const timer = setTimeout(() => setVisibleLines(prev => prev + 1), delay);
            return () => clearTimeout(timer);
        }
        if (phase === "hack" && visibleLines >= terminalLines.length) {
            const timer = setTimeout(() => setPhase("skull"), 1000);
            return () => clearTimeout(timer);
        }
    }, [phase, visibleLines]);

    // Countdown
    useEffect(() => {
        if (phase === "skull" && countdown > 0) {
            const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
        if (phase === "skull" && countdown === 0) {
            setPhase("reveal");
        }
    }, [phase, countdown]);

    // Screen flicker
    useEffect(() => {
        if (phase === "hack" || phase === "skull") {
            const interval = setInterval(() => {
                setScreenFlicker(false);
                setTimeout(() => setScreenFlicker(true), 60);
            }, 4000 + Math.random() * 3000);
            return () => clearInterval(interval);
        }
    }, [phase]);

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto" style={{ background: "#000" }}>
            <AnimatePresence mode="wait">

                {/* ===== HACK SCREEN ===== */}
                {phase === "hack" && (
                    <motion.div
                        key="hack"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: screenFlicker ? 1 : 0.1 }}
                        transition={{ duration: 0.05 }}
                        className="min-h-screen flex flex-col relative"
                        style={{ background: "#0a0a0a" }}
                    >
                        {/* CRT scan lines */}
                        <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.15]"
                            style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 3px)" }}
                        />

                        {/* Red pulsing top bar */}
                        <motion.div
                            animate={{ backgroundColor: ["#dc2626", "#7f1d1d", "#dc2626"] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                            className="sticky top-0 z-20 px-4 py-3 flex items-center justify-center gap-2"
                        >
                            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="text-lg sm:text-xl">⚠️</motion.span>
                            <span className="text-white font-bold text-xs sm:text-sm tracking-widest uppercase">CİHAZINIZ ELE GEÇİRİLDİ</span>
                            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="text-lg sm:text-xl">⚠️</motion.span>
                        </motion.div>

                        {/* Terminal */}
                        <div className="flex-1 p-4 sm:p-8 font-mono z-20 relative max-w-2xl mx-auto w-full">
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-red-900/50">
                                <span className="text-red-500 animate-pulse text-xs">● REC</span>
                                <span className="text-red-700 text-[11px] sm:text-xs">root@attacker:~#</span>
                            </div>

                            <div className="space-y-1.5 sm:space-y-2">
                                {terminalLines.slice(0, visibleLines).map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="text-red-700 shrink-0 text-xs sm:text-sm">$</span>
                                        <span className={`text-xs sm:text-sm ${line.color} leading-relaxed`}>
                                            {line.text}
                                        </span>
                                    </motion.div>
                                ))}

                                {/* Blinking cursor */}
                                {visibleLines < terminalLines.length && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-700 text-xs sm:text-sm">$</span>
                                        <span className="inline-block w-2 h-4 bg-green-500 animate-pulse" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== SKULL + RANSOM ===== */}
                {phase === "skull" && (
                    <motion.div
                        key="skull"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: screenFlicker ? 1 : 0.05 }}
                        className="min-h-screen flex flex-col items-center justify-center relative px-4"
                        style={{ background: "#0a0000" }}
                    >
                        {/* CRT lines */}
                        <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.12]"
                            style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,0,0,0.05) 1px, rgba(255,0,0,0.05) 3px)" }}
                        />

                        {/* Red vignette */}
                        <div className="fixed inset-0 pointer-events-none z-10"
                            style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(139,0,0,0.4) 100%)" }}
                        />

                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 12 }}
                            className="text-7xl sm:text-9xl mb-6 z-20"
                        >
                            💀
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-red-500 font-bold text-xl sm:text-3xl uppercase tracking-[0.15em] text-center mb-3 z-20 font-mono"
                        >
                            TÜM VERİLERİNİZ ÇALINDI
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-red-400/60 text-xs sm:text-sm text-center mb-8 z-20 max-w-md"
                        >
                            Fotoğraflarınız, mesajlarınız ve banka bilgileriniz ele geçirildi.
                            Fidye ödenmezse tüm verileriniz yayınlanacaktır.
                        </motion.p>

                        {/* Countdown */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 }}
                            className="z-20"
                        >
                            <div className="bg-black border-2 border-red-800 rounded-xl px-8 sm:px-12 py-4 sm:py-6 shadow-[0_0_40px_rgba(220,38,38,0.3)]">
                                <p className="text-red-400 text-[11px] sm:text-xs uppercase tracking-widest text-center mb-2 font-mono">Kalan Süre</p>
                                <motion.p
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="text-4xl sm:text-6xl font-mono font-bold text-red-600 tracking-[0.2em] text-center"
                                >
                                    00:00:{countdown.toString().padStart(2, "0")}
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* BTC Address */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-6 z-20 text-center"
                        >
                            <p className="text-red-900 text-[11px] sm:text-xs font-mono">
                                Ödeme adresi: bc1qxy2kgdygjr██████████████████
                            </p>
                        </motion.div>

                        {/* Skip */}
                        <button
                            onClick={() => setPhase("reveal")}
                            className="fixed bottom-6 right-6 text-red-900/40 hover:text-red-700 text-[11px] z-30 bg-transparent border-none cursor-pointer"
                        >
                            geç →
                        </button>
                    </motion.div>
                )}

                {/* ===== THE REVEAL ===== */}
                {phase === "reveal" && (
                    <motion.div
                        key="reveal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="min-h-screen flex flex-col"
                        style={{ background: "linear-gradient(180deg, #022c22 0%, #0a0a1a 40%, #0f172a 100%)" }}
                    >
                        {/* Big shield */}
                        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-12">
                            <motion.div
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.3 }}
                                className="text-6xl sm:text-8xl mb-6"
                            >
                                🛡️
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-emerald-400 font-bold text-xl sm:text-3xl text-center mb-2"
                            >
                                RAHAT OLUN
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="text-emerald-300/70 text-sm sm:text-lg text-center mb-8"
                            >
                                Hacklenmediniz. Bu bir farkındalık deneyimiydi.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                                className="max-w-lg w-full space-y-4"
                            >
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5">
                                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                                        Az önce yaşadığınız o <strong className="text-white">kalp çarpıntısı</strong>, o panik anı...
                                        İşte dolandırıcıların sizden beklediği tepki tam olarak buydu. Panik halindeki bir insan düşünemez, sorgulayamaz — sadece itaat eder.
                                    </p>
                                </div>

                                <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-4 sm:p-5">
                                    <h3 className="text-emerald-400 font-bold text-sm mb-2">Gerçekte ne oldu?</h3>
                                    <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                                        Hiçbir şey. Hiçbir verinize erişilmedi, hiçbir bilginiz çalınmadı, hiçbir dosyanız kopyalanmadı.
                                        Gördüğünüz her satır sadece bir animasyondu. IP adresiniz bile gerçek değildi.
                                    </p>
                                </div>

                                <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 sm:p-5">
                                    <h3 className="text-red-400 font-bold text-sm mb-2">Bunu neden yaptık?</h3>
                                    <p className="text-xs sm:text-sm text-red-200/80 leading-relaxed">
                                        Çünkü gerçek dolandırıcılar tam olarak bu yöntemi kullanıyor.
                                        Sahte bir QR kod, sahte bir link veya sahte bir pop-up ile sizi korkutup para veya bilgi istiyorlar.
                                        <strong className="text-red-300"> Gerçek bir saldırı size &quot;hacklendiniz&quot; demez.</strong> Sessizce çalışır.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Book finale */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.8, duration: 0.8 }}
                                className="mt-8 sm:mt-12 max-w-lg w-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 sm:p-8 border border-blue-500/20 text-center"
                            >
                                <div className="text-4xl sm:text-5xl mb-4">🏆</div>
                                <h2 className="font-bold text-blue-300 text-lg sm:text-xl mb-4">Kitabın Sonuna Ulaştınız</h2>
                                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                                    30 bölüm boyunca sosyal mühendisliğin en yaygın taktiklerini deneyimlediniz.
                                    Artık bir telefon çaldığında, bir e-posta geldiğinde veya bir QR kod gördüğünüzde
                                    bir anlığına durup düşüneceksiniz:
                                </p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.5 }}
                                    className="text-base sm:text-lg font-bold text-white italic leading-relaxed"
                                >
                                    &quot;Bu benim düşüncem mi, yoksa birisi bana bunu düşündürtüyor mu?&quot;
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 3 }}
                                    className="text-xs text-gray-500 mt-4"
                                >
                                    — Osman Can Çetlenbik
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 3.5 }}
                                    className="mt-6"
                                >
                                    <a
                                        href="/"
                                        className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-3 px-8 rounded-xl transition-colors no-underline"
                                    >
                                        Ana Sayfaya Dön
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
