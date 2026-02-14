"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AuthorPage() {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center gap-8 mb-16"
                >
                    <div className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors"></div>
                        <img
                            src="/author.jpg"
                            alt="Osman Can Çetlenbik"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "https://ui-avatars.com/api/?name=Osman+Can&background=0D8ABC&color=fff&size=192";
                            }}
                        />
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Osman Can Çetlenbik</h1>
                        <p className="text-xl text-accent-blue font-mono mb-4">Akademisyen & Yazar & Bilgisayar Mühendisi</p>
                        <p className="text-text-secondary leading-relaxed max-w-2xl">
                            Teknoloji ve insan psikolojisinin kesişim noktasında çalışmalar yürüten bir araştırmacı.
                            Siber güvenlik farkındalığını artırmak için "İnsan Zihnini Hackleme Sanatı" projesini geliştirdi.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
                            <a href="https://github.com/osmancancet" target="_blank" rel="noopener noreferrer"
                                className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-mono flex items-center gap-2">
                                <span>GITHUB</span>
                                <span className="text-xs opacity-50">↗</span>
                            </a>
                            <a href="https://linkedin.com/in/osmancancet" target="_blank" rel="noopener noreferrer"
                                className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors text-sm font-mono flex items-center gap-2">
                                <span>LINKEDIN</span>
                                <span className="text-xs opacity-50">↗</span>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">🎯</span> Vizyon
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                            Siber güvenlik sadece kodlardan ibaret değildir; en büyük güvenlik açığı insan zihnidir.
                            Amacım, karmaşık teknik kavramları herkesin anlayabileceği interaktif deneyimlere dönüştürerek
                            toplumsal farkındalık yaratmaktır.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">🔬</span> Uzmanlık Alanları
                        </h3>
                        <ul className="space-y-2 text-text-secondary">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
                                Sosyal Mühendislik & İnsan Psikolojisi
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
                                Siber Güvenlik Farkındalık Eğitimi
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
                                Web Uygulama Güvenliği
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
                                Oyunlaştırma (Gamification)
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Project Context */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/10 to-transparent border border-blue-500/20"
                >
                    <h3 className="text-xl font-bold text-white mb-4">TIKLA(MA)! Projesi Hakkında</h3>
                    <p className="text-text-secondary mb-6 leading-relaxed">
                        Bu proje, klasik sıkıcı eğitimlerin aksine, kullanıcıyı saldırganın yerine koyarak
                        tehlikeyi içeriden görmesini sağlayan bir simülasyon platformudur.
                    </p>
                    <Link href="/" className="inline-flex items-center text-accent-blue hover:text-white transition-colors">
                        <span className="border-b border-accent-blue/30 pb-0.5">Simülasyonlara Göz At</span>
                        <span className="ml-2">→</span>
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
