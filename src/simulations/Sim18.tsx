"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim18() {
    const [phase, setPhase] = useState<"diagram" | "notary" | "result">("diagram");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-slate-900 min-h-[480px] sm:min-h-[520px] rounded-xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col font-sans relative p-4 max-w-sm sm:max-w-md mx-auto">

            <AnimatePresence mode="wait">
                {/* DIAGRAM EXPLANATION */}
                {phase === "diagram" && (
                    <motion.div
                        key="diagram"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center text-center"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Araç Alım Satım Sahnesi</h2>

                        <div className="relative w-full max-w-md h-48 sm:h-64 mb-8">
                            {/* YOU (Buyer) */}
                            <div className="absolute top-0 left-0 bg-blue-600 text-white p-2 rounded-lg text-xs w-24">
                                <span className="text-2xl block">😊</span>
                                SİZ (Alıcı)
                            </div>

                            {/* REAL SELLER */}
                            <div className="absolute top-0 right-0 bg-green-600 text-white p-2 rounded-lg text-xs w-24">
                                <span className="text-2xl block">👴</span>
                                SATICI (Gerçek)
                            </div>

                            {/* SCAMMER */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-red-600 text-white p-2 rounded-lg text-xs w-24 animate-pulse">
                                <span className="text-2xl block">🤡</span>
                                ARACI (Dolandırıcı)
                            </div>

                            {/* Arrows */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-current text-white/50">
                                {/* Scammer to You */}
                                <line x1="50%" y1="80%" x2="10%" y2="20%" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                                {/* Scammer to Seller */}
                                <line x1="50%" y1="80%" x2="90%" y2="20%" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                                <defs>
                                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                        <path d="M0,0 L0,6 L9,3 z" fill="#fff" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>

                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-600 mb-6 text-sm text-slate-300">
                            <p>"Aracı (Dolandırıcı), hem sizi hem de gerçek satıcıyı kandırdı. Sizi 'kuzenim satıyor' diye, satıcıyı ise 'borcuma karşılık veriyorum' diye ikna etti."</p>
                            <p className="mt-2 text-yellow-500 font-bold">Şimdi Noterdesiniz!</p>
                        </div>

                        <button
                            onClick={() => setPhase("notary")}
                            className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
                        >
                            Noter İşlemine Başla 🏛️
                        </button>
                    </motion.div>
                )}

                {/* NOTARY SCENE */}
                {phase === "notary" && (
                    <motion.div
                        key="notary"
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                        className="flex-1 flex flex-col items-center justify-center"
                    >
                        <div className="bg-white text-slate-900 p-6 rounded-xl shadow-xl max-w-sm w-full">
                            <h3 className="font-bold border-b pb-2 mb-4 text-center">Noter Satış Sözleşmesi</h3>

                            <div className="space-y-2 text-sm mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Araç:</span>
                                    <span className="font-bold">34 AB 1234 (BMW)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Ruhsat Sahibi:</span>
                                    <span className="font-bold">Ahmet Yılmaz (Gerçek Satıcı)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Tutar:</span>
                                    <span className="font-bold">1.250.000 TL</span>
                                </div>
                            </div>

                            <div className="bg-red-50 border border-red-100 p-3 rounded mb-4 text-xs text-red-800">
                                <strong>WhatsApp Mesajı (Aracıdan):</strong><br />
                                "Kardeşim, para konusunu noterde konuşmayalım Ahmet amca yaşlı, kafası karışıyor. Parayı benim hesaba at, o benim borcumdu zaten halleşiriz."
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <button
                                    onClick={() => { setCorrect(false); setPhase("result"); }}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded font-bold transition-colors"
                                >
                                    💸 Parayı 'Aracı'nın IBAN'ına Gönder
                                </button>
                                <button
                                    onClick={() => { setCorrect(true); setPhase("result"); }}
                                    className="bg-green-600 hover:bg-green-500 text-white py-3 rounded font-bold transition-colors shadow-lg"
                                >
                                    🛑 Dur! Sadece Ruhsat Sahibine Gönderirim
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* RESULT */}
                {phase === "result" && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Sazan Sarmalını Bozdunuz!" : "1.25 Milyon TL Dolandırıldınız!"}
                            message={correct
                                ? "Mükemmel! Noterde para, sadece ruhsat sahibi (satışı yapan kişi) kimse onun banka hesabına gönderilir. Aracı, kuzen, dayı gibi üçüncü kişilere para atılmamalıdır."
                                : "Tuzağa düştünüz. Parayı aracıya attınız, noter satışı yapmadı çünkü satıcı parasını almadı. Aracı parayı alıp kaçtı, siz ve satıcı noterde baş başa kaldınız."}
                            lesson="Araç alım-satımında 'Sazan Sarmalı' yöntemi çok yaygındır. Ruhsat sahibi ile banka hesabı sahibi AYNI KİŞİ olmak zorundadır."
                            onReset={() => setPhase("diagram")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
