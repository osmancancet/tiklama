"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim15() {
    const [phase, setPhase] = useState<"call" | "decision" | "result">("call");
    const [correct, setCorrect] = useState(false);

    return (
        <div>
            {phase === "call" && (
                <div className="max-w-xs mx-auto mt-10">
                    <div className="bg-zinc-900 rounded-3xl p-6 border-4 border-zinc-700 shadow-2xl relative">
                        <div className="text-center mt-8 mb-12">
                            <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl animate-pulse">
                                🏦
                            </div>
                            <p className="text-white text-xl font-bold">Müşteri Hizmetleri</p>
                            <p className="text-zinc-500">0850 444 XX XX</p>
                            <p className="text-green-500 text-sm mt-2">00:34</p>
                        </div>

                        <div className="bg-zinc-800 p-4 rounded-xl mb-8 relative">
                            <div className="absolute -top-3 left-4 bg-zinc-700 text-xs px-2 py-1 rounded text-zinc-300">Sesli Mesaj</div>
                            <p className="text-zinc-300 text-sm italic">
                                &quot;Merhabalar efendim, ben Bankanızdan Buse. Kart aidat iadeniz çıkmış, ancak sistemde eksik bilgi var. Kartınızın ön yüzündeki 16 haneyi okuyabilir misiniz?&quot;
                            </p>
                        </div>

                        <div className="flex justify-center pb-8">
                            <button
                                onClick={() => setPhase("decision")}
                                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-3xl hover:bg-red-700 shadow-lg text-white"
                            >
                                📞
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {phase === "decision" && (
                <div className="max-w-md mx-auto text-center pt-8">
                    <h3 className="text-xl font-bold mb-6">Ne Cevap Vereceksin?</h3>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => { setCorrect(false); setPhase("result"); }}
                            className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-zinc-600 text-left"
                        >
                            🗣️ &quot;Tabi kızım, yaz: 4543...&quot;
                        </button>
                        <button
                            onClick={() => { setCorrect(true); setPhase("result"); }}
                            className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-zinc-600 text-left"
                        >
                            🛑 &quot;Telefonda bilgi vermem, şubeye giderim.&quot;
                        </button>
                        <button
                            onClick={() => { setCorrect(true); setPhase("result"); }}
                            className="p-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-zinc-600 text-left"
                        >
                            👵 &quot;Dur bir torunuma sorayım.&quot;
                        </button>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Bilgilerinizi Korumayı Başardınız" : "Hesabınız Boşaltıldı"}
                    message={correct
                        ? "Banka çalışanları asla telefonda kart numarası veya şifre istemez. Doğru olanı yaptınız."
                        : "Kibar ses tonuna kanıp kart bilgilerinizi verdiniz. Dolandırıcılar saniyeler içinde internet alışverişi yaptı."}
                    lesson="Büyüklerinizi uyarın ve eğitin: Banka asla telefonda kart bilgisi, şifre veya SMS kodu istemez. Şüphelendiklerinde telefonu kapatıp sizi aramalarını söyleyin."
                    onReset={() => setPhase("call")}
                />
            )}
        </div>
    );
}
