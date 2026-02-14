export default function Footer() {
    return (
        <footer className="border-t border-white/5 mt-32 py-16 bg-black/40 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="mb-3">
                            <div className="font-black text-2xl tracking-tighter leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
                                <span className="text-blue-500">TIKLA</span>
                                <span className="text-red-600">(MA)!</span>
                            </div>
                            <span className="block text-[10px] text-text-muted tracking-widest uppercase font-serif italic mt-1">
                                İNSAN ZİHNİNİ HACKLEME SANATI
                            </span>
                        </div>
                        <p className="text-sm text-text-muted leading-relaxed">
                            İnsan doğasının güncellenemeyen tek zafiyet olduğu gerçeğini interaktif simülasyonlarla deneyimleyin.
                        </p>
                    </div>

                    {/* Author */}
                    <div>
                        <h4 className="font-mono text-xs text-accent-blue uppercase tracking-wider mb-3">Yazar</h4>
                        <p className="text-sm text-text-secondary">Osman Can Çetlenbik</p>
                        <p className="text-xs text-text-muted">Akademisyen & Bilgisayar Mühendisi</p>
                    </div>

                    {/* Privacy */}
                    <div>
                        <h4 className="font-mono text-xs text-accent-blue uppercase tracking-wider mb-3">Gizlilik</h4>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-green-500/20 bg-green-500/5">
                            <span className="text-green-500 text-lg">🔒</span>
                            <span className="text-xs text-green-500">
                                Verileriniz hiçbir şekilde kaydedilmez. Tüm simülasyonlar cihazınızda çalışır.
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-8 pt-6 text-center">
                    <p className="text-xs text-text-muted font-mono">
                        © 2026 TIKLA(MA)! — İnsan Zihnini Hackleme Sanatı
                    </p>
                </div>
            </div>
        </footer>
    );
}
