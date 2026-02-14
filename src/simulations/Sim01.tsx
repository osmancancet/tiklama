"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";
import { Phone, PhoneOff, Mic, Volume2, GripHorizontal } from "lucide-react";

export default function Sim01() {
    const [phase, setPhase] = useState<"incoming" | "active" | "keypad" | "result">("incoming");
    const [correct, setCorrect] = useState(false);
    const [timer, setTimer] = useState(0);
    const [dial, setDial] = useState("");

    // Timer logic
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

    const handleHangUp = (isSuccess: boolean) => {
        setCorrect(isSuccess);
        setPhase("result");
    };

    const handleKeypadPress = (num: string) => {
        setDial(prev => prev + num);
        // If user presses any key, it's a fail (they fell for the "press 1" trap)
        if (dial.length >= 0) {
            setTimeout(() => {
                setCorrect(false);
                setPhase("result");
            }, 800);
        }
    };

    // TTS Logic
    useEffect(() => {
        if (phase === "active") {
            const utterance = new SpeechSynthesisUtterance(
                "Adınız bir terör örgütü soruşturmasına karıştı. Banka hesaplarınıza bloke konulacak. Hesabınızı güvene almak için hemen biri tuşlayın."
            );
            utterance.lang = "tr-TR";
            utterance.rate = 0.9;
            utterance.pitch = 0.8; // Deeper, more authoritative voice
            window.speechSynthesis.speak(utterance);

            return () => {
                window.speechSynthesis.cancel();
            };
        }
    }, [phase]);

    return (
        <div className="relative h-[600px] w-full max-w-[320px] mx-auto bg-black rounded-[3rem] border-[8px] border-gray-900 overflow-hidden shadow-2xl font-sans text-white select-none">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-xl z-50 flex justify-center items-center">
                <div className="w-16 h-4 bg-gray-900/50 rounded-full" />
            </div>

            {/* Status Bar */}
            <div className="absolute top-2 w-full px-5 flex justify-between text-[10px] font-medium z-40 text-white/80">
                <span>09:41</span>
                <div className="flex gap-1">
                    <span className="opacity-80">5G</span>
                    <span className="opacity-80">🔋</span>
                </div>
            </div>

            {/* Background Blur */}
            <div className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-125"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

            <AnimatePresence mode="wait">
                {/* INCOMING CALL SCREEN */}
                {phase === "incoming" && (
                    <motion.div
                        key="incoming"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="relative z-10 h-full flex flex-col pt-20 pb-12 px-6"
                    >
                        <div className="flex-1 flex flex-col items-center">
                            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mb-4 shadow-lg overflow-hidden relative">
                                <span className="text-4xl">👮🏻‍♂️</span>
                                {/* Fake Badge Overlay */}
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-gray-600">
                                    <span className="text-xs">🛡️</span>
                                </div>
                            </div>
                            <h2 className="text-3xl font-medium mb-1 tracking-tight">POLİS MERKEZİ</h2>
                            <p className="text-white/60 text-lg">Ankara Emniyet</p>
                        </div>

                        <div className="w-full flex justify-between items-end mt-auto gap-8">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleHangUp(true)}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                                    <PhoneOff size={32} fill="currentColor" />
                                </div>
                                <span className="text-sm font-medium">Reddet</span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setPhase("active")}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20 animate-[pulse_2s_infinite]">
                                    <Phone size={32} fill="currentColor" />
                                </div>
                                <span className="text-sm font-medium">Yanıtla</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* ACTIVE CALL SCREEN */}
                {(phase === "active" || phase === "keypad") && (
                    <motion.div
                        key="active"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="relative z-10 h-full flex flex-col pt-16 pb-8 px-6 bg-black/80 backdrop-blur-3xl"
                    >
                        {/* Call Info */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <h2 className="text-xl font-medium tracking-tight">POLİS MERKEZİ</h2>
                            </div>
                            <p className="text-white/60 font-mono tracking-widest">{formatTime(timer)}</p>
                        </div>

                        {/* Waveform / Script Area */}
                        {phase === "active" ? (
                            <div className="flex-1 flex flex-col items-center justify-center mb-8">
                                {/* Simulated Voice Waveform */}
                                <div className="flex items-center justify-center gap-1 h-12 mb-6">
                                    {[...Array(10)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                            className="w-1.5 bg-green-500/80 rounded-full"
                                        />
                                    ))}
                                </div>

                                {/* Script */}
                                <div className="bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-md max-w-[260px]">
                                    <p className="text-white/90 text-sm text-center font-medium leading-relaxed">
                                        "Adınız bir terör örgütü soruşturmasına karıştı. Banka hesaplarınıza bloke konulacak. Hesabınızı güvene almak için hemen <span className="text-red-400 font-bold">1'i tuşlayın</span>."
                                    </p>
                                </div>
                            </div>
                        ) : (
                            /* Keypad Display */
                            <div className="flex-1 flex flex-col items-center mb-4">
                                <div className="text-4xl font-light mb-8 h-12 flex items-center tracking-widest">
                                    {dial.split('').map((d, index) => <span key={index} className="mx-1">●</span>)}
                                </div>
                                <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => handleKeypadPress(num.toString())}
                                            className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-md flex flex-col items-center justify-center transition-colors"
                                        >
                                            <span className="text-2xl font-light">{num}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Call Controls */}
                        {phase === "active" && (
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="flex flex-col items-center gap-1 opacity-50"><div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center"><Mic /></div><span className="text-[10px]">Sessiz</span></div>
                                <button onClick={() => setPhase("keypad")} className="flex flex-col items-center gap-1 hover:opacity-80 transition-opacity">
                                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><GripHorizontal /></div>
                                    <span className="text-[10px]">Klavye</span>
                                </button>
                                <div className="flex flex-col items-center gap-1 opacity-50"><div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center"><Volume2 /></div><span className="text-[10px]">Hoparlör</span></div>
                            </div>
                        )}

                        {/* End Call Button */}
                        <div className="flex justify-center">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleHangUp(true)}
                                className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20 z-50"
                            >
                                <PhoneOff size={32} fill="currentColor" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* RESULT OVERLAY */}
                {phase === "result" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 bg-black/95 p-6 overflow-y-auto pt-20"
                    >
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Tuzağı Bozdunuz!" : "Dolandırıldınız!"}
                            message={correct
                                ? "Soğukkanlı davrandınız. Gerçek polis/savcı, vatandaşlardan asla 'koruma' adı altında para istemez veya telefonda tuşlama yaptırmaz. Doğrudan kapattığınız için güvendesiniz."
                                : "Tuşlama yaparak dolandırıcıların yönlendirmesini kabul ettiniz. Bu işlem genellikle sizi ücretli hatlara yönlendirir veya banka şifrenizi tuşlatarak bilgilerinizi çalar."}
                            lesson="Telefonda 'Adınız Teröre Karıştı', 'FETÖ', 'Altın/Döviz' gibi korku unsurlarını kullanan kişilere ASLA inanmayın. Devlet memuru sizden para istemez. Telefonu kapatın ve 112'yi arayın."
                            onReset={() => { setPhase("incoming"); setTimer(0); setDial(""); }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
