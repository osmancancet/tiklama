"use client";
import { useState } from "react";
import SimulationsResult from "@/components/SimulationResult";

export default function Sim19() {
    const [phase, setPhase] = useState<"villa" | "result">("villa");
    const [correct, setCorrect] = useState(false);

    return (
        <div>
            {phase === "villa" && (
                <div className="max-w-3xl mx-auto bg-white text-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                    <div className="relative h-64 bg-zinc-200">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                            <div>
                                <h2 className="text-3xl font-bold text-white">Villa Paradise Kalkan</h2>
                                <p className="text-white/90">Denize Sıfır, Sonsuzluk Havuzu, 5 Yatak Odası</p>
                            </div>
                        </div>
                        {/* Fake Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 pointer-events-none">🏰</div>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-2">
                            <h3 className="font-bold text-xl mb-4 text-blue-900">Mükemmel Bayram Tatili</h3>
                            <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
                                Erken rezervasyon fırsatıyla haftalık sadece 35.000 TL! (Normalde 75.000 TL).
                                Bu fırsatı kaçırmamak için hemen kaporayı gönderin.
                            </p>
                            <div className="bg-green-50 p-4 border border-green-200 rounded text-center mb-4">
                                <p className="text-green-800 font-bold mb-1">✅ TÜRSAB Doğrulanmış Acente</p>
                                <p className="text-xs text-zinc-500">Belge No: 12345 (Sahte Belge)</p>
                            </div>
                            <div className="flex items-center gap-2 text-red-600 font-bold text-sm animate-pulse">
                                <span>🔥</span>
                                <span>Şu an 14 kişi bu villayı inceliyor!</span>
                            </div>
                        </div>

                        <div className="bg-zinc-50 p-4 rounded border">
                            <p className="text-center font-bold mb-4">Rezervasyon</p>
                            <p className="text-xs text-center text-zinc-500 mb-4">Kapora Tutarı: 10.000 TL</p>
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded mb-2 transition-transform hover:scale-105"
                            >
                                Hemen Öde & Kirala
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="w-full bg-transparent border border-zinc-300 text-zinc-600 py-3 rounded hover:bg-zinc-100 font-bold text-sm"
                            >
                                TÜRSAB Sitesinden Kontrol Et
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationsResult
                    isCorrect={correct}
                    title={correct ? "Tatilinizi Kurtardınız!" : "Kapıda Kaldınız!"}
                    message={correct
                        ? "TÜRSAB sitesinden belge numarasını sorguladınız ve böyle bir acentenin olmadığını gördünüz. Paranızı kaptırmadınız."
                        : "Kaporayı gönderip Kalkan'a gittiniz. Adreste villa yoktu, boş bir arazi vardı. Telefonlara kimse bakmıyor."}
                    lesson="Tatil dolandırıcılığından korunmak için acente belgesini (TÜRSAB) resmi sitesinden sorgulayın. Para gönderdiğiniz hesap şahıs hesabı değil, şirket hesabı olmalıdır."
                    onReset={() => setPhase("villa")}
                />
            )}
        </div>
    );
}
