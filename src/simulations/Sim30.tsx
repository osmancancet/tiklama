"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

const drainNotifications = [
    { amount: "500 TL", desc: "Online Alışveriş — yabancı site", delay: 0 },
    { amount: "2.000 TL", desc: "Para Transferi — Anonim Hesap", delay: 700 },
    { amount: "5.000 TL", desc: "Kripto Borsası — Bitcoin Alım", delay: 1400 },
    { amount: "8.750 TL", desc: "Döviz Alım — USDT Transfer", delay: 2100 },
    { amount: "15.000 TL", desc: "EFT — Yurt Dışı Hesap", delay: 2800 },
];

export default function Sim30() {
    const [phase, setPhase] = useState<"restaurant" | "scan" | "campaign" | "payment" | "drain" | "decision" | "result">("restaurant");
    const [correct, setCorrect] = useState(false);
    const [stickerHovered, setStickerHovered] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [visibleNotifs, setVisibleNotifs] = useState<number[]>([]);
    const [totalStolen, setTotalStolen] = useState(0);
    const [cardNumber, setCardNumber] = useState("");
    const [showFinale, setShowFinale] = useState(false);

    // Scan animation
    useEffect(() => {
        if (phase === "scan") {
            const timer = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setTimeout(() => setPhase("campaign"), 500);
                        return 100;
                    }
                    return prev + 5;
                });
            }, 80);
            return () => clearInterval(timer);
        }
    }, [phase]);

    // Drain notifications cascade
    const addNotification = useCallback((index: number) => {
        setVisibleNotifs(prev => [...prev, index]);
        const amounts = [500, 2000, 5000, 8750, 15000];
        setTotalStolen(prev => prev + amounts[index]);
    }, []);

    useEffect(() => {
        if (phase === "drain") {
            const timers = drainNotifications.map((_, i) =>
                setTimeout(() => addNotification(i), drainNotifications[i].delay)
            );
            const decisionTimer = setTimeout(() => {
                setCorrect(false);
                setPhase("result");
            }, 4500);
            return () => { timers.forEach(clearTimeout); clearTimeout(decisionTimer); };
        }
    }, [phase, addNotification]);

    // Finale animation for result
    useEffect(() => {
        if (phase === "result" && !correct) {
            const timer = setTimeout(() => setShowFinale(true), 500);
            return () => clearTimeout(timer);
        }
        if (phase === "result" && correct) {
            const timer = setTimeout(() => setShowFinale(true), 500);
            return () => clearTimeout(timer);
        }
    }, [phase, correct]);

    return (
        <div className="bg-gray-900 min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-sans relative max-w-sm sm:max-w-md mx-auto text-white">

            <AnimatePresence mode="wait">
                {/* 1. Restaurant Scene */}
                {phase === "restaurant" && (
                    <motion.div
                        key="restaurant"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Restaurant atmosphere */}
                        <div className="bg-gradient-to-b from-amber-900/80 to-gray-900 px-4 py-3 text-center">
                            <h3 className="font-bold text-amber-200 text-sm">🍽️ Lezzet Durağı Restoran</h3>
                            <p className="text-xs text-amber-300/70">Abdurrahman ve Şevval akşam yemeğinde</p>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                            {/* Table surface */}
                            <div className="w-full bg-gradient-to-b from-amber-800/40 to-amber-900/60 rounded-2xl p-6 border border-amber-700/30 relative">
                                {/* Menu stand with QR */}
                                <div className="bg-white rounded-xl p-4 mx-auto max-w-[200px] shadow-xl relative">
                                    <p className="text-center text-gray-800 text-xs font-bold mb-2">📋 Dijital Menü</p>
                                    <p className="text-center text-gray-500 text-[11px] mb-3">QR Kodu okutun</p>

                                    {/* QR Code with sticker indicator */}
                                    <div
                                        className="relative mx-auto w-32 h-32 cursor-pointer"
                                        onMouseEnter={() => setStickerHovered(true)}
                                        onMouseLeave={() => setStickerHovered(false)}
                                        onTouchStart={() => setStickerHovered(true)}
                                        onTouchEnd={() => setStickerHovered(false)}
                                    >
                                        {/* QR Code pattern */}
                                        <div className="w-full h-full bg-white border-2 border-gray-200 rounded-lg p-2 grid grid-cols-5 gap-1">
                                            {Array.from({ length: 25 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`rounded-sm ${[0, 1, 2, 5, 6, 10, 12, 14, 18, 19, 20, 22, 23, 24].includes(i) ? "bg-gray-900" : "bg-white"}`}
                                                />
                                            ))}
                                        </div>

                                        {/* Sticker edge - visible on hover */}
                                        <AnimatePresence>
                                            {stickerHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute -top-1 -right-1 w-6 h-6"
                                                >
                                                    <div className="w-full h-full bg-yellow-300 rounded-sm rotate-12 shadow-md flex items-center justify-center">
                                                        <span className="text-[8px] text-yellow-800">📌</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {stickerHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute -bottom-8 left-0 right-0 text-center"
                                            >
                                                <span className="text-[11px] text-red-400 bg-red-900/80 px-2 py-0.5 rounded">
                                                    ⚠️ Sticker yapıştırılmış!
                                                </span>
                                            </motion.div>
                                        )}
                                    </div>

                                    <p className="text-center text-gray-400 text-[11px] mt-4">
                                        QR&apos;ın üzerine dokunun
                                    </p>
                                </div>

                                {/* Table items */}
                                <div className="flex justify-between mt-4 px-4">
                                    <span className="text-2xl">🥤</span>
                                    <span className="text-2xl">🍽️</span>
                                    <span className="text-2xl">🕯️</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex flex-col gap-2">
                            <button
                                onClick={() => setPhase("scan")}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-colors"
                            >
                                📱 QR Kodu Tara
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-bold transition-colors"
                            >
                                🔍 Sticker Şüpheli — Garsona Sor
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 2. Scanning Animation */}
                {phase === "scan" && (
                    <motion.div
                        key="scan"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center bg-black relative"
                    >
                        {/* Camera viewfinder */}
                        <div className="w-64 h-64 relative">
                            {/* Viewfinder corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-400" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-400" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-400" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400" />

                            {/* QR Code in center */}
                            <div className="absolute inset-8 bg-white/10 rounded-lg flex items-center justify-center">
                                <div className="w-24 h-24 grid grid-cols-5 gap-0.5 p-1">
                                    {Array.from({ length: 25 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`rounded-sm ${[0, 1, 2, 5, 6, 10, 12, 14, 18, 19, 20, 22, 23, 24].includes(i) ? "bg-white/80" : "bg-transparent"}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Scanning laser line */}
                            <motion.div
                                animate={{ y: [0, 240, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="absolute left-2 right-2 h-0.5 bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                            />
                        </div>

                        {/* Progress */}
                        <div className="mt-6 w-64">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Taranıyor...</span>
                                <span>{scanProgress}%</span>
                            </div>
                            <div className="h-1 bg-gray-700 rounded overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-400"
                                    style={{ width: `${scanProgress}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                URL: restoran-kampanya.com
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* 3. Fake Campaign Page */}
                {phase === "campaign" && (
                    <motion.div
                        key="campaign"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col bg-white text-gray-800"
                    >
                        <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                            <span className="text-xs">🔒</span>
                            <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-600 border border-gray-300">
                                restoran-kampanya.com/odul
                            </div>
                        </div>

                        <div className="flex-1 p-4">
                            {/* Campaign banner */}
                            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 text-center text-white mb-4">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-4xl mb-2"
                                >
                                    🎉
                                </motion.div>
                                <h2 className="text-lg font-bold">Tebrikler!</h2>
                                <p className="text-sm">%50 İndirim Kuponu Kazandınız!</p>
                                <p className="text-xs mt-1 opacity-80">Lezzet Durağı Özel Kampanya</p>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                <p className="text-sm text-gray-700">
                                    Kuponunuzu aktifleştirmek için kart bilgilerinizi girin.
                                    Hesabınıza <strong>0,01 TL</strong> doğrulama ücreti yansıyacak ve iade edilecektir.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setPhase("payment")}
                                    className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition-colors"
                                >
                                    💳 Kart Bilgilerini Gir
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-bold transition-colors"
                                >
                                    🚫 Bu Şüpheli — Sayfayı Kapat
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 4. Payment Form */}
                {phase === "payment" && (
                    <motion.div
                        key="payment"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col bg-white text-gray-800"
                    >
                        <div className="bg-green-700 px-4 py-3 text-center text-white">
                            <p className="font-bold text-sm">💳 Güvenli Ödeme</p>
                            <p className="text-xs text-green-200">256-bit SSL Şifreleme</p>
                        </div>

                        <div className="flex-1 p-4">
                            <div className="space-y-3 mb-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Kart Numarası</label>
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500 mb-1 block">Son Kullanma</label>
                                        <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-400">
                                            MM/YY
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs text-gray-500 mb-1 block">CVV</label>
                                        <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-400">
                                            •••
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Kart Sahibi</label>
                                    <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-400">
                                        ŞEVVAL •••
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 text-center mb-3">
                                Doğrulama: 0,01 TL — Anında iade edilecektir
                            </p>

                            <button
                                onClick={() => setPhase("drain")}
                                className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition-colors"
                            >
                                ✅ Ödemeyi Onayla
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 5. Money Drain Cascade */}
                {phase === "drain" && (
                    <motion.div
                        key="drain"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="bg-red-900 px-4 py-3 text-center">
                            <h3 className="font-bold text-sm">💸 Hesap Boşaltılıyor!</h3>
                        </div>

                        {/* Money counter */}
                        <div className="bg-black px-4 py-3 text-center border-b border-red-500/30">
                            <p className="text-xs text-gray-500 uppercase">Çalınan Toplam</p>
                            <motion.p
                                key={totalStolen}
                                initial={{ scale: 1.3, color: "#ff0000" }}
                                animate={{ scale: 1, color: "#ef4444" }}
                                className="text-3xl font-mono font-bold"
                            >
                                ₺{totalStolen.toLocaleString("tr-TR")}
                            </motion.p>
                        </div>

                        <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                            {drainNotifications.map((notif, i) => (
                                <AnimatePresence key={i}>
                                    {visibleNotifs.includes(i) && (
                                        <motion.div
                                            initial={{ x: 300, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="bg-red-900/40 border border-red-500/30 rounded-lg p-3 flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm shrink-0">
                                                💸
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-red-300">{notif.desc}</p>
                                            </div>
                                            <span className="text-red-400 font-bold text-sm shrink-0">-{notif.amount}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 6. Decision (alt path) */}
                {phase === "decision" && (
                    <motion.div
                        key="decision"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="text-5xl mb-4">📷</div>
                        <h3 className="font-bold text-lg mb-2">QR Kodu Taramalı mısınız?</h3>
                        <div className="flex flex-col gap-3 w-full">
                            <button
                                onClick={() => setPhase("scan")}
                                className="bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold"
                            >
                                ⚠️ QR Kodu Tara
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold"
                            >
                                ✅ Sticker&apos;ı Kontrol Et, Garsona Sor
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 7. Result */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Tuzağı Fark Ettiniz!" : "31.250 TL Çalındı!"}
                            message={correct
                                ? "Mükemmel! QR kodun üzerindeki yapışkan sticker'ı fark ettiniz ve garsona sordunuz. Garson QR'ın restorana ait olmadığını doğruladı. Abdurrahman ve Şevval dolandırıcılıktan korunmuş oldu."
                                : "Şevval kart bilgilerini girdi ve 'doğrulama' için 0,01 TL yerine toplam 31.250 TL çekildi. Dolandırıcı, restoran QR kodunun üzerine kendi sahte sticker'ını yapıştırmıştı. Kart bilgileri anında kopyalandı ve zincirleme harcamalar yapıldı."}
                            lesson="QR kodları taramadan önce fiziksel sticker olup olmadığını kontrol edin. QR ile açılan sayfada ASLA kart/şifre/kişisel bilgi girmeyin. Kupon ve indirim için kart bilgisi istenmez. Ödeme için POS cihazı veya resmi uygulama kullanın."
                            onReset={() => {
                                setPhase("restaurant");
                                setCorrect(false);
                                setStickerHovered(false);
                                setScanProgress(0);
                                setVisibleNotifs([]);
                                setTotalStolen(0);
                                setCardNumber("");
                                setShowFinale(false);
                            }}
                        />

                        {/* Finale overlay for the last chapter */}
                        {showFinale && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-5 border border-blue-500/30 text-center"
                            >
                                <div className="text-3xl mb-2">🏆</div>
                                <h3 className="font-bold text-blue-300 mb-2">Kitabın Sonuna Ulaştınız!</h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    30 bölüm boyunca sosyal mühendisliğin en yaygın taktiklerini deneyimlediniz.
                                    Artık bir telefon çaldığında, bir e-posta geldiğinde veya bir QR kod gördüğünüzde
                                    durup düşüneceksiniz:
                                </p>
                                <p className="text-base font-bold text-white mt-3 italic">
                                    &quot;Bu benim düşüncem mi, yoksa birisi bana bunu düşündürtüyor mu?&quot;
                                </p>
                                <p className="text-xs text-gray-400 mt-3">— Osman Can Çetlenbik</p>
                            </motion.div>
                        )}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
