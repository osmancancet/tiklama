"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim06() {
    const [phase, setPhase] = useState<"sms" | "fake-site" | "result">("sms");
    const [step, setStep] = useState(0);

    return (
        <div>
            {phase === "sms" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-sm mx-auto bg-zinc-900 rounded-2xl border border-zinc-800 p-4">
                    {/* Fake SMS UI */}
                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">B</div>
                        <div>
                            <p className="text-white font-bold">BANKA</p>
                            <p className="text-zinc-500 text-xs">Şimdi</p>
                        </div>
                    </div>

                    <div className="bg-zinc-800 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-sm leading-relaxed mb-4">
                        <p className="text-white">Degerli Musterimiz, hesabinizdan supheli 4500 TL islem yapilmistir. Iptal etmek icin: <span className="text-blue-400 underline cursor-pointer" onClick={() => setPhase("fake-site")}>https://banka-iade.com/giris</span></p>
                    </div>

                    <p className="text-center text-xs text-zinc-500 animate-pulse">Linke tıklayarak devam edin 👆</p>
                </motion.div>
            )}

            {phase === "fake-site" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="bg-white rounded-lg overflow-hidden max-w-sm mx-auto">
                        {/* Fake Browser Bar */}
                        <div className="bg-zinc-100 border-b p-2 flex items-center gap-2">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex-1 bg-white border rounded px-2 py-1 text-xs text-zinc-600 text-center flex items-center justify-center gap-1">
                                <span className="text-red-500">🔓</span>
                                <span>banka-iade.com/giris</span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-600 rounded mb-4"></div>
                            <h3 className="text-zinc-800 font-bold text-lg mb-6">İnternet Şubesi</h3>

                            <input type="text" placeholder="Müşteri No / TCKN" className="w-full bg-zinc-50 border p-2 rounded mb-3 text-sm text-black" />
                            <input type="password" placeholder="Şifre" className="w-full bg-zinc-50 border p-2 rounded mb-6 text-sm text-black" />

                            <button
                                onClick={() => setPhase("result")}
                                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
                            >
                                Giriş Yap
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-xs text-zinc-500 mt-4">Adres çubuğuna dikkat ettiniz mi?</p>
                </motion.div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={false} // User clicked the link and tried to login
                    title="Hesabınız Ele Geçirildi!"
                    message="Girdiğiniz site 'banka.com' değil, 'banka-iade.com' idi. Şifreniz saldırganlara gitti."
                    lesson="Adres çubuğunu harf harf okuyun! Bankalar SMS ile doğrudan giriş linki göndermez. İşlemleri kendi uygulamasından yapın."
                    onReset={() => setPhase("sms")}
                />
            )}
        </div>
    );
}
