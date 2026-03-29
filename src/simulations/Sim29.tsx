"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";
import TerminalText from "@/components/TerminalText";

export default function Sim29() {
    const [phase, setPhase] = useState<"sms" | "download" | "app-login" | "hacker-terminal" | "decision" | "result">("sms");
    const [correct, setCorrect] = useState(false);
    const [capturedData, setCapturedData] = useState<string[]>([]);
    const [tcInput, setTcInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [showCapture, setShowCapture] = useState(false);
    const [transferStarted, setTransferStarted] = useState(false);

    useEffect(() => {
        if (phase === "hacker-terminal" && capturedData.length > 0 && !transferStarted) {
            const timer = setTimeout(() => {
                setTransferStarted(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [phase, capturedData, transferStarted]);

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
                        {/* Phone status bar */}
                        <div className="flex justify-between items-center px-4 py-2 bg-black text-xs text-gray-400">
                            <span>09:41</span>
                            <div className="flex items-center gap-1">
                                <span>📶</span>
                                <span>🔋 87%</span>
                            </div>
                        </div>

                        <div className="flex-1 bg-gray-100 p-4">
                            <div className="text-center text-gray-500 text-xs mb-4">Mesajlar</div>

                            {/* SMS Bubble */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-md max-w-[90%] border border-gray-200"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">B</div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Bankamız</p>
                                        <p className="text-[11px] text-gray-400">+90 850 XXX XX XX</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed">
                                    Sayın müşterimiz, mobil bankacılık uygulamanız güncellenmiştir. Güvenliğiniz için yeni sürümü indirin:
                                </p>
                                <p className="text-sm text-blue-600 underline mt-2 break-all">
                                    hxxps://bankamiz-guncelleme.app/indir
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Eski sürüm 48 saat sonra devre dışı kalacaktır.
                                </p>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="text-center text-xs text-gray-500 mt-6 bg-yellow-50 p-2 rounded border border-yellow-200"
                            >
                                Hüseyin Bey bu SMS&apos;i bankasından geldiğini sanarak linke tıkladı...
                            </motion.p>
                        </div>

                        <div className="p-4 bg-gray-900">
                            <button
                                onClick={() => setPhase("download")}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-colors"
                            >
                                Linke Tıkla
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 2. Fake App Store Download */}
                {phase === "download" && (
                    <motion.div
                        key="download"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col bg-white text-gray-800"
                    >
                        {/* Fake address bar */}
                        <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                            <span className="text-xs">🔒</span>
                            <div className="flex-1 bg-white rounded-full px-3 py-1 text-xs text-gray-600 border border-gray-300">
                                <span className="text-green-600">🔒 </span>
                                bankamiz-guncelleme.app
                            </div>
                        </div>

                        <div className="flex-1 p-4">
                            {/* App Icon and Info */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                                    🏦
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">Bankamız Mobil</h3>
                                    <p className="text-sm text-green-600">Bankamız A.Ş.</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <span className="text-yellow-500 text-sm">★★★★★</span>
                                        <span className="text-xs text-gray-500">4.8 (125B)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Red flags - subtle */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs space-y-1 text-gray-500">
                                <div className="flex justify-between">
                                    <span>Geliştirici:</span>
                                    <span className="text-red-400 font-mono">bankamiz-apps-llc</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Yüklenme tarihi:</span>
                                    <span className="text-red-400">Dün</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>İndirme:</span>
                                    <span>10M+</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Boyut:</span>
                                    <span>12.4 MB</span>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                <p className="text-xs text-yellow-700">
                                    ⚠️ Dikkat: Geliştirici adı resmi banka adıyla uyuşmuyor ve uygulama dün yüklenmiş. Gerçek uygulama yıllardır mağazada!
                                </p>
                            </div>

                            {/* Decision */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => setPhase("app-login")}
                                    className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition-colors shadow-md"
                                >
                                    📥 Uygulamayı İndir
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-bold transition-colors"
                                >
                                    🛑 Resmi Mağazadan Kendin Ara
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 3. Fake Banking App Login */}
                {phase === "app-login" && (
                    <motion.div
                        key="app-login"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Bank App Header */}
                        <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 py-6 text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-3xl shadow-lg mb-3">
                                🏦
                            </div>
                            <h2 className="text-xl font-bold">Bankamız Mobil</h2>
                            <p className="text-green-200 text-sm">Güvenli Giriş</p>
                        </div>

                        <div className="flex-1 bg-gray-50 p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">TC Kimlik No</label>
                                    <input
                                        type="text"
                                        value={tcInput}
                                        onChange={(e) => setTcInput(e.target.value.replace(/\D/g, "").slice(0, 11))}
                                        placeholder="XXXXXXXXXXX"
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Şifre</label>
                                    <input
                                        type="password"
                                        value={passInput}
                                        onChange={(e) => setPassInput(e.target.value.slice(0, 6))}
                                        placeholder="••••••"
                                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-green-500"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setCapturedData([
                                        `[YAKALANDI] TC Kimlik: ${tcInput || "123*****901"}`,
                                        `[YAKALANDI] Şifre: ${"*".repeat(passInput.length || 6)}`,
                                        "[BEKLENİYOR] SMS Onay Kodu...",
                                        `[YAKALANDI] SMS OTP: 485291`,
                                        "[TRANSFER] 47.500 TL → TR12 XXXX XXXX ...",
                                        "[BAŞARILI] Para aktarıldı!",
                                    ]);
                                    setPhase("hacker-terminal");
                                }}
                                className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold mt-6 transition-colors"
                            >
                                Giriş Yap
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                Bankamız A.Ş. © 2026 — Güvenli bağlantı
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* 4. Hacker Terminal - Real-time Capture */}
                {phase === "hacker-terminal" && (
                    <motion.div
                        key="hacker-terminal"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Split screen */}
                        <div className="flex-1 flex flex-col">
                            {/* Top: Fake App showing "error" */}
                            <div className="bg-gradient-to-r from-green-600 to-green-800 p-4 text-center">
                                <div className="bg-white/20 rounded-lg p-3">
                                    <div className="text-2xl mb-2">⏳</div>
                                    <p className="text-sm font-bold">İşlem yapılıyor...</p>
                                    <p className="text-xs text-green-200 mt-1">Lütfen bekleyin</p>
                                </div>
                            </div>

                            {showCapture && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-green-800 p-3 text-center"
                                >
                                    <p className="text-sm text-yellow-300">⚠️ İşlem başarısız. Lütfen tekrar deneyin.</p>
                                </motion.div>
                            )}

                            {/* Bottom: Hacker View */}
                            <div className="flex-1 bg-black p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-red-500 text-xs font-bold animate-pulse">● REC</span>
                                    <span className="text-xs text-gray-500">Saldırgan Terminali</span>
                                </div>
                                <TerminalText
                                    lines={capturedData}
                                    speed={40}
                                    onComplete={() => {
                                        setShowCapture(true);
                                        setTimeout(() => {
                                            setCorrect(false);
                                            setPhase("result");
                                        }, 2500);
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 5. Decision Phase (alt path - shown from download) */}
                {phase === "decision" && (
                    <motion.div
                        key="decision"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <p className="text-lg mb-6">Hüseyin Bey ne yapmalı?</p>
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                onClick={() => setPhase("app-login")}
                                className="bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold"
                            >
                                ⚠️ Linkteki Uygulamayı İndir
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold"
                            >
                                ✅ Resmi Mağazadan Kendin Ara
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 6. Result */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Hüseyin Bey Kurtuldu!" : "Hesap Boşaltıldı!"}
                            message={correct
                                ? "Doğru karar! Hüseyin Bey SMS'teki linke tıklamak yerine resmi uygulama mağazasından bankasını aradı. Gerçek uygulamanın zaten güncel olduğunu gördü ve dolandırıcılık girişimini fark etti."
                                : "Hüseyin Bey sahte uygulamaya bilgilerini girdi. Saldırgan TC kimlik, şifre ve SMS onay kodunu ele geçirip hesaptaki 47.500 TL'yi saniyeler içinde başka hesaplara aktardı. Uygulama 'İşlem başarısız' diyerek Hüseyin Bey'yı oyaladı."}
                            lesson="Banka uygulamalarını YALNIZCA resmi App Store veya Google Play'den indirin. SMS ile gelen 'güncelleme' linkleri sahte olabilir. Gerçek bankalar asla SMS ile uygulama linki göndermez."
                            onReset={() => {
                                setPhase("sms");
                                setCorrect(false);
                                setCapturedData([]);
                                setTcInput("");
                                setPassInput("");
                                setShowCapture(false);
                                setTransferStarted(false);
                            }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
