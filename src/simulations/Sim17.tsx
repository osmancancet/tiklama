"use client";
import { useState } from "react";
import SimulationResult from "@/components/SimulationResult";

export default function Sim17() {
    const [phase, setPhase] = useState<"site" | "result">("site");

    return (
        <div>
            {phase === "site" && (
                <div className="max-w-2xl mx-auto bg-white text-black rounded-sm overflow-hidden border shadow-lg font-serif">
                    {/* Header */}
                    <div className="bg-[#003366] text-white p-6 text-center">
                        <h2 className="text-3xl font-bold mb-2">International Science & Tech Summit</h2>
                        <p className="text-sm tracking-widest uppercase">Barcelona, Spain | July 15-18, 2024</p>
                    </div>

                    {/* Speakers */}
                    <div className="p-8">
                        <h3 className="text-center font-bold text-xl mb-6 border-b pb-2">Keynote Speakers</h3>
                        <div className="flex justify-center gap-6 text-center">
                            <div>
                                <div className="w-24 h-24 bg-zinc-200 rounded-full mx-auto mb-2 grayscale overflow-hidden">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg" className="w-full h-full object-cover" alt="Fake" />
                                </div>
                                <p className="font-bold text-sm">Prof. A. Einstein</p>
                                <p className="text-xs text-zinc-500">Physics Laureate</p>
                            </div>
                            <div>
                                <div className="w-24 h-24 bg-zinc-200 rounded-full mx-auto mb-2 grayscale overflow-hidden">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Marie_Curie_c1920.jpg" className="w-full h-full object-cover" alt="Fake" />
                                </div>
                                <p className="font-bold text-sm">Dr. M. Curie</p>
                                <p className="text-xs text-zinc-500">Chemistry Laureate</p>
                            </div>
                        </div>

                        <div className="mt-10 bg-zinc-100 p-6 rounded text-center">
                            <p className="text-red-600 font-bold mb-2">Early Bird Registration Ends Today!</p>
                            <p className="mb-4 text-sm">Registration + 5 Star Accommodation: <span className="line-through text-zinc-400">€1500</span> <span className="font-bold text-xl">€450</span></p>
                            <button
                                onClick={() => setPhase("result")}
                                className="bg-[#003366] text-white px-8 py-3 rounded uppercase font-bold text-sm hover:bg-blue-900 transition-colors"
                            >
                                Register & Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={false}
                    title="Akademik Serap!"
                    message="Site kapandı ve parayı geri alamıyorsunuz. Bu 'predatory' (yağmacı) veya tamamen sahte bir konferanstı. Konuşmacılar bile gerçek dışıydı."
                    lesson="Bilinmeyen konferansları şüpheyle yaklaşın. Konuşmacıları teyit edin, organizatör kurumun geçmişine bakın. Aşırı ucuz kayıt ücretleri bir işarettir."
                    onReset={() => setPhase("site")}
                />
            )}
        </div>
    );
}
