"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim08() {
    const [phase, setPhase] = useState<"setup" | "hack" | "result">("setup");

    const accounts = [
        { name: "Spor Forumu", icon: "⚽", color: "bg-green-600" },
        { name: "E-Posta", icon: "📧", color: "bg-blue-600" },
        { name: "Instagram", icon: "📸", color: "bg-purple-600" },
        { name: "Amazon", icon: "🛒", color: "bg-orange-500" },
        { name: "Banka", icon: "🏦", color: "bg-red-600" },
    ];

    const [hackedCount, setHackedCount] = useState(0);

    useEffect(() => {
        if (phase === "hack") {
            const interval = setInterval(() => {
                setHackedCount((prev) => {
                    if (prev < accounts.length) return prev + 1;
                    clearInterval(interval);
                    setTimeout(() => setPhase("result"), 1000);
                    return prev;
                });
            }, 800);
            return () => clearInterval(interval);
        }
    }, [phase, accounts.length]);

    return (
        <div>
            {phase === "setup" && (
                <div className="text-center max-w-lg mx-auto">
                    <h3 className="text-xl font-bold mb-6">Şifre Alışkanlığınız Nasıl?</h3>
                    <div className="bg-bg-card p-6 rounded-xl border border-border-color mb-8">
                        <p className="mb-4 text-text-secondary">Kullanıcı: <strong>ilayda_yilmaz</strong></p>
                        <p className="mb-6 text-text-primary text-xl font-mono border-b border-zinc-700 inline-block pb-1">
                            Sifrem123!
                        </p>
                        <p className="text-sm text-text-muted">Bu şifreyi kaç yerde kullanıyorsunuz?</p>
                        <div className="flex justify-center gap-2 mt-4 text-2xl">
                            {accounts.map((acc, i) => (
                                <div key={i} title={acc.name} className="opacity-50 grayscale hover:grayscale-0 transition-all cursor-help">{acc.icon}</div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => { setHackedCount(0); setPhase("hack"); }}
                        className="btn-danger w-full animate-pulse"
                    >
                        ⚠️ Forum Sitesi Hacklendi! (Simüle Et)
                    </button>
                </div>
            )}

            {phase === "hack" && (
                <div className="max-w-lg mx-auto">
                    <h3 className="text-center text-danger-red font-bold mb-8 animate-pulse">ZİNCİRLEME REAKSİYON BAŞLADI</h3>
                    <div className="space-y-3">
                        {accounts.map((acc, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{
                                    x: i < hackedCount ? 0 : -20,
                                    opacity: i < hackedCount ? 1 : 0.3
                                }}
                                className={`p-4 rounded-lg flex items-center justify-between border ${i < hackedCount ? 'border-danger-red bg-danger-red/10' : 'border-zinc-800'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{acc.icon}</span>
                                    <span className="font-bold">{acc.name}</span>
                                </div>
                                <div className="font-mono text-xs">
                                    {i < hackedCount ? (
                                        <span className="text-danger-red font-bold">ŞİFRE EŞLEŞTİ [HACKED]</span>
                                    ) : (
                                        <span className="text-zinc-600">Bekleniyor...</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={false}
                    title="Tüm Hesaplarınız Gitti!"
                    message="Basit bir forum sitesindeki veri ihlali, aynı şifreyi kullandığınız için banka hesabınıza kadar ulaştı."
                    lesson="Domino etkisini durdurun! Her site için benzersiz şifre kullanın (Password Manager) ve 2FA (İki Faktörlü Doğrulama) açın."
                    onReset={() => setPhase("setup")}
                />
            )}
        </div>
    );
}
