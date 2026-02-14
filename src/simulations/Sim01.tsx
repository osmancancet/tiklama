"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import DecisionModal from "@/components/DecisionModal";
import SimulationResult from "@/components/SimulationResult";

export default function Sim01() {
    const [phase, setPhase] = useState<"intro" | "call" | "decision" | "result">("intro");
    const [correct, setCorrect] = useState(false);

    const startCall = () => setPhase("call");

    return (
        <div>
            {phase === "intro" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <div className="phone-frame mx-auto">
                        <div className="phone-screen flex flex-col items-center justify-center p-6">
                            <span className="text-6xl mb-4">📞</span>
                            <p className="text-warning-yellow font-mono text-sm mb-2">Gelen Arama</p>
                            <p className="text-2xl font-bold text-text-primary mb-1">155</p>
                            <p className="text-xs text-text-muted mb-6">Polis İmdat Hattı</p>
                            <motion.button
                                className="btn-danger w-full"
                                whileTap={{ scale: 0.95 }}
                                onClick={startCall}
                            >
                                📞 Aramayı Yanıtla
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}

            {phase === "call" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="phone-frame mx-auto">
                        <div className="phone-screen p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-2 h-2 rounded-full bg-success-green animate-pulse inline-block"></span>
                                <span className="text-xs text-success-green font-mono">ARAMA DEVAM EDİYOR — 00:47</span>
                            </div>
                            <div className="bg-bg-card rounded-lg p-4 mb-4">
                                <p className="text-sm text-text-secondary italic leading-relaxed">
                                    🔊 <em>&ldquo;Alo, ben Komiser Yardımcısı Mehmet Yılmaz. Hesabınız bir dolandırıcılık
                                        şebekesi tarafından kullanılıyor. Paranızı güvenli hesaba aktarmazsanız
                                        tüm birikimleriniz tehlikede. Kimseye söylemeyin, bu gizli operasyon!&rdquo;</em>
                                </p>
                            </div>
                            <p className="text-xs text-text-muted text-center mb-4">
                                ⚡ Arka planda telsiz sesleri duyuluyor...
                            </p>
                            <DecisionModal
                                question="Ne yaparsınız?"
                                safeOption="Kapat ve 112'yi Ara"
                                dangerOption="Parayı Poşete Koy"
                                onSafe={() => { setCorrect(true); setPhase("result"); }}
                                onDanger={() => { setCorrect(false); setPhase("result"); }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {(phase === "result") && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Doğru Karar!" : "Tuzağa Düştünüz!"}
                    message={correct
                        ? "Telefonu kapatıp resmi numaradan arayarak kendinizi korudunuz."
                        : "Sahte komiserin baskısına yenildiniz. Gerçek polis asla telefonda para istemez!"}
                    lesson="Devlet kurumları asla telefonda altın, para veya kart bilgisi talep etmez. Şüphelendiğinizde telefonu kapatıp resmi numaradan kendiniz arayın."
                    onReset={() => setPhase("intro")}
                />
            )}
        </div>
    );
}
