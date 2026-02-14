"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim14() {
    const [phase, setPhase] = useState<"email" | "decision" | "result">("email");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-white min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-300 flex flex-col font-sans relative max-w-2xl mx-auto text-gray-800">

            {/* Outlook Header Reused */}
            <div className="bg-[#0078d4] text-white p-3 flex justify-between items-center shadow-md">
                <span className="font-bold">Outlook</span>
            </div>

            <AnimatePresence mode="wait">
                {phase === "email" && (
                    <motion.div
                        key="email"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 p-6 flex flex-col"
                    >
                        <h2 className="text-xl font-bold mb-4">Re: Köşk Satışı / Tapu Devir İşlemleri</h2>

                        {/* Old Email (Context) */}
                        <div className="mb-4 opacity-50 border-l-2 border-gray-300 pl-4 py-2">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-bold">Av. Kemal Yılmaz</span>
                                <span>Dün 14:00</span>
                            </div>
                            <p className="text-sm truncate">Burak Bey merhaba, tapu işlemleri için hazırlıklar tamam...</p>
                        </div>

                        {/* New Fake Email */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">KY</div>
                                <div>
                                    <div className="font-bold text-gray-900">Av. Kemal Yılmaz</div>
                                    <div className="text-xs text-gray-500">av.kemal.yilmaz@hukuk-burosu.com.tr.domain-service.net</div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-800 space-y-3 leading-relaxed">
                                <p>Burak Bey,</p>
                                <p>Tapu dairesindeki yoğunluk nedeniyle işlem günümüz yarına sarktı. Ancak harç ödemesinin bugün yapılması gerekiyor.</p>
                                <p><strong>ÖNEMLİ:</strong> Muhasebecimizin hesaplarında bloke olduğu için, ödemeyi aşağıdaki yeni IBAN adresimize yapmanızı rica ederim. Eski hesaba gönderim yapmayınız.</p>
                                <div className="bg-white p-3 border border-gray-200 rounded font-mono text-gray-700">
                                    TR99 0006 1000 2888 3444 5555 11<br />
                                    ALICI: Yılmaz Hukuk Danışmanlık
                                </div>
                                <p className="text-red-600 font-bold text-xs">Aksi takdirde satış işlemi iptal olacaktır.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-auto">
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="flex-1 bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition-colors"
                            >
                                💸 Hemen Gönder
                            </button>
                            <button
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="flex-1 bg-white border border-blue-600 text-blue-600 py-3 rounded font-bold hover:bg-blue-50 transition-colors"
                            >
                                📞 Avukatı Ara
                            </button>
                        </div>
                    </motion.div>
                )}

                {phase === "result" && (
                    <div className="absolute inset-0 bg-white z-20 p-4 md:p-12 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Dolandırıcılığı Önlediniz!" : "Sahte Hesaba Para Gönderdiniz!"}
                            message={correct
                                ? "Harika refleks! Yüksek meblağlı ödemelerde veya ani hesap değişikliklerinde SADECE e-postaya güvenilmez. Telefonla sesli teyit alarak aslında mailin sahte olduğunu öğrendiniz."
                                : "Büyük kayıp! E-posta adresi dikkatli bakıldığında sahteydi (spoofing). Avukatınızın mail hesabı hacklenmiş veya taklit edilmişti. Parayı dolandırıcıların hesabına yolladınız."}
                            lesson="Özellikle gayrimenkul ve araç alım-satımlarında, 'IBAN değişti', 'Hesap bloke oldu' gibi bahanelerle gelen e-postalara ASLA itibar etmeyin. Mutlaka telefonla doğrulayın."
                            onReset={() => setPhase("email")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
