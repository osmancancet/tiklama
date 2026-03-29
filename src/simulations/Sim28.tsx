"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";
import TerminalText from "@/components/TerminalText";

const aftermathItems = [
    { icon: "💳", text: "Adınıza açılmış kredi kartı: 45.000 TL borç", delay: 0 },
    { icon: "🏢", text: "Adınıza kurulan paravan şirket: 'BM Digital Ltd.'", delay: 800 },
    { icon: "📱", text: "Adınıza açılmış 3 telefon hattı", delay: 1600 },
    { icon: "⚖️", text: "İcra takibi başlatıldı: 128.000 TL", delay: 2400 },
    { icon: "🚫", text: "Kredi notu: 0 — Hiçbir bankadan kredi alamazsınız", delay: 3200 },
];

const hackerLines = [
    "[GİRİŞ] turkiye.gov.tr → Oturum açılıyor...",
    "[BAŞARILI] Merve'nin e-Devlet hesabına girildi",
    "[EYLEM] Nüfus bilgileri → kopyalandı",
    "[EYLEM] Şirket kuruluş başvurusu yapılıyor...",
    "[EYLEM] Kredi kartı başvurusu gönderiliyor...",
    "[EYLEM] Telefon hattı başvuruları onaylandı",
    "[TAMAMLANDI] Kimlik tamamen ele geçirildi!",
];

export default function Sim28() {
    const [phase, setPhase] = useState<"sms" | "login" | "hacker-view" | "aftermath" | "decision" | "result">("sms");
    const [correct, setCorrect] = useState(false);
    const [showDomainTip, setShowDomainTip] = useState(false);
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [hackerDone, setHackerDone] = useState(false);

    // Aftermath items cascade
    useEffect(() => {
        if (phase === "aftermath") {
            const timers = aftermathItems.map((item, i) =>
                setTimeout(() => setVisibleItems(prev => [...prev, i]), item.delay)
            );
            return () => timers.forEach(clearTimeout);
        }
    }, [phase]);

    return (
        <div className="bg-gray-900 min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-sans relative max-w-sm sm:max-w-md mx-auto text-white">

            <AnimatePresence mode="wait">
                {/* 1. SMS Phase */}
                {phase === "sms" && (
                    <motion.div
                        key="sms"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="flex justify-between items-center px-4 py-2 bg-black text-xs text-gray-400">
                            <span>14:23</span>
                            <div className="flex items-center gap-1">
                                <span>📶</span>
                                <span>🔋 62%</span>
                            </div>
                        </div>

                        <div className="flex-1 bg-gray-100 p-4">
                            <div className="text-center text-gray-500 text-xs mb-4">Mesajlar</div>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-md max-w-[90%] border border-gray-200"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">🏛️</div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">e-Devlet</p>
                                        <p className="text-[11px] text-gray-400">+90 XXX XXX XX XX</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed">
                                    Sayın vatandaşımız, e-Devlet randevunuz onaylanmıştır. Kimlik doğrulaması için aşağıdaki bağlantıya tıklayınız:
                                </p>
                                <p className="text-sm text-blue-600 underline mt-2 break-all">
                                    hxxps://e-devIet-giris.com/dogrula
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    24 saat içinde doğrulama yapılmazsa randevunuz iptal edilecektir.
                                </p>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="text-center text-xs text-gray-500 mt-6 bg-yellow-50 p-2 rounded border border-yellow-200"
                            >
                                Batuhan ve Merve evlilik randevusu bekliyor. Merve linke tıkladı...
                            </motion.p>
                        </div>

                        <div className="p-4 bg-gray-900">
                            <button
                                onClick={() => setPhase("login")}
                                className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold transition-colors"
                            >
                                Linke Tıkla
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 2. Fake e-Devlet Login */}
                {phase === "login" && (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col bg-white text-gray-800"
                    >
                        {/* Fake address bar with magnifying glass */}
                        <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                            <span className="text-xs">🔒</span>
                            <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-600 border border-gray-300 relative">
                                <span>e-dev<span className="text-gray-800">I</span>et-giris.com/dogrula</span>
                                <button
                                    onClick={() => setShowDomainTip(!showDomainTip)}
                                    className="absolute right-1 top-0.5 text-sm cursor-pointer"
                                    title="Adresi incele"
                                >
                                    🔍
                                </button>
                            </div>
                        </div>

                        {/* Domain warning tooltip */}
                        <AnimatePresence>
                            {showDomainTip && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-red-50 border border-red-300 mx-3 mt-2 p-3 rounded-lg"
                                >
                                    <p className="text-xs text-red-700 font-bold mb-1">⚠️ SAHTE DOMAIN TESPİT EDİLDİ!</p>
                                    <p className="text-xs text-red-600">
                                        Gerçek adres: <strong>turkiye.gov.tr</strong><br />
                                        Bu adres: <strong>e-dev<span className="text-red-800 underline">I</span>et-giris.com</strong><br />
                                        &quot;l&quot; harfi yerine büyük &quot;I&quot; kullanılmış!
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Fake e-Devlet page */}
                        <div className="flex-1 p-4">
                            <div className="text-center mb-4">
                                <div className="w-16 h-16 bg-red-600 rounded-xl mx-auto flex items-center justify-center text-3xl shadow-lg mb-2">
                                    🏛️
                                </div>
                                <h2 className="font-bold text-lg text-gray-800">e-Devlet Kapısı</h2>
                                <p className="text-xs text-gray-500">Türkiye Cumhuriyeti</p>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">TC Kimlik Numarası</label>
                                    <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-400 text-sm">
                                        XXXXXXXXXXX
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">e-Devlet Şifresi</label>
                                    <div className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-400 text-sm">
                                        ••••••••
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setPhase("hacker-view")}
                                    className="bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold transition-colors shadow-md"
                                >
                                    Giriş Yap
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-bold transition-colors"
                                >
                                    🔍 Adres Şüpheli — Sayfayı Kapat
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 3. Hacker View - Credentials Captured */}
                {phase === "hacker-view" && (
                    <motion.div
                        key="hacker-view"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Top: User sees "success" */}
                        <div className="bg-green-700 p-4 text-center">
                            <div className="bg-white/20 rounded-lg p-3">
                                <div className="text-2xl mb-1">✅</div>
                                <p className="text-sm font-bold">Giriş başarılı, yönlendiriliyorsunuz...</p>
                                <div className="mt-2 h-1 bg-white/30 rounded overflow-hidden">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 8 }}
                                        className="h-full bg-white rounded"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Hacker terminal */}
                        <div className="flex-1 bg-black p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-red-500 text-xs font-bold animate-pulse">● REC</span>
                                <span className="text-xs text-gray-500">Saldırgan — Gerçekte Olan</span>
                            </div>
                            <TerminalText
                                lines={hackerLines}
                                speed={40}
                                onComplete={() => {
                                    setHackerDone(true);
                                    setTimeout(() => setPhase("aftermath"), 1500);
                                }}
                            />
                            {hackerDone && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-xs mt-3 font-bold text-center"
                                >
                                    🎭 Merve&apos;nin dijital kimliği tamamen ele geçirildi!
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 4. Aftermath - Weeks Later */}
                {phase === "aftermath" && (
                    <motion.div
                        key="aftermath"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="bg-red-900 px-4 py-3 text-center">
                            <h3 className="font-bold text-sm">📬 3 Hafta Sonra — Posta Kutusu</h3>
                            <p className="text-xs text-red-300">Batuhan ve Merve&apos;ye gelen mektuplar</p>
                        </div>

                        <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                            {aftermathItems.map((item, i) => (
                                <AnimatePresence key={i}>
                                    {visibleItems.includes(i) && (
                                        <motion.div
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="bg-gray-800 border border-red-500/30 rounded-lg p-3 flex items-center gap-3"
                                        >
                                            <div className="w-10 h-10 bg-red-900/50 rounded-full flex items-center justify-center text-lg shrink-0">
                                                {item.icon}
                                            </div>
                                            <p className="text-sm text-gray-200">{item.text}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            ))}

                            {visibleItems.length >= aftermathItems.length && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-4"
                                >
                                    <button
                                        onClick={() => { setCorrect(false); setPhase("result"); }}
                                        className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold transition-colors"
                                    >
                                        Sonucu Gör
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 5. Decision (alternative path) */}
                {phase === "decision" && (
                    <motion.div
                        key="decision"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <p className="text-lg mb-6">Merve ne yapmalı?</p>
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                onClick={() => setPhase("hacker-view")}
                                className="bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold"
                            >
                                ⚠️ Bilgileri Gir
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold"
                            >
                                ✅ Adresi Kontrol Et ve Kapat
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 6. Result */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Sahte Siteyi Fark Ettiniz!" : "Kimlik Hırsızlığı Gerçekleşti!"}
                            message={correct
                                ? "Harika! Adres çubuğundaki sahte domain'i fark ettiniz. Gerçek e-Devlet adresi 'turkiye.gov.tr'dir. SMS ile gelen linklere asla güvenmeyin, her zaman tarayıcıya kendiniz yazın."
                                : "Merve sahte e-Devlet sitesine TC ve şifresini girdi. Saldırgan bu bilgilerle gerçek e-Devlet'e girip adlarına şirket kurdu, kredi kartı açtı ve telefon hattı aldı. Batuhan ve Merve haftalarca icra takibi ve kimlik hırsızlığı mağduriyetiyle uğraşmak zorunda kaldı."}
                            lesson="e-Devlet'e YALNIZCA 'turkiye.gov.tr' yazarak girin. SMS'teki linklere tıklamayın. e-Devlet hesabınızı düzenli kontrol edip adınıza açılmış şirket/hat/hesap olup olmadığını sorgulayın."
                            onReset={() => {
                                setPhase("sms");
                                setCorrect(false);
                                setShowDomainTip(false);
                                setVisibleItems([]);
                                setHackerDone(false);
                            }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
