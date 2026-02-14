"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

export default function Sim01() {
    const [phase, setPhase] = useState<"incoming" | "active" | "keypad" | "result">("incoming");
    const [correct, setCorrect] = useState(false);
    const [timer, setTimer] = useState(0);
    const [dial, setDial] = useState("");

    // Timer for active call
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (phase === "active" || phase === "keypad") {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [phase]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleHangUp = () => {
        setCorrect(true);
        setPhase("result");
    };

    const handleNumberClick = (num: string) => {
        setDial((prev) => {
            const newDial = prev + num;
            if (newDial === "1") {
                setTimeout(() => {
                    setCorrect(false);
                    setPhase("result");
                }, 500);
            }
            return newDial;
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-900 rounded-3xl overflow-hidden relative border-8 border-gray-800 shadow-2xl max-w-sm mx-auto">

            <AnimatePresence mode="wait">
                {/* INCOMING CALL */}
                {phase === "incoming" && (
                    <motion.div
                        key="incoming"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex flex-col items-center justify-between py-12 bg-gray-900/90 backdrop-blur-md absolute inset-0 z-20"
                    >
                        <div className="text-center mt-8">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-white/20"
                            >
                                <span className="text-4xl">👮</span>
                            </motion.div>
                            <h2 className="text-3xl font-bold text-white mb-1">155</h2>
                            <p className="text-lg text-gray-400">Polis İmdat</p>
                            <p className="text-sm text-gray-500 mt-2">Bilinmeyen Numara</p>
                        </div>

                        <div className="w-full px-8 flex justify-between items-center mb-8">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => { setCorrect(true); setPhase("result"); }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-500/30">
                                    📞
                                </div>
                                <span className="text-sm text-white font-medium">Reddet</span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setPhase("active")}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl animate-pulse shadow-lg shadow-green-500/30">
                                    📞
                                </div>
                                <span className="text-sm text-white font-medium">Yanıtla</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* ACTIVE CALL */}
                {(phase === "active" || phase === "keypad") && (
                    <motion.div
                        key="active"
                        initial={{ y: 300, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex flex-col items-center bg-gray-800 absolute inset-0 py-8"
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2 mx-auto border border-white/10">
                                <span className="text-2xl">👮</span>
                            </div>
                            <h3 className="text-xl font-bold text-white">155</h3>
                            <p className="text-sm text-green-400 font-mono tracking-widest">{formatTime(timer)}</p>
                        </div>

                        {phase === "active" ? (
                            <div className="px-6 w-full text-center flex-1 flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-black/30 p-4 rounded-xl border border-white/5 mb-6"
                                >
                                    <p className="text-white text-sm italic leading-relaxed">
                                        "Adınız bir terör soruşturmasına karıştı. Şu an operasyon başlatıyoruz. Hesabınızı güvene almak için tuşlama yapmanız gerekiyor."
                                    </p>
                                </motion.div>
                                <p className="text-yellow-400 font-bold mb-4 animate-pulse">
                                    "Güvenli hesaba aktarım için lütfen hemen 1'i tuşlayın!"
                                </p>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {["Ses", "Tuşlar", "Hoparlör"].map((item, i) => (
                                        <div key={i} className={`flex flex-col items-center gap-1 ${item === "Tuşlar" ? "text-white cursor-pointer" : "text-gray-500"}`}
                                            onClick={() => item === "Tuşlar" && setPhase("keypad")}>
                                            <div className={`w-12 h-12 rounded-full border ${item === "Tuşlar" ? "border-white bg-white/10" : "border-gray-600"} flex items-center justify-center`}>
                                                {item === "Tuşlar" ? "⌨️" : "⚪"}
                                            </div>
                                            <span className="text-xs">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="px-8 w-full flex-1">
                                <div className="text-center text-3xl text-white font-mono mb-6 h-10 border-b border-gray-700">
                                    {dial}
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => handleNumberClick(num.toString())}
                                            className="w-16 h-16 rounded-full bg-gray-700/50 hover:bg-gray-700 text-white text-2xl font-semibold flex items-center justify-center transition-colors active:bg-gray-600"
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleHangUp}
                            className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-red-600/20 active:scale-95 transition-transform"
                        >
                            📞
                        </button>
                    </motion.div>
                )}

                {/* RESULT */}
                {phase === "result" && (
                    <motion.div key="result" className="h-full overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Tebrikler: Tuzağı Bozdunuz!" : "Dolandırıldınız!"}
                            message={correct
                                ? "Soğukkanlı davranıp telefonu kapattınız. Gerçek polis asla operasyon için para istemez veya tuşlama yaptırmaz."
                                : "Tuşlama yaparak dolandırıcıların yönlendirmesini kabul ettiniz ve hesabınızı ele geçirmelerine izin verdiniz."}
                            lesson="Telefonda kendini polis/savcı olarak tanıtan ve 'gizli operasyon' diyerek para veya işlem talep edenlere ASLA inanmayın. Telefonu kapatın ve 112'yi arayın."
                            onReset={() => { setPhase("incoming"); setTimer(0); setDial(""); }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
