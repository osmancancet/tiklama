"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import TerminalText from "@/components/TerminalText";
import SimulationResult from "@/components/SimulationResult";

export default function Sim03() {
    const [phase, setPhase] = useState<"usb" | "terminal" | "result">("usb");

    const terminalLines = [
        "USB DEVICE CONNECTED: HID Keyboard Emulator",
        "Executing payload: /tmp/.hidden/exfil.sh",
        "Scanning /Users/yunus/Documents/ ...",
        "Found: kurumsal_sirlar.xlsx, maas_bordrosu.pdf",
        "Uploading to remote: 194.55.xx.xx:443 ...",
        "████████████████████ 100% Complete",
        "[ALERT] VERİLERİNİZ DIŞARI SIZDIRILDI!",
    ];

    return (
        <div>
            {phase === "usb" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <div className="bg-bg-card rounded-xl p-8 border border-border-color max-w-md mx-auto">
                        <span className="text-6xl block mb-4">💾</span>
                        <p className="text-lg font-bold text-text-primary mb-2">Otoparkta USB Bellek Bulundu!</p>
                        <p className="text-sm text-text-muted mb-2">Etiket: &ldquo;Maaş Zamları 2024.xlsx&rdquo;</p>
                        <p className="text-xs text-warning-yellow mb-6">Bu USB&apos;yi bilgisayarınıza takıp dosyayı açar mısınız?</p>
                        <div className="flex gap-3">
                            <button className="btn-danger flex-1" onClick={() => setPhase("terminal")}>
                                📂 Dosyayı Aç
                            </button>
                            <button className="btn-safe flex-1" onClick={() => setPhase("result")}>
                                🗑️ USB&apos;yi Atma / IT&apos;ye Ver
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {phase === "terminal" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <TerminalText
                        lines={terminalLines}
                        speed={40}
                        onComplete={() => setTimeout(() => setPhase("result"), 1500)}
                    />
                    <motion.p
                        className="text-center text-danger-red font-mono text-sm mt-4 red-glow"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        ⚠️ VERİLERİNİZ DIŞARI SIZDIRILDI ⚠️
                    </motion.p>
                </motion.div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={phase === "result" && !document.querySelector(".red-glow")}
                    title={phase === "result" ? "Tuzağa Düştünüz!" : "Doğru Karar!"}
                    message="USB cihazı bir HID Keyboard Emulator olarak çalıştı ve saniyeler içinde verilerinizi sızdırdı."
                    lesson="Buluntu USB ve cihazlar 'Klavye' gibi davranıp sisteminize zararlı komutlar gönderebilir. Asla bilinmeyen cihazları takmayın!"
                    onReset={() => setPhase("usb")}
                />
            )}
        </div>
    );
}
