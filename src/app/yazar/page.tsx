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
                            alt="Öğr. Gör. Osman Can Çetlenbik"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "https://ui-avatars.com/api/?name=Osman+Can&background=0D8ABC&color=fff&size=192";
                            }}
                        />
                    </div>

                    <div className="text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Öğr. Gör. Osman Can Çetlenbik</h1>
                        <p className="text-lg text-accent-blue font-mono mb-4">Akademisyen & Yazar</p>
                        <p className="text-text-secondary leading-relaxed max-w-2xl text-sm">
                            Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği mezunu ve Isparta Uygulamalı Bilimler Üniversitesi'nde Yüksek Lisans eğitimini tamamlamış bir teknoloji araştırmacısı.
                            Siber Güvenlik ve Bilişim Hukuku Derneği üyesi olarak, akademik çalışmalarını "farkındalık" ve "insan odaklı güvenlik" üzerine yoğunlaştırmaktadır.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
                            <a href="mailto:osmancancetlenbik@gmail.com"
                                className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-mono flex items-center gap-2">
                                <span>E-POSTA</span>
                                <span className="text-xs opacity-50">✉️</span>
                            </a>
                            <a href="https://linkedin.com/in/osmancancet" target="_blank" rel="noopener noreferrer"
                                className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors text-sm font-mono flex items-center gap-2">
                                <span>LINKEDIN</span>
                                <span className="text-xs opacity-50">↗</span>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Experience & Academic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">🎓</span> Akademik & Kariyer
                        </h3>
                        <ul className="space-y-4 text-text-secondary text-sm">
                            <li className="flex flex-col gap-1">
                                <span className="text-white font-medium">Öğretim Görevlisi</span>
                                <span className="text-xs text-text-muted">Kütahya Dumlupınar Üniversitesi (2025 - Günümüz)</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="text-white font-medium">Yazılım Mühendisi</span>
                                <span className="text-xs text-text-muted">Verkosis Bilişim (2024 - 2025)</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="text-white font-medium">Bilgisayar Mühendisi</span>
                                <span className="text-xs text-text-muted">Somut Yönetim (2023)</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="text-2xl">📚</span> Yayınlar & Uzmanlık
                        </h3>
                        <div className="space-y-4 text-text-secondary text-sm">
                            <p className="leading-relaxed">
                                <span className="text-accent-blue">Odak Alanları:</span> IoT Güvenliği, Phishing Analizi, Yapay Zeka ve Kripto Varlıklar.
                            </p>
                            <div className="border-l-2 border-white/10 pl-4 italic opacity-80">
                                "Classification of Phishing Attacks Using RoBERTa Model"
                                <br />
                                "IoT Security and Software Testing"
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Project Context */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/30 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">📖</div>
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">TIKLA(MA)! Projesi ve Kitap Entegrasyonu</h3>
                    <p className="text-text-secondary mb-6 leading-relaxed relative z-10">
                        Bu çalışma, siber güvenlik farkındalığını sadece teorik bir bilgi olmaktan çıkarıp,
                        <span className="text-white font-bold"> "İnsan Zihnini Hackleme Sanatı"</span> kitabı ile entegre çalışan hibrit bir eğitim platformudur.
                        <br /><br />
                        Okuyucular, kitapta anlatılan psikolojik manipülasyon tekniklerini (Sosyal Mühendislik) bu platform üzerinden
                        <span className="text-accent-blue"> simüle ederek deneyimler</span>. Amaç, yazarın akademik birikimini pratik bir savunma refleksine dönüştürmektir.
                    </p>
                    <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-bold relative z-10">
                        <span>Projeyi Deneyimle</span>
                        <span className="ml-2">→</span>
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
