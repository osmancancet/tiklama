"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim16() {
    const [phase, setPhase] = useState<"sms" | "site" | "sms-verify" | "result">("sms");
    const [correct, setCorrect] = useState(true); // Default correct, fails if they click code

    return (
        <div>
            {/* 1. Fake SMS */}
            {phase === "sms" && (
                <div className="max-w-sm mx-auto bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                    <div className="flex gap-3 mb-4">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-black">P</div>
                        <div>
                            <p className="font-bold text-white">PTT Kargo</p>
                            <p className="text-xs text-zinc-500">Şimdi</p>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-300 mb-2">
                        Koliniz adresinize teslim edilememistir. Tekrar dagitima cikmasi icin 24 TL gumruk/hizmet bedelini odeyiniz: <span className="text-blue-400 underline cursor-pointer" onClick={() => setPhase("site")}>https://ptt-takip-gumruk.com</span>
                    </p>
                </div>
            )}

            {/* 2. Fake Payment Site */}
            {phase === "site" && (
                <div className="max-w-sm mx-auto bg-white text-black rounded-lg overflow-hidden border">
                    <div className="bg-yellow-400 p-4 flex justify-between items-center">
                        <span className="font-bold text-lg">PTT Kargo Takip</span>
                        <span>📦</span>
                    </div>
                    <div className="p-6">
                        <p className="mb-4 text-sm font-semibold">Ödeme Tutarı: 24,00 TL</p>
                        <input type="text" placeholder="Kart Sahibi" className="border w-full p-2 mb-2 rounded" defaultValue="Mustafa Yılmaz" />
                        <input type="text" placeholder="Kart No" className="border w-full p-2 mb-2 rounded" defaultValue="4543 **** **** 9800" />
                        <div className="flex gap-2 mb-4">
                            <input type="text" placeholder="AA/YY" className="border w-1/2 p-2 rounded" defaultValue="12/28" />
                            <input type="text" placeholder="CVV" className="border w-1/2 p-2 rounded" defaultValue="***" />
                        </div>
                        <button
                            onClick={() => setPhase("sms-verify")}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded"
                        >
                            Öde ve Dağıtıma Çıkar
                        </button>
                    </div>
                </div>
            )}

            {/* 3. SMS OTP Trap */}
            {phase === "sms-verify" && (
                <div className="max-w-sm mx-auto text-center">
                    <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mb-6">
                        <p className="text-white text-lg font-bold mb-4">🔒 3D Secure Doğrulama</p>
                        <p className="text-zinc-400 text-sm mb-4">Telefonunuza gelen şifreyi giriniz.</p>

                        {/* The TRAP SMS Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-zinc-900 border border-zinc-600 p-3 rounded text-left mb-6"
                        >
                            <p className="text-xs text-zinc-500 mb-1">Mesaj İçeriği:</p>
                            <p className="text-sm text-white">
                                Banka Kartınızla <span className="font-bold text-red-500">24.500 TL</span> harcama yapmak için onay kodunuz: 192384. Kimseyle paylaşmayın.
                            </p>
                        </motion.div>

                        <input type="text" className="bg-black border border-zinc-600 text-white p-3 text-center text-2xl tracking-widest w-full rounded mb-4" placeholder="------" />

                        <button
                            onClick={() => { setCorrect(false); setPhase("result"); }}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold"
                        >
                            Onayla
                        </button>
                        <button
                            onClick={() => { setCorrect(true); setPhase("result"); }}
                            className="w-full mt-3 text-sm text-red-400 underline"
                        >
                            İptal Et (Tutar Yanlış!)
                        </button>
                    </div>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Dikkat Testini Geçtiniz!" : "24.500 TL Dolandırıldınız!"}
                    message={correct
                        ? "SMS içeriğindeki tutarı (24.500 TL) fark edip işlemi onaylamadınız. Harikasınız!"
                        : "Ekranda 24 TL yazıyordu ama gelen SMS kodunda 24.500 TL yazıyordu. Okumadan kodu girdiğiniz için hesabınız boşaltıldı."}
                    lesson="3D Secure mesajlarındaki tutarı ve işyeri adını MUTLAKA okuyun. Ekranda yazan tutar ile SMS'teki tutar farklıysa işlemi derhal iptal edin."
                    onReset={() => setPhase("sms")}
                />
            )}
        </div>
    );
}
