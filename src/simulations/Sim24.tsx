"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim24() {
    const [phase, setPhase] = useState<"chat" | "blackmail" | "result">("chat");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-[#17212b] min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col font-sans relative max-w-sm sm:max-w-md mx-auto">

            {/* Telegram Header */}
            <div className="bg-[#242f3d] text-white p-3 flex items-center gap-3 shadow-sm z-10">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">OS</div>
                <div>
                    <h3 className="font-bold text-sm">ÖSYM Soruları 2024</h3>
                    <p className="text-xs text-blue-300">bot</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {phase === "chat" && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 p-4 bg-[#0e1621] flex flex-col gap-3 overflow-y-auto"
                    >
                        <div className="self-start bg-[#182533] p-3 rounded-lg rounded-tl-none max-w-[85%] text-white text-sm">
                            Merhaba! Yarınki TYT/AYT sınav soruları elimizde. %100 Orijinal. Kanıt için bulanık sayfaya bak 👇
                        </div>

                        <div className="self-start bg-[#182533] p-2 rounded-lg max-w-[85%]">
                            <div className="w-48 h-64 bg-white relative overflow-hidden blur-sm flex items-center justify-center">
                                {/* Fake Exam Paper Look */}
                                <div className="absolute inset-0 p-4 text-[6px] text-black">
                                    <p className="font-bold text-lg mb-4 text-center">TYT DENEME</p>
                                    <p>Lorem ipsum dolor sit amet...</p>
                                    <p>1. Soru: .................</p>
                                </div>
                                <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center text-white font-bold text-xs text-center p-2">
                                    Sansürlü Görüntü<br />Satın almadan açılmaz
                                </div>
                            </div>
                        </div>

                        <div className="self-start bg-[#182533] p-3 rounded-lg max-w-[85%] text-white text-sm">
                            Tamamı için sadece 500 TL. Hemen gönder, soruları al. IBAN: TR12...
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setPhase("blackmail")}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-bold text-sm"
                            >
                                💸 Gönder (Satın Al)
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold text-sm"
                            >
                                🚫 Engelle ve İhbar Et
                            </button>
                        </div>
                    </motion.div>
                )}

                {phase === "blackmail" && (
                    <motion.div
                        key="blackmail"
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                        className="flex-1 p-4 bg-[#0e1621] flex flex-col gap-3"
                    >
                        <div className="self-end bg-[#2b5278] p-3 rounded-lg rounded-tr-none max-w-[85%] text-white text-sm">
                            Parayı attım, soruları bekliyorum?
                        </div>

                        <div className="self-start bg-[#182533] p-3 rounded-lg rounded-tl-none max-w-[85%] text-white text-sm border-l-4 border-red-500">
                            Haha! Sorular falan yok. Ama kimlik bilgilerin ve suç işlediğine dair (soru çalmaya teşebbüs) kayıtlar elimizde.
                        </div>

                        <div className="self-start bg-[#182533] p-3 rounded-lg max-w-[85%] text-white text-sm">
                            Ya bize 5.000 TL daha ateşlersin ya da seni ÖSYM'ye ve okuluna şikayet ederiz, hayatın kayar! 😉
                        </div>

                        <button
                            onClick={() => { setCorrect(false); setPhase("result"); }}
                            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold mt-auto shadow-lg animate-pulse"
                        >
                            😱 Ne Yapacağım?! (Sonuç)
                        </button>
                    </motion.div>
                )}

                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Geleceğinizi Kurtardınız!" : "Hem Paranız Gitti Hem Şantaj Yediniz!"}
                            message={correct
                                ? "Aferin! ÖSYM sorularının sınavdan önce sızdırılması teknik olarak imkansıza yakındır. Bu dolandırıcılar, umut tacirliği yapar ve tuzağa düşenlere şantaj uygular. İnanmayarak en doğrusunu yaptınız."
                                : "Büyük hata. Sorular sahteydi (muhtemelen eski deneme sınavları). Daha kötüsü, dolandırıcılar 'suça teşebbüs ettiğinizi' bildikleri için size şantaj yapmaya başladı. Bu döngüden çıkmak zordur."}
                            lesson="Sınav soruları asla Telegram/Discord gibi yerlerde satılmaz. Bu vaatlere inananlar dolandırılmaya ve şantaja mahkumdur."
                            onReset={() => setPhase("chat")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
