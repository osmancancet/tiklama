"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim02() {
    const [phase, setPhase] = useState<"inbox" | "email" | "result">("inbox");
    const [correct, setCorrect] = useState(false);
    const [showReal, setShowReal] = useState(false);

    return (
        <div>
            {phase === "inbox" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="bg-bg-primary rounded-lg border border-border-color overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-border-color bg-bg-card">
                        <span className="text-sm">📧</span>
                        <span className="text-xs font-mono text-text-muted">Outlook — Gelen Kutusu (1)</span>
                    </div>
                    <div className="p-1">
                        <button onClick={() => setPhase("email")}
                            className="w-full text-left p-3 rounded-lg hover:bg-bg-card-hover transition-colors bg-transparent border-none cursor-pointer">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-neon-blue flex-shrink-0 inline-block"></span>
                                <div className="min-w-0 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-text-primary">Genel Müdür — Mehmet Kaya</span>
                                        <span className="text-[10px] text-danger-red font-mono">ACİL!</span>
                                    </div>
                                    <p className="text-xs text-text-secondary truncate">Acil Ödeme Talimatı — Bugün 17:00&apos;a kadar yapılmalı</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </motion.div>
            )}

            {phase === "email" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="bg-bg-primary rounded-lg border border-border-color overflow-hidden">
                    <div className="px-4 py-3 border-b border-border-color bg-bg-card">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-bold text-text-primary">Acil Ödeme Talimatı</p>
                                <div className="mt-1">
                                    <span className="text-xs text-text-secondary">Gönderen: </span>
                                    <span className="text-xs text-text-primary font-medium cursor-pointer relative"
                                        onMouseEnter={() => setShowReal(true)}
                                        onMouseLeave={() => setShowReal(false)}>
                                        Mehmet Kaya (Genel Müdür)
                                        {showReal && (
                                            <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                                className="absolute left-0 top-full mt-1 bg-danger-red/90 text-white px-3 py-1 rounded text-[10px] whitespace-nowrap z-10 font-mono">
                                                ⚠️ ceo@holding-onay.com (SAHTE!)
                                            </motion.span>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <span className="text-[10px] bg-danger-red/20 text-danger-red px-2 py-1 rounded font-mono">ÖNEMLİ</span>
                        </div>
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-text-secondary leading-relaxed mb-4">
                            Ahmet Bey, acil bir ödeme yapmamız gerekiyor. Aşağıdaki hesaba bugün saat 17:00&apos;a kadar
                            450.000 TL gönderin. Bu işlem hakkında kimseyle konuşmayın, denetim nedeniyle gizli tutulması gerekiyor.
                        </p>
                        <div className="bg-bg-card rounded-lg p-3 text-xs font-mono text-text-muted mb-4">
                            <p>IBAN: TR12 0001 2345 6789 0000 1234 56</p>
                            <p>Alıcı: XYZ Danışmanlık Ltd.</p>
                        </div>
                        <p className="text-xs text-warning-yellow mb-4">
                            💡 İpucu: Gönderen ismine fare ile üzerine gelin...
                        </p>
                        <div className="flex gap-3">
                            <button className="btn-danger flex-1" onClick={() => { setCorrect(false); setPhase("result"); }}>
                                💸 Ödemeyi Yap
                            </button>
                            <button className="btn-safe flex-1" onClick={() => { setCorrect(true); setPhase("result"); }}>
                                📞 CEO'yu Ara ve Teyit Et
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Harika! Teyit Aldınız!" : "Şirket 450.000 TL Zarara Uğradı!"}
                    message={correct
                        ? "Farklı kanaldan teyit alarak şirketinizi korudunuz."
                        : "Sahte e-postaya kanıp şirket parasını dolandırıcılara gönderdiniz."}
                    lesson="Görünen isim sahteciliğine dikkat edin! E-posta adresini kontrol edin ve finansal işlemler için farklı kanaldan teyit alın."
                    onReset={() => setPhase("inbox")}
                />
            )}
        </div>
    );
}
