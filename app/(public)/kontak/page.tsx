import ContactHero from "@/components/kontak/ContactHero";
import ContactInfoCards from "@/components/kontak/ContactInfoCards";
import ContactForm from "@/components/kontak/ContactForm";
import ContactMap from "@/components/kontak/ContactMap";

// Anda juga bisa mengimpor data ini secara dinamis dari lib/data/pengaturan.ts
const SETTINGS = {
  namaSekolah: "UPTD SDN TAMANSAREH 2",
  alamat: "Jl. Raya Tamansareh, Kabupaten Sampang, Jawa Timur 69251",
  telepon: "081234567890",
  email: "sdntamansareh2@gmail.com",
  jamOperasional: "Senin - Sabtu: 07:00 - 13:00",
  koordinatMap: "-7.139964092838838, 113.2743876634702",
  linkGmaps: "https://maps.app.goo.gl/5B8Sc1zVLtpZh2pA8",
  youtube: "https://youtube.com/@uptdsdntamansareh2",
};

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <ContactHero namaSekolah={SETTINGS.namaSekolah} />

      {/* 2. Main Content Section (Info & Form) */}
      <section id="kontak-section" className="py-12 sm:py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-block">
                🤝 Layanan Informasi
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-2 sm:mb-4">
              Mari Terhubung
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-4" />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Kolom Kiri: Kartu Informasi */}
            <div className="lg:col-span-5">
              <ContactInfoCards
                alamat={SETTINGS.alamat}
                telepon={SETTINGS.telepon}
                email={SETTINGS.email}
                jamOperasional={SETTINGS.jamOperasional}
              />
            </div>

            {/* Kolom Kanan: Formulir Pesan */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Google Maps Section */}
      <ContactMap
        koordinatMap={SETTINGS.koordinatMap}
        alamat={SETTINGS.alamat}
        linkGmaps={SETTINGS.linkGmaps}
      />

    </main>
  );
}