"use client";
import { useState } from "react";
import SimulationResult from "@/components/SimulationResult";

export default function Sim21() {
    const [phase, setPhase] = useState<"video" | "site" | "result">("video");
    const [correct, setCorrect] = useState(false);

    return (
        <div>
            {/* Fake Deepfake Ad */}
            {phase === "video" && (
                <div className="max-w-2xl mx-auto bg-black border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="aspect-video bg-zinc-900 flex items-center justify-center relative">
                        <span className="text-6xl grayscale opacity-50">🤵🏻</span>
                        <div className="absolute inset-0 flex items-end justify-center pb-8">
                            <p className="bg-black/70 px-4 py-2 text-white text-center rounded">
                                &quot;Merhaba, ben ünlü iş adamı X.<br />Bu yeni devlet destekli projeye yatırım yapan herkes kazanıyor!&quot;
                            </p>
                        </div>
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 font-bold rounded animate-pulse">SPONSORLU</div>
                    </div>
                    <div className="p-4 flex justify-between items-center bg-zinc-800">
                        <p className="text-white text-sm font-bold">Yatırım Fırsatını Kaçırma!</p>
                        <button
                            onClick={() => setPhase("site")}
                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-500"
                        >
                            Hemen Başvur
                        </button>
                    </div>
                </div>
            )}

            {/* Fake Investment Interface */}
            {phase === "site" && (
                <div className="max-w-3xl mx-auto bg-[#0a0f1d] text-white rounded-xl border border-zinc-700 p-8 shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Global Energy Yatırım Platformu</h2>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10">
                            <p className="text-sm text-zinc-400 mb-2">Canlı Kar Oranı</p>
                            <p className="text-4xl font-bold text-green-500 mb-4">%450 <span className="text-sm text-zinc-500">aylık</span></p>
                            <div className="h-32 flex items-end gap-1">
                                {[30, 45, 60, 50, 80, 100, 120, 150].map((h, i) => (
                                    <div key={i} style={{ height: `${h}px` }} className="flex-1 bg-green-500/50 hover:bg-green-500 transition-colors rounded-t"></div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <p className="mb-4 text-sm leading-relaxed text-zinc-300">
                                Yapay zeka botlarımız sizin yerinize petrol ve doğalgaz piyasasında işlem yapar. Risk sıfırdır.
                            </p>
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="w-full bg-green-600 hover:bg-green-500 py-3 rounded font-bold mb-3 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                            >
                                🚀 10.000 TL ile Başla
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="w-full bg-transparent border border-zinc-600 text-zinc-400 py-3 rounded hover:text-white font-bold text-sm"
                            >
                                🔍 SPK Lisansını Sorgula
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Dolandırıcılığı Fark Ettiniz!" : "Tüm Birikiminiz Gitti!"}
                    message={correct
                        ? "SPK listesinde böyle bir kurumun olmadığını teyit ettiniz. Videonun da Deepfake (Yapay Zeka) olduğunu anladınız."
                        : "Yatırdığınız para ekranda artıyor gibi göründü ama çekmek istediğinizde 'vergi' istediler. Aslında para hiç yatırıma gitmemişti."}
                    lesson="Tanınmış kişilerin yatırım tavsiyesi verdiği videoların çoğu Deepfake teknolojisi ile üretilmiş sahtekarlıklardır. SPK lisansı olmayan kurumlara asla para göndermeyin."
                    onReset={() => setPhase("video")}
                />
            )}
        </div>
    );
}
