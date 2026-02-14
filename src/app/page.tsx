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


            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black leading-none mb-4 tracking-tighter" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]">TIKLA</span>
              <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">(MA)!</span>
            </h1>
            <p className="text-lg sm:text-2xl text-zinc-400 font-serif italic tracking-widest mb-10">
              İNSAN ZİHNİNİ HACKLEME SANATI
            </p>

            <motion.p
              className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              İnsan doğası, güncellenemeyen tek zafiyettir.<br />
              <span className="text-text-muted text-base">
                Teknolojik kaleler yükselse de, rasyonel olmayan kararlar vermeye meyilli doğamız en büyük açıktır.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/bolum/otoriteye-itaat"
                className="px-8 py-4 bg-neon-blue/10 border border-neon-blue text-neon-blue rounded-xl font-semibold hover:bg-neon-blue/20 transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] no-underline pulse-ring">
                🚀 Simülasyonlara Başla
              </Link>
              <a href="#bolumler"
                className="px-8 py-4 bg-bg-card border border-border-color text-text-secondary rounded-xl font-semibold hover:border-neon-purple/50 hover:text-neon-purple transition-all no-underline">
                📖 Bölümleri İncele
              </a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { num: "25", label: "Bölüm" },
              { num: "25", label: "Simülasyon" },
              { num: "∞", label: "Farkındalık" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-xl border border-border-color bg-bg-card/50">
                <span className="block text-2xl font-bold text-neon-blue font-mono">{s.num}</span>
                <span className="text-xs text-text-muted">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-16 border-t border-b border-border-color" style={{ background: "rgba(18,18,26,0.5)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-800 shadow-xl">
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
              <span className="text-xs font-mono text-neon-blue uppercase tracking-wider">Yazar</span>
              <h2 className="text-2xl font-bold text-text-primary mt-1">Osman Can Çetlenbik</h2>
              <p className="text-text-secondary mt-2 text-sm leading-relaxed">
                Akademisyen & Bilgisayar Mühendisi. İnsan doğasının siber güvenlik üzerindeki etkisini
                araştıran, sosyal mühendislik saldırılarını interaktif deneyimlerle öğreten bir eğitimci.
              </p>
            </div>
          </motion.div>

          {/* Önsöz */}
          <motion.div
            className="mt-10 p-6 rounded-xl border border-border-color bg-bg-card/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-mono text-neon-purple uppercase tracking-wider mb-3">📜 Önsöz</h3>
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
            <span className="text-xs font-mono text-terminal-green uppercase tracking-[0.2em]">
              İnteraktif Bölümler
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-2">
              25 Farklı Saldırı Senaryosu
            </h2>
            <p className="text-text-muted mt-3 max-w-xl mx-auto text-sm">
              Her bölümde gerçek bir vaka incelenir ve sen karar verirsin. Doğru mu yaparsın, tuzağa mı düşersin?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {chapters.map((ch, i) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/bolum/${ch.slug}`}
                  className="block relative overflow-hidden rounded-xl bg-black border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 md:hover:-translate-y-2 group no-underline"
                >
                  {/* Glowing Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Card Content */}
                  <div className="relative p-6 z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-300">
                        {ch.icon}
                      </span>
                      <span className="text-xs font-black text-zinc-600 group-hover:text-white transition-colors border border-zinc-800 px-2 py-1 rounded">
                        #{ch.id.toString().padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-200 group-hover:text-blue-400 transition-colors mb-2 leading-tight">
                      {ch.subtitle}
                    </h3>

                    <p className="text-sm text-zinc-500 line-clamp-2 group-hover:text-zinc-400 transition-colors">
                      {ch.case}
                    </p>

                    <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-blue-500 transition-colors font-bold">
                        Simülasyonu Başlat
                      </span>
                      <span className="text-zinc-600 group-hover:text-red-500 transition-colors transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Neon Border Line */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Banner */}
      <section className="py-12 border-t border-border-color">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-success-green/20"
            style={{ background: "rgba(48, 209, 88, 0.03)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-4xl">🔐</span>
            <div>
              <h3 className="text-lg font-bold text-success-green">Verileriniz Güvende</h3>
              <p className="text-sm text-text-muted mt-1">
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
