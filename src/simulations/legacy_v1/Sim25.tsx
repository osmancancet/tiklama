"use client";
import { useState } from "react";
import SimulationResult from "@/components/SimulationResult";

export default function Sim25() {
    const [phase, setPhase] = useState<"offer" | "police" | "result">("offer");
    const [correct, setCorrect] = useState(false);

    return (
        <div>
            {/* 1. The Offer */}
            {phase === "offer" && (
                <div className="max-w-sm mx-auto bg-white text-black p-6 rounded-xl border shadow-lg text-center">
                    <h3 className="font-bold text-xl mb-4 text-green-600">💸 Kolay Para Fırsatı!</h3>
                    <p className="text-zinc-600 mb-6 text-sm">
                        "Merhaba, hesabına gelecek paraları başka bir hesaba aktararak işlem başına <span className="font-bold text-black">%5 komisyon</span> kazanmak ister misin? Günde 10-15 bin TL işlem yapılıyor, oturduğun yerden 500-750 TL kazanırsın."
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setPhase("police")}
                            className="flex-1 bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700"
                        >
                            Kabul Et (IBAN Ver)
                        </button>
                        <button
                            onClick={() => { setCorrect(true); setPhase("result"); }}
                            className="flex-1 bg-zinc-200 text-black py-3 rounded font-bold hover:bg-zinc-300"
                        >
                            Reddet
                        </button>
                    </div>
                </div>
            )}

            {/* 2. Police Notification */}
            {phase === "police" && (
                <div className="max-w-sm mx-auto mt-8">
                    <div className="bg-zinc-100 p-4 rounded-t-xl border-b flex justify-between items-center">
                        <span className="font-bold text-sm">Banka Bildirimleri</span>
                        <span className="text-xs text-zinc-500">Şimdi</span>
                    </div>

                    <div className="bg-white p-4 space-y-3 border-x">
                        <div className="flex gap-3">
                            <div className="text-green-500 text-xl font-bold">+</div>
                            <div>
                                <p className="text-sm font-bold">Gelen Transfer: 15.000 TL</p>
                                <p className="text-xs text-zinc-500">Gönderen: A. Veli (Dolandırılan Kişi)</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-red-500 text-xl font-bold">-</div>
                            <div>
                                <p className="text-sm font-bold">Giden Transfer: 14.250 TL</p>
                                <p className="text-xs text-zinc-500">Alıcı: X. Şahıs (Çete)</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 p-6 rounded-b-xl border border-red-200 text-center animate-pulse">
                        <div className="text-4xl mb-2">👮</div>
                        <h3 className="text-red-800 font-bold mb-2">HESAP BLOKE EDİLDİ</h3>
                        <p className="text-red-600 text-xs">
                            Siber Suçlar tarafından hakkınızda "Suç Gelirlerinin Aklanması" suçlamasıyla soruşturma başlatıldı. İfadeye çağrılacaksınız.
                        </p>
                        <button onClick={() => { setCorrect(false); setPhase("result"); }} className="mt-4 text-xs underline text-red-800">Devam Et</button>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Suça Ortak Olmadınız!" : "Artık Bir Suçlusunuz!"}
                    message={correct
                        ? "Hesabınızı kiralatmayarak kendinizi büyük bir yasal yükten kurtardınız. Bu paralar genellikle uyuşturucu veya dolandırıcılık geliridir."
                        : "Birkaç yüz lira kazanayım derken kara para aklama suçuna ortak oldunuz. Hesabınız kapatıldı ve sicilinize işlendi."}
                    lesson="Banka hesabınızı, IBAN'ınızı veya Papara/Payfix hesabınızı başkasına kullandırmak SUÇTUR. 'Komisyon karşılığı transfer' teklifleri %100 yasa dışıdır."
                    onReset={() => setPhase("offer")}
                />
            )}
        </div>
    );
}
