"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { chapters } from "@/data/chapters";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Animated background grid */}


        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Glitch hero title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >


            <div className="text-center z-10 max-w-4xl mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black leading-none mb-6 tracking-tighter text-white drop-shadow-2xl" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="text-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">TIKLA</span>
                  <span className="text-red-600 drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">(MA)!</span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-text-secondary font-serif italic tracking-widest mb-12">
                  İNSAN ZİHNİNİ HACKLEME SANATI
                </p>

                <blockquote className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-16 font-mono italic relative flex flex-col items-center">
                  <span className="text-4xl text-blue-500 mb-4 opacity-50">"</span>
                  <p className="leading-relaxed">
                    Bir sisteme sızmak için bilgisayarları değil, onları kullanan insanları hedef alın.
                  </p>
                  <footer className="text-sm font-bold text-gray-500 mt-4 not-italic">— Kevin Mitnick</footer>
                </blockquote>

                <div className="flex justify-center">
                  <button
                    onClick={() => document.getElementById('bolumler')?.scrollIntoView({ behavior: 'smooth' })}
                    className="animate-bounce"
                  >
                    <span className="text-4xl text-text-muted hover:text-white transition-colors">↓</span>
                  </button>
                </div>

              </motion.div>
            </div>
            <motion.p
              className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              İnsan doğası, güncellenemeyen tek zafiyettir.<br />
              <span className="text-gray-400 text-base mt-2 block">
                Teknolojik kaleler yükselse de, rasyonel olmayan kararlar vermeye meyilli doğamız en büyük açıktır.
              </span>
            </motion.p>


          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm sm:max-w-lg mx-auto mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { num: "30", label: "Bölüm" },
              { num: "30", label: "Simülasyon" },
              { num: "∞", label: "Farkındalık" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors duration-300 shadow-xl shadow-black/20">
                <span className="block text-3xl font-bold text-blue-400 font-mono mb-1">{s.num}</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Author Section */}
      <section id="yazar" className="py-16 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <img
                src="/author.jpg"
                alt="Osman Can Çetlenbik"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Osman+Can&background=0D8ABC&color=fff&size=128";
                }}
              />
            </div>
            <div>
              <span className="text-xs font-mono text-accent-blue uppercase tracking-wider">Yazar</span>
              <h2 className="text-2xl font-bold text-text-primary mt-1">Osman Can Çetlenbik</h2>
              <p className="text-text-secondary mt-2 text-sm leading-relaxed">
                Akademisyen & Bilgisayar Mühendisi. İnsan doğasının siber güvenlik üzerindeki etkisini
                araştıran, sosyal mühendislik saldırılarını interaktif deneyimlerle öğreten bir eğitimci.
              </p>
            </div>
          </motion.div>

          {/* Önsöz */}
          <motion.div
            className="mt-10 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-mono text-accent-blue uppercase tracking-wider mb-3">📜 Önsöz</h3>
            <p className="text-text-secondary text-sm leading-relaxed italic">
              &ldquo;Teknolojik kaleler ne kadar yükselirse yükselsin, insan doğası rasyonel olmayan kararlar
              vermeye meyillidir. Bu kitap, siber saldırganların en güçlü silahının kod değil, psikoloji olduğunu
              gösterir. Her bölümde gerçek vakalardan yola çıkarak, manipülasyon tekniklerini deneyimlemenizi
              ve kendinizi korumanızı sağlayacak simülasyonlar sunuyoruz.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section id="bolumler" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-mono text-accent-blue uppercase tracking-[0.2em]">
              İnteraktif Bölümler
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mt-2">
              30 Farklı Saldırı Senaryosu
            </h2>
            <p className="text-text-muted mt-3 max-w-xl mx-auto text-sm">
              Her bölümde gerçek bir vaka incelenir ve sen karar verirsin. Doğru mu yaparsın, tuzağa mı düşersin?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {chapters.map((ch, i) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/bolum/${ch.slug}`}
                  className="glass-card block relative overflow-hidden group hover:bg-white/[0.05] transition-all duration-300 no-underline"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-white/5 text-2xl group-hover:scale-110 transition-transform duration-300">
                        {ch.icon}
                      </div>
                      <span className="font-mono text-xs text-text-muted tracking-widest opacity-50">
                        BÖLÜM {ch.id}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-blue transition-colors">
                      {ch.subtitle}
                    </h3>

                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                      {ch.case}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-medium text-accent-blue opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span>SİMÜLASYONA BAŞLA</span>
                      <span>→</span>
                    </div>
                  </div>

                  {/* Subtle top border accent */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Banner */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-white/10 bg-white/[0.02]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-4xl grayscale opacity-70">🔐</span>
            <div>
              <h3 className="text-lg font-bold text-text-primary">Verileriniz Güvende</h3>
              <p className="text-sm text-text-secondary mt-1">
                Bu platform tamamen istemci tarafında (client-side) çalışır. Hiçbir kişisel veri, klik
                veya simülasyon sonucu sunucuya gönderilmez, kaydedilmez veya izlenmez.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
