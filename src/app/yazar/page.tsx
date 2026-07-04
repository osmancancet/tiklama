"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" as const }
    }
};

const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 }
    }
};

export default function AuthorPage() {
    return (
        <div className="min-h-screen pt-24 pb-20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10"
            >

                {/* Profile Header */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row items-center gap-8 mb-16"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl relative group z-20"
                    >
                        <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors"></div>
                        <img
                            src="/author.jpg"
                            alt="Öğr. Gör. Osman Can Çetlenbik"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "https://ui-avatars.com/api/?name=Osman+Can&background=0D8ABC&color=fff&size=192";
                            }}
                        />
                    </motion.div>

                    <div className="text-center md:text-left relative z-20">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Öğr. Gör. Osman Can Çetlenbik</h1>
                        <p className="text-lg text-accent-blue font-mono mb-4">Akademisyen & Bilgisayar Mühendisi</p>
                        <p className="text-text-secondary leading-relaxed max-w-2xl text-sm mb-6">
                            Manisa Celal Bayar Üniversitesi'nde Öğretim Görevlisi olarak çalışmaktadır.
                            Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği lisans ve Isparta Uygulamalı Bilimler Üniversitesi Yüksek Lisans eğitimlerini tamamlamıştır.
                            Akademik çalışmalarını Siber Güvenlik, IoT Güvenliği ve Sosyal Mühendislik üzerine yoğunlaştırmaktadır.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start relative z-50 pointer-events-auto">
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=osmancancetlenbik@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-lg bg-red-600/20 border border-red-500/30 hover:bg-red-600/40 transition-all active:scale-95 flex items-center gap-2 text-xs font-mono text-red-200"
                            >
                                <span className="text-lg">📩</span>
                                <span>E-POSTA</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/osmancancetlenbik/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-lg bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/40 transition-all active:scale-95 flex items-center gap-2 text-xs font-mono text-blue-200"
                            >
                                <span className="text-lg">🔗</span>
                                <span>LINKEDIN</span>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-16 mb-20">

                    {/* Split Career Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Academic Column */}
                        <motion.div variants={itemVariants} className="relative">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                                <span className="text-2xl">🎓</span> Akademik Kariyer
                            </h3>
                            <motion.div
                                variants={listContainerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6 relative pl-6 border-l border-white/10 ml-2"
                            >
                                {/* Manisa CBÜ */}
                                <motion.div variants={listItemVariants} className="relative group">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#0a0a0a] group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                                        <span className="text-xs font-mono text-accent-blue mb-1 block">2026 - Günümüz</span>
                                        <h4 className="text-white font-bold text-base">Öğretim Görevlisi</h4>
                                        <p className="text-text-secondary text-sm">Manisa Celal Bayar Üniversitesi</p>
                                    </div>
                                </motion.div>

                                {/* Dumlupınar */}
                                <motion.div variants={listItemVariants} className="relative group">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white/20 border-4 border-[#0a0a0a] group-hover:bg-blue-500/50 transition-colors"></div>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                                        <span className="text-xs font-mono text-text-secondary mb-1 block">2025</span>
                                        <h4 className="text-white font-bold text-base opacity-90">Öğretim Görevlisi</h4>
                                        <p className="text-text-secondary text-sm">Kütahya Dumlupınar Üniversitesi</p>
                                    </div>
                                </motion.div>

                                {/* Doğuş */}
                                <motion.div variants={listItemVariants} className="relative group">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white/20 border-4 border-[#0a0a0a] group-hover:bg-blue-500/50 transition-colors"></div>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                                        <span className="text-xs font-mono text-text-secondary mb-1 block">2025</span>
                                        <h4 className="text-white font-bold text-base opacity-90">Öğretim Görevlisi</h4>
                                        <p className="text-text-secondary text-sm">Doğuş Üniversitesi</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Industry Column */}
                        <motion.div variants={itemVariants} className="relative">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                                <span className="text-2xl">💼</span> Özel Sektör & Deneyim
                            </h3>
                            <motion.div
                                variants={listContainerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6 relative pl-6 border-l border-white/10 ml-2"
                            >
                                {/* Verkosis */}
                                <motion.div variants={listItemVariants} className="relative group">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#0a0a0a] group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                                        <span className="text-xs font-mono text-purple-400 mb-1 block">2024 - 2025</span>
                                        <h4 className="text-white font-bold text-base">Yazılım Mühendisi</h4>
                                        <p className="text-text-secondary text-sm">Verkosis Bilişim Teknolojileri</p>
                                    </div>
                                </motion.div>

                                {/* Somut */}
                                <motion.div variants={listItemVariants} className="relative group">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-green-500 border-4 border-[#0a0a0a] group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                                        <span className="text-xs font-mono text-green-400 mb-1 block">2023</span>
                                        <h4 className="text-white font-bold text-base">Bilgisayar Mühendisi</h4>
                                        <p className="text-text-secondary text-sm">Somut Yönetim Danışmanlık</p>
                                    </div>
                                </motion.div>

                                <motion.div variants={listItemVariants} className="relative group pt-4">
                                    <h4 className="text-xs text-text-secondary uppercase tracking-widest mb-4 mt-2">Üyelikler</h4>
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm">Siber Güvenlik ve Bilişim Hukuku Derneği</h4>
                                            <p className="text-xs text-text-secondary">2022 - Devam</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                    </div>

                    {/* Publications - Card Grid Design */}
                    <motion.div
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
                            <span className="text-3xl">📚</span> Yayınlar ve Bildiriler
                        </h3>
                        <motion.div
                            variants={listContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 gap-4"
                        >

                            <motion.div variants={listItemVariants} className="group p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 hover:border-blue-500/50 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-10 text-4xl group-hover:scale-110 transition-transform">📄</div>
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 border border-blue-500/20">MAKALE</span>
                                <h4 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-blue-200 transition-colors">IOT SECURITY AND SOFTWARE TESTING</h4>
                                <p className="text-sm text-text-secondary italic mb-2">Çetlenbik, O. C., Süzen, A. A. & Duman, B. (2024)</p>
                                <p className="text-xs text-text-secondary/60">Yalvaç Akademi Dergisi, Cilt 9</p>
                            </motion.div>

                            <motion.div variants={listItemVariants} className="group p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.04]">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-text-secondary text-xs font-bold mb-3">BİLDİRİ</span>
                                <h4 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-accent-blue transition-colors">USING EXPLAINABLE ARTIFICIAL INTELLIGENCE IN BUY AND SELL SIGNALS IN THE CRYPTOCURRENCY MARKET</h4>
                                <p className="text-sm text-text-secondary italic mb-2">Çetlenbik, O. C. & Süzen, A. A. (2025)</p>
                                <p className="text-xs text-text-secondary/60">4th International Conference on Contemporary Academic Research ICCAR 2025</p>
                            </motion.div>

                            <motion.div variants={listItemVariants} className="group p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.04]">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-text-secondary text-xs font-bold mb-3">BİLDİRİ</span>
                                <h4 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-accent-blue transition-colors">Hybrid Approaches to Price Prediction in Cryptocurrency Markets: Machine Learning and Technical Analysis</h4>
                                <p className="text-sm text-text-secondary italic mb-2">Çetlenbik, O. C. & Süzen, A. A. (2024)</p>
                                <p className="text-xs text-text-secondary/60">5th International Conference on Engineering and Applied Natural Sciences ICEANS 2024</p>
                            </motion.div>

                            <motion.div variants={listItemVariants} className="group p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.04]">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-text-secondary text-xs font-bold mb-3">BİLDİRİ</span>
                                <h4 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-accent-blue transition-colors">CLASSIFICATION OF PHISHING ATTACKS USING THE RoBERTa MODEL</h4>
                                <p className="text-sm text-text-secondary italic mb-2">Çetlenbik, O. C., Gürfidan, R. & Süzen, A. A. (2024)</p>
                                <p className="text-xs text-text-secondary/60">4th International Conference on Innovative Academic Studies ICIAS 2024</p>
                            </motion.div>

                            <motion.div variants={listItemVariants} className="group p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.04]">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-text-secondary text-xs font-bold mb-3">BİLDİRİ</span>
                                <h4 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-accent-blue transition-colors">Examining the Results of Phishing Attacks in a Sample Attack Simulation</h4>
                                <p className="text-sm text-text-secondary italic mb-2">Süzen, A. A. & Çetlenbik, O. C. (2022)</p>
                                <p className="text-xs text-text-secondary/60">1st International Conference on Innovative Academic Studies</p>
                            </motion.div>

                        </motion.div>
                    </motion.div>
                </div>

                {/* Project Context - Preface Style */}
                <motion.div
                    variants={itemVariants}
                    className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/30 shadow-2xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl group-hover:scale-110 transition-transform duration-700">✍️</div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <h3 className="text-2xl font-bold text-white">Önsöz: Bir Simülasyonun Doğuşu</h3>
                            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                        </div>

                        <div className="text-text-secondary leading-relaxed space-y-4 font-serif italic text-lg opacity-90">
                            <p>
                                "Siber güvenlikte en güçlü kilit kapıda değil, zihindedir. Bu proje, teorik bilginin sınırlarını aşıp deneyimin
                                gücünü ortaya koymak için tasarlandı."
                            </p>
                            <p>
                                <strong className="text-white block text-xl not-italic mb-2 border-l-4 border-accent-blue pl-4 py-2 bg-white/5 rounded-r-lg">
                                    TIKLA(MA)!<br />
                                    İNSAN ZİHNİNİ HACKLEME SANATI
                                </strong>
                                kitabının bir uzantısı olan bu platform, sayfalar arasında kaybolan
                                okuyucuyu pasif bir gözlemciden aktif bir savunmacıya dönüştürmeyi hedefler. Sosyal mühendislik sadece bir kodlama hatası değil,
                                insan doğasının bir açığıdır; ve bu açık ancak onu bizzat deneyimleyerek kapatılabilir.
                            </p>
                            <p>
                                Amacım, her bir kullanıcının bu simülasyonlarda kendi kararlarıyla yüzleşmesi ve dijital dünyadaki
                                'görünmez' tehlikelere karşı sarsılmaz bir refleks geliştirmesidir.
                            </p>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <Link href="/" className="inline-flex items-center px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-lg transition-transform active:scale-95 font-bold shadow-lg z-20 relative">
                                <span>Simülasyonları Başlat</span>
                                <span className="ml-2">→</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}
