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
                    className="flex flex-col md:flex-row items-center gap-8 mb-12"
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

                    <div className="text-center md:text-left relative z-20">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Öğr. Gör. Osman Can Çetlenbik</h1>
                        <p className="text-lg text-accent-blue font-mono mb-4">Akademisyen & Yazar</p>
                        <p className="text-text-secondary leading-relaxed max-w-2xl text-sm mb-6">
                            Manisa Celal Bayar Üniversitesi'nde Öğretim Görevlisi olarak çalışmaktadır.
                            Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği lisans ve Isparta Uygulamalı Bilimler Üniversitesi Yüksek Lisans eğitimlerini tamamlamıştır.
                            Akademik çalışmalarını Siber Güvenlik, IoT Güvenliği ve İnsan Odaklı Güvenlik (Sosyal Mühendislik) üzerine yoğunlaştırmaktadır.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a href="mailto:osmancancetlenbik@gmail.com" className="btn-secondary flex items-center gap-2 text-xs font-mono relative z-30 pointer-events-auto">
                                <span>✉️ E-POSTA</span>
                            </a>
                            <a href="https://linkedin.com/in/osmancancet" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2 text-xs font-mono relative z-30 pointer-events-auto">
                                <span>🔗 LINKEDIN</span>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 mb-16">

                    {/* Academic & Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-2xl bg-white/[0.02] border border-white/5"
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-2xl">🎓</span> Akademik & Kariyer
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-accent-blue font-bold text-sm">Akademik Görevler</h4>
                                <ul className="mt-2 space-y-3 text-sm text-text-secondary">
                                    <li className="flex flex-col">
                                        <span className="text-white">Öğretim Görevlisi</span>
                                        <span className="text-xs opacity-70">Manisa Celal Bayar Üniversitesi (2025 - ...)</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <span className="text-white">Öğretim Görevlisi</span>
                                        <span className="text-xs opacity-70">Kütahya Dumlupınar Üniversitesi (2025)</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <span className="text-white">Öğretim Görevlisi</span>
                                        <span className="text-xs opacity-70">Doğuş Üniversitesi (2025)</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-t border-white/5 pt-4">
                                <h4 className="text-accent-blue font-bold text-sm">Sektör Deneyimi</h4>
                                <ul className="mt-2 space-y-3 text-sm text-text-secondary">
                                    <li className="flex flex-col">
                                        <span className="text-white">Yazılım Mühendisi</span>
                                        <span className="text-xs opacity-70">Verkosis Bilişim Teknolojileri (2024 - 2025)</span>
                                    </li>
                                    <li className="flex flex-col">
                                        <span className="text-white">Bilgisayar Mühendisi</span>
                                        <span className="text-xs opacity-70">Somut Yönetim Danışmanlık (2023)</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-t border-white/5 pt-4">
                                <h4 className="text-accent-blue font-bold text-sm">Dernek Üyelikleri</h4>
                                <p className="text-sm text-text-secondary mt-1">Siber Güvenlik ve Bilişim Hukuku Derneği (2022 - Devam)</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Publications */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-8 rounded-2xl bg-white/[0.02] border border-white/5"
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-2xl">📚</span> Yayınlar ve Bildiriler
                        </h3>
                        <div className="space-y-6 text-sm text-text-secondary">

                            <div>
                                <h4 className="text-white font-bold mb-2">Makaleler</h4>
                                <ul className="list-disc list-inside space-y-2 marker:text-accent-blue">
                                    <li>Çetlenbik, O. C., Süzen, A. A. & Duman, B. (2024). <strong>IOT SECURITY AND SOFTWARE TESTING.</strong> Yalvaç Akademi Dergisi, 9().</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-bold mb-2">Bildiriler</h4>
                                <ul className="list-disc list-inside space-y-2 marker:text-accent-blue">
                                    <li>Çetlenbik, O. C. & Süzen, A. A. (2025). <strong>USING EXPLAINABLE ARTIFICIAL INTELLIGENCE IN BUY AND SELL SIGNALS IN THE CRYPTOCURRENCY MARKET.</strong> 4th International Conference on Contemporary Academic Research ICCAR 2025.</li>
                                    <li>Çetlenbik, O. C. & Süzen, A. A. (2024). <strong>Hybrid Approaches to Price Prediction in Cryptocurrency Markets: Machine Learning and Technical Analysis.</strong> 5th International Conference on Engineering and Applied Natural Sciences ICEANS 2024.</li>
                                    <li>Çetlenbik, O. C., Gürfidan, R. & Süzen, A. A. (2024). <strong>CLASSIFICATION OF PHISHING ATTACKS USING THE RoBERTa MODEL.</strong> 4th International Conference on Innovative Academic Studies ICIAS 2024.</li>
                                    <li>Süzen, A. A. & Çetlenbik, O. C. (2022). <strong>Examining the Results of Phishing Attacks in a Sample Attack Simulation.</strong> 1st International Conference on Innovative Academic Studies.</li>
                                </ul>
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
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4">TIKLA(MA)! Projesi ve Kitap Entegrasyonu</h3>
                        <p className="text-text-secondary mb-6 leading-relaxed">
                            Bu çalışma, siber güvenlik farkındalığını sadece teorik bir bilgi olmaktan çıkarıp,
                            <span className="text-white font-bold"> "İnsan Zihnini Hackleme Sanatı"</span> kitabı ile entegre çalışan hibrit bir eğitim platformudur.
                            <br /><br />
                            Okuyucular, kitapta anlatılan psikolojik manipülasyon tekniklerini (Sosyal Mühendislik) bu platform üzerinden
                            <span className="text-accent-blue"> simüle ederek deneyimler</span>. Amaç, akademik birikimi pratik bir savunma refleksine dönüştürmektir.
                        </p>
                        <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-bold z-20 relative">
                            <span>Projeyi Deneyimle</span>
                            <span className="ml-2">→</span>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
