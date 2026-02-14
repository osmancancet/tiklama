"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim19() {
    const [phase, setPhase] = useState<"listing" | "chat" | "result">("listing");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-white min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col font-sans relative max-w-2xl mx-auto text-gray-800">

            <AnimatePresence mode="wait">
                {/* LISTING PHASE */}
                {phase === "listing" && (
                    <motion.div
                        key="listing"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Fake Header */}
                        <div className="bg-pink-600 text-white p-3 flex justify-between items-center">
                            <span className="font-bold text-lg">TatilSepetim (Fake)</span>
                            <span className="text-xs">Giriş Yap</span>
                        </div>

                        {/* Image Carousel */}
                        <div className="h-48 bg-gray-200 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512918760532-3ed64bc80e89?auto=format&fit=crop&q=80")' }}></div>
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">1/12</div>
                        </div>

                        <div className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Ultra Lüks Villa - Kalkan</h2>
                                    <p className="text-sm text-gray-500">Kaş, Antalya • Denize Sıfır</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-2xl font-bold text-pink-600">₺2.500</span>
                                    <span className="text-xs text-gray-400">/gece</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                Özel havuzlu, jakuzili, 5 yatak odalı muhteşem villa. Erken rezervasyonda %50 indirim fırsatı! TÜRSAB No: 9999 (Sahte)
                            </p>

                            <div className="border-t pt-4">
                                <button
                                    onClick={() => setPhase("chat")}
                                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded font-bold shadow-lg flex justify-center items-center gap-2"
                                >
                                    <span>💬</span> İlan Sahibiyle Görüş (WhatsApp)
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* WHATSAPP CHAT PHASE */}
                {phase === "chat" && (
                    <motion.div
                        key="chat"
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                        className="absolute inset-0 bg-[#efe7dd] z-20 flex flex-col"
                    >
                        <div className="bg-[#075e54] text-white p-3 flex items-center gap-3">
                            <button onClick={() => setPhase("listing")}>←</button>
                            <div className="flex-1 font-bold">Villa Sahibi (Mert)</div>
                        </div>

                        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                            <div className="self-end ml-auto bg-[#dcf8c6] p-2 rounded-lg max-w-[80%] text-sm shadow text-gray-800">
                                Merhaba, 15-20 Temmuz arası müsait mi?
                            </div>
                            <div className="self-start mr-auto bg-white p-2 rounded-lg max-w-[80%] text-sm shadow text-gray-800">
                                Evet müsait efendim. Çok yoğunluk var, başkası tutmadan kaporayı atarsanız rezerve ederim.
                            </div>
                            <div className="self-start mr-auto bg-white p-2 rounded-lg max-w-[80%] text-sm shadow text-gray-800">
                                5.000 TL kapora yeterli. Aşağıdaki IBAN şahsi hesabımdır (eşim adına), şirket hesabımızda bloke var şu an.
                            </div>
                            <div className="self-start mr-auto bg-white p-2 rounded-lg text-sm shadow font-mono bg-blue-50 text-blue-900 border border-blue-100">
                                IBAN: TR12 0000 ...<br />
                                Alıcı: Ayşe Yılmaz
                            </div>
                        </div>

                        <div className="p-4 bg-[#f0f0f0] flex gap-2">
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded font-bold"
                            >
                                Kaporayı Gönder
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded font-bold"
                            >
                                İnanma ve Engelle
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* RESULT */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 z-30 p-4 md:p-12 overflow-y-auto font-sans">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Tatilinizi Kurtardınız!" : "Kapora Dolandırıcılığı!"}
                            message={correct
                                ? "Harika! Şirket hesabı yerine şahıs hesabına para istenmesi ve TÜRSAB numarasının doğrulanamaması sizi şüphelendirdi. Dolandırıcıyı engellediniz."
                                : "Kaporayı gönderdiniz ama adrese gittiğinizde öyle bir villa olmadığını (veya başkasına ait olduğunu) gördünüz. Telefon numarası da çoktan kapandı."}
                            lesson="Tatil kiralarken TÜRSAB belgesini resmi web sitesinden doğrulayın. Para transferini sadece şirket hesabına yapın, şahıs IBAN'larına güvenmeyin."
                            onReset={() => setPhase("listing")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
