"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim13() {
    const [phase, setPhase] = useState<"chat" | "payment" | "result">("chat");
    const [correct, setCorrect] = useState(false);

    return (
        <div>
            {phase === "chat" && (
                <div className="max-w-sm mx-auto bg-[#0b141a] rounded-xl overflow-hidden border border-zinc-800">
                    {/* WhatsApp Header */}
                    <div className="bg-[#202c33] p-3 flex items-center gap-3 border-b border-zinc-700">
                        <div className="w-8 h-8 rounded-full bg-zinc-500"></div>
                        <div>
                            <p className="text-white text-sm font-bold">Bebek Arabası Alıcı</p>
                            <p className="text-zinc-400 text-xs">Çevrimiçi</p>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="bg-[url('https://camo.githubusercontent.com/854ecb3d4f55b98cb3d2a7bc7723940172e297800c43666b610c36e448b11eb1/68747470733a2f2f757365722d696d616765732e67697468756275736572636f6e74656e742e636f6d2f31353037353735392f32383731393134342d38366463306637302d373362312d343566302d383563642d3938643039646535386434332e706e67')] p-4 space-y-4 h-80 overflow-y-auto">

                        <div className="bg-[#202c33] p-2 rounded-lg rounded-tl-none self-start max-w-[80%]">
                            <p className="text-white text-sm">Merhaba, bebek arabası hala satılık mı?</p>
                            <span className="text-[10px] text-zinc-400 block text-right">14:30</span>
                        </div>

                        <div className="bg-[#005c4b] p-2 rounded-lg rounded-tr-none self-end ml-auto max-w-[80%]">
                            <p className="text-white text-sm">Evet duruyor, fiyatı 2000 TL.</p>
                            <span className="text-[10px] text-green-200 block text-right">14:31</span>
                        </div>

                        <div className="bg-[#202c33] p-2 rounded-lg rounded-tl-none self-start max-w-[80%]">
                            <p className="text-white text-sm">Tamam alıyorum. "Güvenli Ödeme" ile parayı gönderdim. Aşağıdaki linkten parayı hesabına aktarabilirsin 👇</p>
                            <div className="mt-2 bg-[#1f2c34] p-2 rounded border border-zinc-700 cursor-pointer hover:opacity-80" onClick={() => setPhase("payment")}>
                                <div className="text-blue-400 text-xs mb-1">guvenli-sahibinden-param.com/odeme-al</div>
                                <p className="text-white font-bold text-sm">Ödemeyi Hesabına Aktar</p>
                            </div>
                            <span className="text-[10px] text-zinc-400 block text-right">14:33</span>
                        </div>
                    </div>

                    <div className="p-2 bg-[#202c33]">
                        <p className="text-center text-xs text-zinc-500">Linke tıklayın 👆</p>
                    </div>
                </div>
            )}

            {phase === "payment" && (
                <div className="max-w-sm mx-auto bg-white rounded-xl p-6 text-black">
                    <h3 className="text-center font-bold text-lg mb-4 text-blue-800">Ödemeyi Al</h3>
                    <p className="text-sm text-center mb-6">2000 TL tutarındaki ödemeyi almak için kart bilgilerinizi giriniz.</p>

                    <input type="text" placeholder="Ad Soyad" className="w-full border p-2 rounded mb-3" />
                    <input type="text" placeholder="Kart Numarası" className="w-full border p-2 rounded mb-3" />
                    <div className="flex gap-2 mb-6">
                        <input type="text" placeholder="AA/YY" className="w-1/2 border p-2 rounded" />
                        <input type="text" placeholder="CVV" className="w-1/2 border p-2 rounded" />
                    </div>

                    <button
                        onClick={() => { setCorrect(false); setPhase("result"); }}
                        className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 mb-3"
                    >
                        Parayı Al
                    </button>
                    <button
                        onClick={() => { setCorrect(true); setPhase("result"); }}
                        className="w-full bg-zinc-200 text-black py-3 rounded font-bold hover:bg-zinc-300"
                    >
                        İptal Et / Şüpheli
                    </button>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={correct}
                    title={correct ? "Dikkatlisiniz!" : "Kart Bilgileriniz Çalındı!"}
                    message={correct
                        ? "Para almak için kart bilgisi veya CVV girilmeyeceğini biliyorsunuz."
                        : "Satıcı sizsiniz ama kart bilgilerinizi girdiniz! Dolandırıcı hem ürünü almayacak hem de kartınızı boşaltacak."}
                    lesson="Para almak için IBAN (TR...) yeterlidir! CVV, Kart Numarası veya SMS şifresi asla ve asla istenmez."
                    onReset={() => setPhase("chat")}
                />
            )}
        </div>
    );
}
