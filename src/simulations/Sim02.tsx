"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim02() {
    const [phase, setPhase] = useState<"inbox" | "email" | "compose" | "result">("inbox");
    const [correct, setCorrect] = useState(false);
    const [showReal, setShowReal] = useState(false);

    return (
        <div className="bg-[#f0f2f5] min-h-[480px] sm:min-h-[520px] max-w-sm sm:max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-300 flex flex-col font-sans text-gray-800">
            {/* Header (Outlook Style) */}
            <div className="bg-[#0078d4] text-white p-3 flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-3">
                    <div className="grid grid-cols-3 gap-0.5 w-4 h-4 opacity-80">
                        {[...Array(9)].map((_, i) => <div key={i} className="bg-white w-1 h-1 rounded-[1px]"></div>)}
                    </div>
                    <span className="font-semibold text-sm tracking-wide">Outlook</span>
                </div>
                <div className="flex gap-4 text-xs opacity-90">
                    <span>🔍 Ara</span>
                    <span>Ayarlar ⚙️</span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar (Desktop only) */}
                <div className="w-36 bg-[#f0f0f0] border-r border-gray-200 hidden md:flex flex-col p-2 gap-1 shrink-0">
                    {["Gelen Kutusu (1)", "Gönderilmiş", "Taslaklar", "Silinmiş", "Gereksiz"].map((folder, i) => (
                        <div key={i} className={`px-3 py-2 rounded text-xs cursor-pointer truncate ${i === 0 ? "bg-[#c7e0f4] text-[#0078d4] font-bold" : "hover:bg-gray-200 text-gray-700"}`}>
                            {folder}
                        </div>
                    ))}
                </div>

                {/* Email List / Reading Pane */}
                <AnimatePresence mode="wait">
                    {phase === "inbox" && (
                        <motion.div
                            key="inbox"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex-1 bg-white p-0 md:p-4"
                        >
                            <div className="border-b border-gray-200 p-3 md:hidden font-bold text-[#0078d4]">Gelen Kutusu</div>
                            <div
                                onClick={() => setPhase("email")}
                                className="group cursor-pointer hover:bg-[#f3f2f1] p-3 border-b border-gray-100 flex gap-3 transition-colors relative"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0078d4]"></div>
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0078d4] flex items-center justify-center font-bold flex-shrink-0">
                                    MK
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#0078d4]">Mehmet Kaya (CEO)</h4>
                                        <span className="text-xs text-[#d13438] font-bold">! 14:32</span>
                                    </div>
                                    <p className="text-[#0078d4] text-sm font-semibold mb-1">Acil Ödeme Talimatı - GİZLİ</p>
                                    <p className="text-xs text-gray-500 truncate">Ahmet Bey, acil bir ödeme yapmamız gerekiyor. Bu işlem...</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === "email" && (
                        <motion.div
                            key="email"
                            initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex-1 bg-white flex flex-col h-full overflow-y-auto"
                        >
                            {/* Email Toolbar */}
                            <div className="border-b border-gray-200 p-2 flex gap-2 overflow-x-auto">
                                <button onClick={() => setPhase("inbox")} className="md:hidden px-3 py-1 bg-gray-100 rounded text-xs">⬅ Geri</button>
                                {["Yanıtla", "Tümünü Yanıtla", "İlet", "Arşivle", "Sil"].map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => i < 3 ? setPhase("compose") : null}
                                        className="px-3 py-1 hover:bg-gray-100 rounded text-xs text-gray-700 flex items-center gap-1 transition-colors whitespace-nowrap"
                                    >
                                        {i === 0 && "↩️"} {i === 1 && "StartCall↩️"} {i === 2 && "➡️"} {i === 3 && "📦"} {i === 4 && "🗑️"}
                                        {action}
                                    </button>
                                ))}
                            </div>

                            {/* Email Content */}
                            <div className="p-4 md:p-8 flex-1">
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Acil Ödeme Talimatı - GİZLİ</h2>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0078d4] flex items-center justify-center font-bold text-lg">MK</div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap gap-2 items-baseline">
                                            <span className="font-bold text-gray-900">Mehmet Kaya</span>
                                            <span
                                                className="text-xs text-gray-500 relative cursor-help border-b border-dotted border-gray-400"
                                                onMouseEnter={() => setShowReal(true)}
                                                onMouseLeave={() => setShowReal(false)}
                                            >
                                                &lt;mehmet.kaya@holding-group.com&gt;
                                                {showReal && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                                        className="absolute top-full left-0 mt-1 bg-[#d13438] text-white text-[11px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-50 font-mono"
                                                    >
                                                        ⚠️ GERÇEK ADRES: ceo@holding-onay.xyz
                                                    </motion.div>
                                                )}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500">Kime: Ahmet Hakan &lt;ahmet.hakan@holding-group.com&gt;</div>
                                    </div>
                                </div>

                                <div className="prose prose-sm max-w-none text-gray-800 space-y-4 font-serif">
                                    <p>Ahmet Bey,</p>
                                    <p>Şu an yurtdışındayım ve çok acil bir ödeme yapmamız gerekiyor. Aşağıdaki hesaba bugün saat 17:00'a kadar <strong>450.000 TL</strong> gönderin.</p>
                                    <p>Bu işlem gizli bir satın alma ile ilgilidir, o yüzden <u>muhasebeden kimseyle paylaşmayın</u>. Denetimden sonra evrakları göndereceğim.</p>

                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 font-mono text-sm">
                                        <p className="font-bold">IBAN: TR12 0001 2345 6789 0000 1234 56</p>
                                        <p>ALICI: Global Danışmanlık Ltd.</p>
                                        <p>AÇIKLAMA: Hizmet Bedeli - 2024/02</p>
                                    </div>

                                    <p>İşlem dekontunu hemen bana yanıtlayın.</p>
                                    <p>İyi çalışmalar,<br /><strong>Mehmet Kaya</strong><br />Genel Müdür</p>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => setPhase("compose")}
                                        className="bg-[#0078d4] text-white px-6 py-3 rounded hover:bg-[#106ebe] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                                    >
                                        <span>↩️</span> Yanıtla ve Dekontu At
                                    </button>
                                    <button
                                        onClick={() => { setCorrect(true); setPhase("result"); }}
                                        className="bg-white border border-[#0078d4] text-[#0078d4] px-6 py-3 rounded hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <span>📞</span> Şüpheli Bul ve Ara
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {phase === "compose" && (
                        <motion.div
                            key="compose"
                            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                            className="bg-white flex flex-col items-center justify-center text-center p-8 h-full"
                        >
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mb-4">💸</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ödeme Talimatı Hazırlanıyor...</h3>
                            <p className="text-gray-600 mb-6">CEO'nun acil isteğini yerine getirmek üzeresiniz.</p>
                            <button
                                onClick={() => { setCorrect(false); setPhase("result"); }}
                                className="bg-[#d13438] text-white px-8 py-3 rounded-full font-bold hover:bg-[#a80000] transition-colors shadow-lg"
                            >
                                İşlemi Onayla ve Gönder
                            </button>
                        </motion.div>
                    )}

                    {phase === "result" && (
                        <motion.div key="result" className="absolute inset-0 bg-black/90 backdrop-blur-sm z-30 p-3 sm:p-6 overflow-y-auto">
                            <SimulationResult
                                isCorrect={correct}
                                title={correct ? "Dolandırıcılık Önlendi!" : "Şirket Zarara Uğradı!"}
                                message={correct
                                    ? "Şüphelendiniz ve farklı bir kanaldan (telefon) teyit alarak büyük bir zararı önlediniz. E-posta adresi aslında sahteydi (spoofing)."
                                    : "Sadece görünen isme ve 'acil' baskısına güvenerek sahte bir hesaba para gönderdiniz. Gönderen adresi aslında 'tek' bir harf farklıydı."}
                                lesson="CEO Dolandırıcılığı (BEC) vakalarında saldırganlar aciliyet ve gizlilik vurgusu yapar. Finansal işlemlerde e-posta tek başına asla yeterli değildir, mutlaka telefonla teyit (callback) yapın."
                                onReset={() => setPhase("inbox")}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
