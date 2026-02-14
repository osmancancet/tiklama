"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim23() {
    const [phase, setPhase] = useState<"email" | "analyze" | "result">("email");
    const [correct, setCorrect] = useState(false);

    return (
        <div className="bg-white min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-300 flex flex-col font-sans relative max-w-2xl mx-auto text-gray-800">

            {/* Header */}
            <div className="bg-slate-800 text-white p-3 flex justify-between items-center">
                <span className="font-bold">Kurumsal E-posta</span>
                <span className="text-xs bg-red-600 px-2 py-0.5 rounded">Gelen Kutusu (1)</span>
            </div>

            <AnimatePresence mode="wait">
                {phase === "email" && (
                    <motion.div
                        key="email"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 p-6 flex flex-col"
                    >
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Acil: Güvenlik Güncellemesi</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="font-bold text-gray-700">Kimden:</span>
                                <span className="text-gray-600">IT Support &lt;admin@universite-security.com&gt;</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="font-bold text-gray-700">Kime:</span>
                                <span className="text-gray-600">Ahmet Ali &lt;ahmet@universite.edu.tr&gt;</span>
                            </div>
                        </div>

                        <div className="text-gray-800 leading-relaxed mb-8">
                            <p className="mb-4">Sayın Hocam,</p>
                            <p className="mb-4">Üniversite ağımızda tespit edilen kritik bir açık nedeniyle, tüm personelin ekteki güvenlik yamasını acilen yüklemesi gerekmektedir. Aksi takdirde e-posta erişiminiz kapatılacaktır.</p>
                            <p>Saygılarımızla,<br />Bilgi İşlem Daire Başkanlığı</p>
                        </div>

                        <div className="bg-gray-100 p-3 rounded border flex items-center justify-between mb-8 cursor-pointer hover:bg-gray-200 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📎</span>
                                <div>
                                    <div className="font-bold text-sm">Security_Patch_v2.exe</div>
                                    <div className="text-xs text-gray-500">2.4 MB</div>
                                </div>
                            </div>
                            <div className="text-blue-600 text-sm font-bold">İndir</div>
                        </div>

                        <div className="flex gap-4 mt-auto">
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="flex-1 bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700"
                            >
                                Dosyayı Aç (Güveniyorum)
                            </button>
                            <button
                                onClick={() => setPhase("analyze")}
                                className="flex-1 bg-slate-600 text-white py-3 rounded font-bold hover:bg-slate-700 flex items-center justify-center gap-2"
                            >
                                <span>🔍</span> Detaylı İncele (Header)
                            </button>
                        </div>
                    </motion.div>
                )}

                {phase === "analyze" && (
                    <motion.div
                        key="analyze"
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                        className="absolute inset-0 bg-slate-900 text-green-400 p-6 font-mono text-xs overflow-y-auto z-10"
                    >
                        <button onClick={() => setPhase("email")} className="text-white mb-4 border border-white px-2 py-1 rounded">← Geri</button>

                        <h3 className="text-white text-lg font-bold mb-4 border-b border-gray-700 pb-2">E-POSTA ÜSTBİLGİ (HEADER) ANALİZİ</h3>

                        <div className="space-y-2">
                            <p><span className="text-blue-400">Return-Path:</span> &lt;hacker@random-server-123.xyz&gt; <span className="text-red-500 font-bold ml-2">&lt;-- ŞÜPHELİ!</span></p>
                            <p><span className="text-blue-400">Received:</span> from mail.spam-server.net (192.168.1.1)</p>
                            <p><span className="text-blue-400">From:</span> IT Support &lt;admin@universite-security.com&gt;</p>
                            <p><span className="text-blue-400">Subject:</span> Acil: Güvenlik Güncellemesi</p>

                            <div className="bg-red-900/30 border border-red-500 p-2 mt-4 text-white">
                                <strong>ANALİZ SONUCU:</strong><br />
                                Gönderen adresinde "universite.edu.tr" yerine "universite-security.com" kullanılmış. Bu domain üniversiteye ait değil. Ayrıca Return-Path tamamen farklı, spam skorları yüksek.
                            </div>
                        </div>

                        <button
                            onClick={() => { setCorrect(true); setPhase("result"); }}
                            className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded font-bold mt-8 text-sm"
                        >
                            RAPORLA VE SİL (Saldırıyı Engelle)
                        </button>
                    </motion.div>
                )}

                {phase === "result" && (
                    <div className="absolute inset-0 bg-white z-20 p-4 md:p-12 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Hedef Odaklı Saldırıyı Bozdunuz!" : "Zıpkınla Avlandınız!"}
                            message={correct
                                ? "Profesyonelce davrandınız. 'Spear Phishing' (Zıpkınla Avlama), kişiye özel hazırlanan ve çok inandırıcı olan saldırılardır. Ancak teknik analizle (Header kontrolü ve Domain kontrolü) tuzağı gördünüz."
                                : "Tuzağa düştünüz. E-posta çok resmi ve acil görünüyordu, işinize/ünvanınıza özel hazırlanmıştı. Dosyayı açtığınız an bilgisayarınız ele geçirildi."}
                            lesson="Tanıdığınız bir kurumdan gelse bile, 'Acil işlem yap', 'Yama yükle', 'Şifre değiştir' diyen e-postaların gönderen adresini ve teknik detaylarını (Header) mutlaka kontrol edin."
                            onReset={() => setPhase("email")}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
