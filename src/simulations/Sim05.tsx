"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimulationResult from "@/components/SimulationResult";

const stories = [
    {
        id: 1,
        image: "linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)",
        icon: "✈️",
        text: "Tatil başlasın! 🏖️",
        risk: false
    },
    {
        id: 2,
        image: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Fake boarding pass look
        icon: "🎫",
        text: "Boarding Pass hazır! İstikamet Dubai! 🇦🇪",
        content: (
            <div className="bg-white text-black p-4 rounded w-3/4 mx-auto shadow-xl rotate-3 mt-10 font-mono text-xs">
                <div className="border-b border-black pb-2 mb-2 flex justify-between">
                    <span className="font-bold">BEYZANUR YILMAZ</span>
                    <span>TK1920</span>
                </div>
                <div className="flex justify-between mb-4">
                    <div>
                        <span className="block text-gray-500 text-[10px]">FROM</span>
                        <span className="font-bold">ISTANBUL (IST)</span>
                    </div>
                    <div>
                        <span className="block text-gray-500 text-[10px]">TO</span>
                        <span className="font-bold">DUBAI (DXB)</span>
                    </div>
                </div>
                <div className="barcode h-8 bg-black/10"></div>
                <div className="mt-2 text-[10px] text-red-600 font-bold animate-pulse">PNR: X8Q2W9</div>
            </div>
        ),
        risk: true
    },
    {
        id: 3,
        image: "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
        icon: "🍹",
        text: "Otele vardık, manzara harika!",
        risk: false
    }
];

export default function Sim05() {
    const [phase, setPhase] = useState<"story" | "result">("story");
    const [currentStory, setCurrentStory] = useState(0);
    const [correct, setCorrect] = useState(false);

    const handleNext = () => {
        if (currentStory < stories.length - 1) {
            setCurrentStory(curr => curr + 1);
        } else {
            // End of stories, treated as sharing all safely? No, specific check on risk slide needed.
            // Let's change mechanic: On the risk slide, user must chose.
        }
    };

    const handlePrev = () => {
        if (currentStory > 0) {
            setCurrentStory(curr => curr - 1);
        }
    };

    const handleShare = () => {
        if (stories[currentStory].risk) {
            setCorrect(false);
            setPhase("result");
        } else {
            if (currentStory < stories.length - 1) {
                setCurrentStory(curr => curr + 1);
            } else {
                // Completed safely? No, the risk was in the middle.
                // If they shared the risk slide, they fail.
            }
        }
    };

    const handleDelete = () => {
        if (stories[currentStory].risk) {
            setCorrect(true);
            setPhase("result");
        } else {
            // Deleted a harmless story
            if (currentStory < stories.length - 1) {
                setCurrentStory(curr => curr + 1);
            }
        }
    };

    return (
        <div className="relative h-[600px] max-w-sm mx-auto bg-black rounded-[3rem] border-8 border-gray-800 overflow-hidden shadow-2xl font-sans">

            <AnimatePresence mode="wait">
                {phase === "story" && (
                    <div className="h-full relative flex flex-col">
                        {/* Progress Bar */}
                        <div className="absolute top-4 left-0 right-0 z-20 flex gap-1 px-2">
                            {stories.map((s, i) => (
                                <div key={i} className="h-1 flex-1 bg-white/30 rounded overflow-hidden">
                                    <div
                                        className={`h-full bg-white transition-all duration-300 ${i === currentStory ? "w-full" : i < currentStory ? "w-full" : "w-0"}`}
                                    ></div>
                                </div>
                            ))}
                        </div>

                        {/* Header */}
                        <div className="absolute top-8 left-4 z-20 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-500 p-[2px]">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-bold text-black">
                                    BY
                                </div>
                            </div>
                            <span className="text-white font-semibold text-sm shadow-black drop-shadow-md">beyzanur_yilmaz</span>
                            <span className="text-white/70 text-xs">2s</span>
                        </div>

                        {/* Story Content */}
                        <motion.div
                            key={currentStory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 w-full h-full relative"
                            style={{ background: stories[currentStory].image }}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                <span className="text-6xl mb-6 shadow-black drop-shadow-xl">{stories[currentStory].icon}</span>
                                <p className="text-white text-xl font-bold font-serif shadow-black drop-shadow-md bg-black/20 p-2 rounded">
                                    {stories[currentStory].text}
                                </p>
                                {stories[currentStory].content}
                            </div>
                        </motion.div>

                        {/* Navigation Taps (Invisible) */}
                        <div className="absolute inset-y-0 left-0 w-1/3 z-10" onClick={handlePrev}></div>
                        <div className="absolute inset-y-0 right-0 w-1/3 z-10" onClick={handleNext}></div>

                        {/* Action Buttons (Bottom) */}
                        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-6 px-8">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500/80 backdrop-blur text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-red-500 transition-colors"
                            >
                                🗑️ Sil
                            </button>
                            <button
                                onClick={handleShare}
                                className="bg-blue-500/80 backdrop-blur text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors"
                            >
                                Paylaş 🚀
                            </button>
                        </div>
                    </div>
                )}

                {phase === "result" && (
                    <div className="h-full bg-gray-900 pt-16 px-4 pb-4 overflow-y-auto">
                        <SimulationResult
                            isCorrect={correct}
                            title={correct ? "Bilinçli Kullanıcı!" : "Kişisel Veri İfşası!"}
                            message={correct
                                ? "Harika bir dikkat! Uçak bileti üzerindeki PNR kodu ve barkod, saldırganların biletinizi iptal etmesine, telefon numaranıza erişmesine veya seyahat planınızı öğrenmesine neden olabilir. Bu tür görselleri asla paylaşmamalısınız."
                                : "Maalesef tuzağa düştünüz. Bilet üzerindeki PNR kodunu ve barkodu sansürlemeden paylaşmak, tüm kimlik ve seyahat bilgilerinizin çalınmasına yol açabilir."}
                            lesson="Konumunuzu 'o an' paylaşmayın, tatil dönüşü paylaşın. Bilet (uçak/konser), kimlik kartı, kredi kartı gibi üzerinde barkod veya numara olan hiçbir şeyi sosyal medyada paylaşmayın."
                            onReset={() => { setPhase("story"); setCurrentStory(0); }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
