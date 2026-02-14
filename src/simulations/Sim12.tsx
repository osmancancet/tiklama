"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim12() {
    const [phase, setPhase] = useState<"wifi" | "hack" | "result">("wifi");
    const [selectedWifi, setSelectedWifi] = useState<string | null>(null);

    const networks = [
        { ssid: "Hotel_Network_Secure", lock: true, signal: 3 },
        { ssid: "Free_Guest_WiFi", lock: false, signal: 4 }, // Trap
        { ssid: "Cafe_Latte_Guest", lock: true, signal: 2 },
    ];

    const handleConnect = (ssid: string) => {
        setSelectedWifi(ssid);
        if (ssid === "Free_Guest_WiFi") {
            setTimeout(() => setPhase("hack"), 1000);
        } else {
            // Simulate password prompt then fail or success (simplified for demo)
            alert("Şifre gerekli. Açık ağa bağlanmayı deneyin (Simülasyon gereği).");
        }
    };

    return (
        <div>
            {phase === "wifi" && (
                <div className="max-w-sm mx-auto bg-white text-black rounded-3xl overflow-hidden border-4 border-zinc-200 shadow-xl">
                    <div className="bg-zinc-100 p-4 border-b flex justify-between items-center">
                        <span className="font-bold">Wi-Fi</span>
                        <div className="w-10 h-5 bg-green-500 rounded-full relative">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="p-2">
                        <p className="text-xs text-zinc-500 px-2 py-1 uppercase">Ağlar</p>
                        {networks.map((net, i) => (
                            <div
                                key={i}
                                onClick={() => handleConnect(net.ssid)}
                                className="flex items-center justify-between p-3 border-b border-zinc-100 hover:bg-blue-50 cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">{net.ssid}</span>
                                    {!net.lock && <span className="text-[10px] text-zinc-400">Güvenliksiz Ağ</span>}
                                </div>
                                <div className="flex items-center gap-2 text-zinc-600">
                                    {net.lock && <span>🔒</span>}
                                    <span className="font-bold tracking-tighter">📶</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {phase === "hack" && (
                <div className="flex flex-col items-center">
                    <div className="max-w-md w-full bg-black text-terminal-green font-mono p-4 rounded-xl border border-terminal-green/50 text-xs mb-6">
                        <p className="border-b border-terminal-green/30 pb-2 mb-2 font-bold text-center">HACKER PANEL [packet_sniffer.py]</p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.2 }}>
                            <p>{">"} Target connected: 192.168.1.14 (Merve's iPhone)</p>
                            <p>{">"} Intercepting HTTP traffic...</p>
                            <p className="text-white mt-2">{">"} POST /login.php</p>
                            <p className="text-white">{">"} user=merve_yilmaz</p>
                            <p className="text-danger-red font-bold animate-pulse">{">"} pass=tatil2024!</p>
                            <p className="text-zinc-500 mt-2">{">"} Session cookie captured.</p>
                        </motion.div>
                    </div>
                    <button onClick={() => setPhase("result")} className="btn-danger">
                        Simülasyonu Bitir
                    </button>
                </div>
            )}

            {phase === "result" && (
                <SimulationResult
                    isCorrect={false}
                    title="Açık Ağ Tuzağı!"
                    message="Otel veya kafelardeki şifresiz 'Free' ağları genellikle tuzaktır. (Man-in-the-Middle). Gönderdiğiniz tüm veriler saldırganın üzerinden geçer."
                    lesson="Kamusal alanlarda asla bankacılık işlemi yapmayın. Mümkünse kendi hücresel verinizi (4G/5G) veya güvenilir bir VPN kullanın."
                    onReset={() => setPhase("wifi")}
                />
            )}
        </div>
    );
}
