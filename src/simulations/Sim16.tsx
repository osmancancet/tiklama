"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim16() {
    const [phase, setPhase] = useState<"sms" | "tracking" | "payment" | "result">("sms");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-gray-100 min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-400 flex flex-col font-sans relative max-w-sm mx-auto">

            <AnimatePresence mode="wait">
                {/* SMS Phase */}
                {phase === "sms" && (
                    <motion.div
                        key="sms"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 bg-white p-4"
                    >
                        <div className="bg-gray-100 rounded-xl p-4 mb-4 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 bg-gray-200 text-[10px] px-2 rounded-full text-gray-500">Bugün 09:42</div>
                            <div className="font-bold text-gray-800 mb-1">MNG KARGO</div>
                            <p className="text-gray-700 text-sm">
                                Sayın Müşterimiz, kargonuz adresinize teslim edilememiştir. Lütfen 24 TL gümrük ücretini ödemek ve teslimat tarihini güncellemek için tıklayınız: <span onClick={() => setPhase("tracking")} className="text-blue-500 underline cursor-pointer">mng-kargo-odeme-takip.net</span>
                            </p>
                        </div>
                        <div className="text-center text-xs text-gray-400">
                            *Linke tıklayarak senaryoyu devam ettirin.
                        </div>
                    </motion.div>
                )}

                {/* Fake Tracking Page */}
                {phase === "tracking" && (
                    <motion.div
                        key="tracking"
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                        className="absolute inset-0 bg-white z-10 flex flex-col"
                    >
                        <div className="bg-blue-900 p-4 text-white flex justify-between items-center shadow-md">
                            <div className="font-bold text-lg italic">MNG KARGO</div>
                            <div className="text-xs">menü ☰</div>
                        </div>

                        <div className="p-6 flex-1">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Kargo Takip</h2>
                            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mb-6 text-sm text-yellow-800">
                                ⚠️ Teslimat başarısız. Gümrük vergisi eksik.
                            </div>

                            <div className="space-y-4">
                                <div className="border rounded p-3">
                                    <div className="text-xs text-gray-500">Takip No</div>
                                    <div className="font-mono font-bold">TR-882931102</div>
                                </div>
                                <div className="border rounded p-3 bg-red-50 border-red-100">
                                    <div className="text-xs text-red-500">Kalan Borç</div>
                                    <div className="font-bold text-red-700">24.00 TL</div>
                                </div>

                                <button
                                    onClick={() => setPhase("payment")}
                                    className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 shadow-lg"
                                >
                                    Ödeme Yap (24 TL)
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Payment / SMS OTP Phase */}
                {phase === "payment" && (
                    <motion.div
                        key="payment"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/50 z-20 flex items-end sm:items-center justify-center p-4"
                    >
                        <div className="bg-white w-full rounded-t-xl sm:rounded-xl p-6 shadow-2xl animate-slide-up">
                            <h3 className="font-bold text-lg mb-4 text-center border-b pb-2">3D Secure Doğrulama</h3>
                            <p className="text-sm text-gray-600 mb-4 text-center">
                                Bankanızdan gelen SMS şifresini giriniz.
                            </p>

                            {/* The Trick: Amount is different */}
                            <div className="bg-gray-100 p-3 rounded mb-4 font-mono text-xs text-gray-700 border border-gray-300">
                                SMS: Sayın Müşterimiz, .... nolu kartınızla <span className="font-bold bg-yellow-200">24,500.00 TL</span> tutarındaki işleminiz için şifreniz: 192381. Kimseyle paylaşmayınız.
                            </div>

                            <input type="text" placeholder="Şifreyi Giriniz" className="w-full border p-2 rounded mb-4 text-center tracking-widest" />

                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setCorrect(false); setPhase("result"); }}
                                    className="flex-1 bg-green-600 text-white py-2 rounded font-bold text-sm"
                                >
                                    Onayla
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="flex-1 bg-red-500 text-white py-2 rounded font-bold text-sm"
                                >
                                    İptal (Tutarı Fark Ettim!)
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Result */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-white z-30 p-4 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Dikkatli Gözler Kazandı!" : "24.500 TL Dolandırıldınız!"}
                            message={correct
                                ? "Mükemmel dikkat! Ekranda '24 TL' yazsa da, bankadan gelen SMS'te '24.500 TL' çekilmek istendiğini fark edip işlemi iptal ettiniz."
                                : "Tuzağa düştünüz. Sahte kargo sitesi sadece 24 TL ister gibi göründü ama arka planda kartınızdan 24.500 TL çekmeye çalıştı. SMS'i okumadan onayladınız."}
                            lesson="3D Secure SMS'lerini sadece şifre için değil, 'Tutar' ve 'İşyeri Adı'nı kontrol etmek için okuyun. Kargo firmaları SMS ile borç tahsil etmez."
                            onReset={() => setPhase("sms")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
