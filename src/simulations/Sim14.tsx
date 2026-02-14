"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim14() {
    const [phase, setPhase] = useState<"email" | "result">("email");
    const [correct, setCorrect] = useState(false);

    return (
        <div>
            {phase === "email" && (
                <div className="bg-bg-primary border border-border-color rounded-xl overflow-hidden max-w-2xl mx-auto">
                    {/* Email Header */}
                    <div className="bg-bg-card p-4 border-b border-border-color">
                        <h3 className="text-xl font-bold text-text-primary">RE: Köşk Satış Sözleşmesi ve Ödeme</h3>
                        <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center font-bold">A</div>
                                <div>
                                    <p className="text-sm font-semibold">Avukat Ahmet Yılmaz <span className="text-text-muted text-xs">&lt;ahmet.yilmaz@avukat-hukuk.com&gt;</span></p>
                                    <p className="text-xs text-text-muted">Alıcı: Burak Bey</p>
                                </div>
                            </div>
                            <span className="text-xs text-text-muted">Bugün, 09:15</span>
                        </div>
                    </div>

                    {/* Email Body */}
                    <div className="p-6 text-sm leading-relaxed text-text-secondary">
                        <p className="mb-4">Sayın Burak Bey,</p>
                        <p className="mb-4">Tapu işlemleri öncesinde 5.000.000 TL kapora ödemesinin bugün yapılması gerekmektedir. İşlemleri hızlandırmak adına lütfen ödemeyi aşağıdaki yeni hesabımıza yapınız. Eski hesabımızda teknik bir blokaj mevcuttur.</p>

                        <div className="bg-yellow-900/10 border border-yellow-700/30 p-4 rounded mb-6">
                            <p className="font-bold text-yellow-500 mb-2">📌 YENİ HESAP BİLGİLERİ:</p>
                            <p className="font-mono text-text-primary">Alıcı: Yılmaz Danışmanlık A.Ş.</p>
                            <p className="font-mono text-text-primary">IBAN: TR12 0006 1000 2345 6789 0101 99</p>
                        </div>

                        <p className="mb-8">Dekontu paylaşırsanız hemen tapu randevusunu oluşturacağım.</p>
                        <p>Saygılarımla,<br />Av. Ahmet Yılmaz</p>
                    </div>

                    {/* Actions */}
                    <div className="bg-bg-card p-4 border-t border-border-color flex gap-4">
                        <button
                            onClick={() => { setCorrect(false); setPhase("result"); }}
                            className="flex-1 bg-neon-blue/10 border border-neon-blue text-neon-blue py-3 rounded hover:bg-neon-blue/20"
                        >
                            💸 Hesaba Gönder
                        </button>
                        <button
                            onClick={() => { setCorrect(true); setPhase("result"); }}
                            className="flex-1 bg-zinc-800 border border-zinc-600 text-white py-3 rounded hover:bg-zinc-700"
                        >
                            📞 Avukatı Ara & Teyit Et
                        </button>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Dolandırıcılık Önlendi!" : "5 Milyon TL Buhar Oldu!"}
                    message={correct
                        ? "Müthiş! Son anda gelen hesap değişiklikleri %99 dolandırıcılıktır. Arayıp teyit ederek e-postanın hacklendiğini öğrendiniz."
                        : "E-postaya güvendiniz ancak avukatınızın maili hacklenmişti. Parayı dolandırıcıların 'Yılmaz Danışmanlık' adıyla açtığı paravan şirkete gönderdiniz."}
                    lesson="Büyük finansal işlemlerde, e-posta ile gelen 'Hesap Değişti' uyarılarına asla güvenmeyin. Mutlaka telefonda sesli teyit alın."
                    onReset={() => setPhase("email")}
                />
            )}
        </div>
    );
}
