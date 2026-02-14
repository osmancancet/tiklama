"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim13() {
    const [phase, setPhase] = useState<"chat" | "payment" | "result">("chat");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-[#efe7dd] min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-400 flex flex-col font-sans relative max-w-sm mx-auto">
            {/* Header */}
            <div className="bg-[#075e54] text-white p-3 flex items-center gap-3 shadow-md z-10">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                    <div className="w-full h-full bg-gray-400 flex items-center justify-center text-lg">👤</div>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-sm">Alıcı (Ahmet)</h3>
                    <p className="text-[10px] opacity-80">çevrimiçi</p>
                </div>
                <div className="text-xl">📹 📞 ⋮</div>
            </div>

            <AnimatePresence mode="wait">
                {phase === "chat" && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto"
                        style={{ backgroundImage: 'linear-gradient(#e5ddd5 2px, transparent 2px), linear-gradient(90deg, #e5ddd5 2px, transparent 2px)', backgroundSize: '100px 100px', backgroundColor: '#efe7dd' }}
                    >
                        {/* Messages */}
                        <div className="self-end bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[80%] text-sm text-gray-800">
                            Bebek arabası hâlâ satılık mı?
                            <span className="text-[10px] text-gray-500 block text-right mt-1">14:30 ✓✓</span>
                        </div>
                        <div className="self-start bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[80%] text-sm text-gray-800">
                            Evet, duruyor. Fiyat son 2500 TL.
                            <span className="text-[10px] text-gray-500 block text-right mt-1">14:32</span>
                        </div>
                        <div className="self-end bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[80%] text-sm text-gray-800">
                            Tamam alıyorum. Ama şehir dışındayım, "Güvenli Ödeme" ile halledelim. Link atıyorum, oraya kart bilgilerini gir, para hesabına yatsın. Kurye gelip alacak.
                            <span className="text-[10px] text-gray-500 block text-right mt-1">14:33 ✓✓</span>
                        </div>

                        {/* Fake Link Block */}
                        <div className="self-end w-full max-w-[80%]">
                            <button
                                onClick={() => setPhase("payment")}
                                className="w-full bg-white rounded-lg shadow-sm overflow-hidden text-left group hover:opacity-90 transition-opacity"
                            >
                                <div className="h-24 bg-gray-200 flex items-center justify-center text-4xl text-gray-400">🛡️</div>
                                <div className="p-2 border-l-4 border-yellow-500">
                                    <h4 className="font-bold text-blue-600 text-sm truncate">guvenli-sahibinden-param-guvende.com/odeme-al</h4>
                                    <p className="text-xs text-gray-500">Ödeme Almak İçin Tıkla</p>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}

                {phase === "payment" && (
                    <motion.div
                        key="payment"
                        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                        className="absolute inset-0 bg-white z-20 flex flex-col"
                    >
                        <div className="p-2 border-b flex items-center bg-gray-50">
                            <span className="text-xs text-gray-500 mr-2">🔒</span>
                            <div className="flex-1 bg-white border rounded px-2 py-1 text-xs text-gray-700 truncate">
                                https://guvenli-sahibinden-param-guvende.com/odeme...
                            </div>
                            <button onClick={() => setPhase("chat")} className="ml-2 text-gray-500 text-lg">✕</button>
                        </div>

                        <div className="p-6 flex-1 flex flex-col items-center">
                            <h2 className="text-xl font-bold text-blue-900 mb-4">Ödeme Alma Ekranı</h2>
                            <p className="text-sm text-gray-600 mb-6 text-center">
                                Hesabınıza 2.500 TL yatırılması için kart bilgilerinizi doğrulayın.
                            </p>

                            <div className="w-full space-y-4">
                                <input type="text" placeholder="Kart Numarası" className="w-full border p-2 rounded" />
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Ay/Yıl" className="w-1/2 border p-2 rounded" />
                                    <input type="text" placeholder="CVV" className="w-1/2 border p-2 rounded" />
                                </div>
                                <div className="bg-yellow-50 p-2 text-[10px] text-yellow-800 rounded">
                                    *Kartınızdan çekim yapılmayacaktır, sadece doğrulama içindir.
                                </div>
                                <button
                                    onClick={() => { setCorrect(false); setPhase("result"); }}
                                    className="w-full bg-green-500 text-white py-3 rounded font-bold hover:bg-green-600"
                                >
                                    Onayla ve Parayı Al
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="w-full mt-2 text-red-500 text-sm font-bold hover:underline"
                                >
                                    Bu İşte Bir Terslik Var! (İptal)
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Result */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/80 z-50 p-4 md:p-12 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Dolandırıcıyı Fark Ettiniz!" : "Kart Bilgilerinizi Çaldırdınız!"}
                            message={correct
                                ? "Mükemmel! Bir ürün satarken 'ödeme almak için' ASLA kart numaranızı veya CVV kodunuzu girmemelisiniz. Sadece IBAN yeterlidir."
                                : "Tuzağa düştünüz. 'Parayı hesabına yatıracağız' yalanıyla kart bilgilerinizi aldılar. Gerçekte kartınızdan para çekeceklerdi."}
                            lesson="Para ALMAK için kart bilgisi (özellikle CVV ve son kullanma tarihi) gerekmez! Sadece IBAN verilir. Size link atıp kart bilgisi isteyenler %100 dolandırıcıdır."
                            onReset={() => setPhase("chat")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
