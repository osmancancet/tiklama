"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim12() {
    const [phase, setPhase] = useState<"list" | "connected" | "result">("list");
    const [correct, setCorrect] = useState(false);
    const [selectedNet, setSelectedNet] = useState<string | null>(null);

    const networks = [
        { ssid: "Hotel_Grand_Secure", secure: true, signal: 3, locked: true },
        { ssid: "Free_Guest_WiFi", secure: false, signal: 4, locked: false }, // Trap
        { ssid: "Cafe_Latte_5G", secure: true, signal: 2, locked: true },
        { ssid: "HP-Printer-Network", secure: false, signal: 1, locked: false },
    ];

    const connectTo = (ssid: string, isTrap: boolean) => {
        setSelectedNet(ssid);
        if (isTrap) {
            // Trap network
            setCorrect(false);
            setPhase("result");
        } else {
            // Secure network (simulate asking for password or just success if we assume they have it)
            // For gamification, let's say they can't connect to locked ones without asking reception,
            // but the easy 'Free' one is tempting.
            // Actually, connecting to 'Secure' should be the 'Good' choice (assuming they get password from reception).
            setCorrect(true);
            setPhase("result");
        }
    };

    return (
        <div className="bg-gray-100 min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-300 flex flex-col font-sans relative max-w-sm mx-auto">

            {/* Phone Header */}
            <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
                <h2 className="text-lg font-bold text-gray-800">Wi-Fi</h2>
                <div className="w-10 h-6 bg-green-500 rounded-full p-1 flex justify-end">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
            </div>

            <div className="p-2 bg-gray-50 text-xs text-gray-500 uppercase font-bold tracking-wider px-4 py-2">
                Kullanılabilir Ağlar
            </div>

            <div className="flex-1 bg-white">
                {networks.map((net, i) => (
                    <motion.div
                        key={i}
                        whileTap={{ backgroundColor: "#f3f4f6" }}
                        onClick={() => {
                            if (net.locked) {
                                // Simulate password prompt for secure net, let's just say it's the right choice
                                setCorrect(true);
                                setPhase("result");
                            } else {
                                // Insecure net
                                setCorrect(false);
                                setPhase("result");
                            }
                        }}
                        className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer"
                    >
                        <div className="flex flex-col">
                            <span className="text-gray-900 font-medium">{net.ssid}</span>
                            {!net.locked && <span className="text-xs text-gray-400">Güvenliksiz Ağ</span>}
                        </div>
                        <div className="flex items-center gap-3">
                            {net.locked && <span className="text-gray-400 text-xs">🔒</span>}
                            <div className="flex items-end gap-0.5 h-4">
                                <div className={`w-1 rounded-sm ${net.signal > 0 ? "bg-black" : "bg-gray-300"} h-2`}></div>
                                <div className={`w-1 rounded-sm ${net.signal > 1 ? "bg-black" : "bg-gray-300"} h-3`}></div>
                                <div className={`w-1 rounded-sm ${net.signal > 2 ? "bg-black" : "bg-gray-300"} h-4`}></div>
                            </div>
                            <span className="text-blue-500 text-xl">ℹ️</span>
                        </div>
                    </motion.div>
                ))}

                <div className="p-4 text-center mt-4">
                    <p className="text-sm text-gray-500 mb-4">
                        Tatilde oteldesiniz. İnternet bankacılığına girip fatura ödemeniz gerekiyor. Hangi ağa bağlanırsınız?
                    </p>
                    <div className="text-xs bg-yellow-50 p-2 rounded border border-yellow-200 text-yellow-800">
                        💡 İpucu: 'Free' veya şifresiz ağlar her zaman caziptir ama güvenli midir?
                    </div>
                </div>
            </div>

            {/* Result */}
            {phase === "result" && (
                <div className="absolute inset-0 bg-white z-20 p-4 overflow-y-auto">
                    <SimulationResult
                        isCorrect={correct}
                        title={correct ? "Güvenli Bağlantı!" : "Man-in-the-Middle Saldırısı!"}
                        message={correct
                            ? "Doğru tercih! Resepsiyondan şifresini aldığınız şifreli (kilitli) ağa bağlanarak veya kendi hücresel verinizi kullanarak verilerinizi şifrelediniz."
                            : "Tuzağa düştünüz! 'Free_Guest_WiFi' gibi şifresiz ağlar genellikle hackerlar tarafından kurulur (Evil Twin). Bu ağ üzerinden yaptığınız tüm bankacılık işlemleri izlendi."}
                        lesson="Halka açık şifresiz Wi-Fi ağlarında asla bankacılık işlemi veya e-devlet girişi yapmayın. Mümkünse VPN veya kendi mobil verinizi kullanın."
                        onReset={() => setPhase("list")}
                    />
                </div>
            )}
        </div>
    );
}
