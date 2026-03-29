"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

const attackSteps = [
    { icon: "🔍", text: "Veri sızıntısından Mücahit'in TC, doğum tarihi, anne kızlık soyadı toplandı" },
    { icon: "📞", text: "Operatör müşteri hizmetleri arandı" },
    { icon: "🎭", text: "\"SIM kartım çalındı, acil yeni SIM lazım\" denildi" },
    { icon: "✅", text: "Güvenlik soruları sızdırılmış bilgilerle yanıtlandı" },
    { icon: "📲", text: "Yeni SIM kart aktif edildi — Mücahit'in hattı kesildi" },
];

const bankNotifications = [
    { amount: "2.500 TL", type: "EFT Gönderimi", delay: 0 },
    { amount: "5.000 TL", type: "Havale Gönderimi", delay: 800 },
    { amount: "10.000 TL", type: "EFT Gönderimi", delay: 1600 },
    { amount: "15.000 TL", type: "Online Alışveriş", delay: 2400 },
    { amount: "25.000 TL", type: "Kripto Borsası Transfer", delay: 3200 },
];

export default function Sim27() {
    const [phase, setPhase] = useState<"normal" | "signal-lost" | "attack-flow" | "notifications" | "decision" | "result">("normal");
    const [correct, setCorrect] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [visibleNotifs, setVisibleNotifs] = useState<number[]>([]);
    const [totalStolen, setTotalStolen] = useState(0);
    const [signalBars, setSignalBars] = useState(4);

    // Signal loss animation
    useEffect(() => {
        if (phase === "signal-lost") {
            const intervals = [500, 1000, 1500, 2000];
            const timers = intervals.map((delay, i) =>
                setTimeout(() => setSignalBars(3 - i), delay)
            );
            const nextPhase = setTimeout(() => setPhase("attack-flow"), 3000);
            return () => { timers.forEach(clearTimeout); clearTimeout(nextPhase); };
        }
    }, [phase]);

    // Attack flow steps
    useEffect(() => {
        if (phase === "attack-flow" && currentStep < attackSteps.length) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 1500);
            return () => clearTimeout(timer);
        } else if (phase === "attack-flow" && currentStep >= attackSteps.length) {
            const timer = setTimeout(() => setPhase("notifications"), 1000);
            return () => clearTimeout(timer);
        }
    }, [phase, currentStep]);

    // Bank notifications cascade
    const addNotification = useCallback((index: number) => {
        setVisibleNotifs(prev => [...prev, index]);
        const amounts = [2500, 5000, 10000, 15000, 25000];
        setTotalStolen(prev => prev + amounts[index]);
    }, []);

    useEffect(() => {
        if (phase === "notifications") {
            const timers = bankNotifications.map((notif, i) =>
                setTimeout(() => addNotification(i), notif.delay)
            );
            const decisionTimer = setTimeout(() => setPhase("decision"), 4500);
            return () => { timers.forEach(clearTimeout); clearTimeout(decisionTimer); };
        }
    }, [phase, addNotification]);

    const renderSignalBars = (bars: number) => (
        <div className="flex items-end gap-[2px]">
            {[1, 2, 3, 4].map(i => (
                <div
                    key={i}
                    className={`w-[3px] rounded-sm transition-all duration-300 ${i <= bars ? "bg-white" : "bg-gray-600"}`}
                    style={{ height: `${4 + i * 3}px` }}
                />
            ))}
        </div>
    );

    return (
        <div className="bg-gray-900 min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-sans relative max-w-sm sm:max-w-md mx-auto text-white">

            <AnimatePresence mode="wait">
                {/* 1. Normal State - Both Phones */}
                {phase === "normal" && (
                    <motion.div
                        key="normal"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="bg-gradient-to-r from-blue-900 to-purple-900 px-4 py-3 text-center">
                            <h3 className="font-bold text-sm">Mücahit & İrem — Ortak Hesap</h3>
                            <p className="text-xs text-blue-200">Her şey normal görünüyor...</p>
                        </div>

                        {/* Two phones side by side */}
                        <div className="flex-1 flex flex-col sm:flex-row gap-2 p-3">
                            {/* Mücahit's Phone */}
                            <div className="flex-1 bg-gray-800 rounded-xl p-3 border border-gray-600">
                                <div className="flex justify-between items-center mb-3 text-xs text-gray-400">
                                    <span>Mücahit</span>
                                    <div className="flex items-center gap-1">
                                        {renderSignalBars(4)}
                                        <span className="ml-1">📶</span>
                                    </div>
                                </div>
                                <div className="bg-gray-700 rounded-lg p-3 text-center">
                                    <div className="text-3xl mb-2">📱</div>
                                    <p className="text-xs text-gray-300">Telefon normal çalışıyor</p>
                                    <p className="text-[11px] text-green-400 mt-1">Turkcell 4.5G ✓</p>
                                </div>
                            </div>

                            {/* İrem's Phone */}
                            <div className="flex-1 bg-gray-800 rounded-xl p-3 border border-gray-600">
                                <div className="flex justify-between items-center mb-3 text-xs text-gray-400">
                                    <span>İrem</span>
                                    <div className="flex items-center gap-1">
                                        {renderSignalBars(4)}
                                        <span className="ml-1">📶</span>
                                    </div>
                                </div>
                                <div className="bg-gray-700 rounded-lg p-3 text-center">
                                    <div className="text-3xl mb-2">📱</div>
                                    <p className="text-xs text-gray-300">Telefon normal çalışıyor</p>
                                    <p className="text-[11px] text-green-400 mt-1">Turkcell 4.5G ✓</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4">
                            <button
                                onClick={() => setPhase("signal-lost")}
                                className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-bold transition-colors"
                            >
                                Saldırı Başlasın
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 2. Signal Lost */}
                {phase === "signal-lost" && (
                    <motion.div
                        key="signal-lost"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="bg-red-900/50 px-4 py-3 text-center">
                            <h3 className="font-bold text-sm text-red-300">⚠️ Saldırı Başladı</h3>
                        </div>

                        <div className="flex-1 flex flex-col sm:flex-row gap-2 p-3">
                            {/* Mücahit - losing signal */}
                            <div className="flex-1 bg-gray-800 rounded-xl p-3 border-2 border-red-500/50">
                                <div className="flex justify-between items-center mb-3 text-xs">
                                    <span className="text-red-400 font-bold">Mücahit</span>
                                    <div className="flex items-center gap-1">
                                        {renderSignalBars(signalBars)}
                                        {signalBars === 0 && <span className="text-red-500 text-[11px] ml-1">✕</span>}
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ opacity: signalBars === 0 ? 1 : 0.5 }}
                                    className="bg-red-900/30 rounded-lg p-3 text-center border border-red-500/30"
                                >
                                    <div className="text-3xl mb-2">📵</div>
                                    {signalBars > 0 ? (
                                        <p className="text-xs text-yellow-300">Sinyal zayıflıyor...</p>
                                    ) : (
                                        <>
                                            <p className="text-xs text-red-400 font-bold">SIM Kart Kayıtlı Değil</p>
                                            <p className="text-[11px] text-red-300 mt-1">Servis yok</p>
                                        </>
                                    )}
                                </motion.div>
                            </div>

                            {/* İrem - still normal */}
                            <div className="flex-1 bg-gray-800 rounded-xl p-3 border border-gray-600">
                                <div className="flex justify-between items-center mb-3 text-xs text-gray-400">
                                    <span>İrem</span>
                                    <div className="flex items-center gap-1">
                                        {renderSignalBars(4)}
                                        <span className="ml-1">📶</span>
                                    </div>
                                </div>
                                <div className="bg-gray-700 rounded-lg p-3 text-center">
                                    <div className="text-3xl mb-2">📱</div>
                                    <p className="text-xs text-gray-300">Henüz bir şey fark etmedi</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 3. Attack Flow Diagram */}
                {phase === "attack-flow" && (
                    <motion.div
                        key="attack-flow"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col p-4"
                    >
                        <div className="text-center mb-4">
                            <h3 className="font-bold text-red-400 text-sm">🎭 Saldırgan Operatörü Nasıl Kandırdı?</h3>
                        </div>

                        <div className="flex-1 space-y-2">
                            {attackSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={i < currentStep ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex items-center gap-3 bg-gray-800 rounded-lg p-3 border border-gray-700"
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${i < currentStep ? "bg-red-600" : "bg-gray-700"}`}>
                                        {step.icon}
                                    </div>
                                    <p className="text-xs leading-tight">{step.text}</p>
                                    {i < currentStep && (
                                        <span className="text-green-400 text-xs ml-auto shrink-0">✓</span>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 4. Bank Notifications Cascade */}
                {phase === "notifications" && (
                    <motion.div
                        key="notifications"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="bg-red-900 px-4 py-3 text-center">
                            <h3 className="font-bold text-sm">💸 İrem&apos;in Telefonuna Düşen Bildirimler</h3>
                        </div>

                        {/* Money counter */}
                        <div className="bg-black px-4 py-3 text-center border-b border-red-500/30">
                            <p className="text-xs text-gray-500 uppercase">Çalınan Toplam</p>
                            <motion.p
                                key={totalStolen}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="text-3xl font-mono font-bold text-red-500"
                            >
                                ₺{totalStolen.toLocaleString("tr-TR")}
                            </motion.p>
                        </div>

                        <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                            {bankNotifications.map((notif, i) => (
                                <AnimatePresence key={i}>
                                    {visibleNotifs.includes(i) && (
                                        <motion.div
                                            initial={{ x: 300, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="bg-red-900/40 border border-red-500/30 rounded-lg p-3 flex items-center gap-3"
                                        >
                                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-lg shrink-0">
                                                🏦
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-red-300 font-bold">{notif.type}</p>
                                                <p className="text-[11px] text-gray-400">Ortak hesaptan çıkış</p>
                                            </div>
                                            <span className="text-red-400 font-bold text-sm shrink-0">-{notif.amount}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 5. Decision */}
                {phase === "decision" && (
                    <motion.div
                        key="decision"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <div className="text-5xl mb-4">📵</div>
                        <h3 className="font-bold text-lg mb-2">Telefonunuz Aniden Çekmedi!</h3>
                        <p className="text-sm text-gray-400 mb-6">
                            &quot;SIM kart kayıtlı değil&quot; hatası alıyorsunuz. Ne yaparsınız?
                        </p>

                        <div className="flex flex-col gap-3 w-full">
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-bold transition-colors"
                            >
                                ⚠️ Bekle, Belki Kendiliğinden Düzelir
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition-colors"
                            >
                                ✅ Derhal Başka Hattan Operatörü Ara
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 6. Result */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Hızlı Müdahale!" : "57.500 TL Buhar Oldu!"}
                            message={correct
                                ? "Doğru karar! Mücahit hemen başka bir telefondan operatörünü aradı ve hattının başkası tarafından ele geçirildiğini öğrendi. SIM kart anında bloke edildi, banka hesapları donduruldu ve büyük zarar önlendi."
                                : "Mücahit 'Şebeke sorundur' diye bekledi. Bu sürede dolandırıcı, SMS ile gelen tüm banka onay kodlarını ele geçirdi. Ortak hesaptaki 57.500 TL kripto borsalarına aktarılıp iz kaybettirildi. İrem akşam hesabı kontrol edene kadar iş işten geçmişti."}
                            lesson="SIM Swap saldırısından korunmak için: 1) SMS yerine Authenticator uygulaması kullanın. 2) Operatörünüze SIM değişikliği için ek güvenlik şifresi tanımlayın. 3) Telefon çekmezse hemen farklı bir hattan operatörü arayın."
                            onReset={() => {
                                setPhase("normal");
                                setCorrect(false);
                                setCurrentStep(0);
                                setVisibleNotifs([]);
                                setTotalStolen(0);
                                setSignalBars(4);
                            }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
