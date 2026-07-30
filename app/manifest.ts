import type { MetadataRoute } from "next";
import { getPengaturan, pengaturanValue } from "@/lib/data/pengaturan";

/**
 * Menghasilkan /manifest.webmanifest secara otomatis (fitur bawaan Next.js
 * App Router — sama seperti sitemap.ts & robots.ts).
 *
 * Fungsinya: begitu situs ini di-"Add to Home Screen" dari HP (Android
 * khususnya — Chrome), manifest inilah yang nentuin nama, ikon, dan warna
 * tema yang dipakai, bukan cuma favicon biasa.
 *
 * Ikon (icons/icon-192.png, icons/icon-512.png) di-generate dari Lambang
 * Kabupaten Sampang, sama seperti favicon.ico & apple-touch-icon.png —
 * lihat public/icons/.
 *
 * theme_color = teal-950 (#042f2e), warna dasar hero di seluruh situs,
 * supaya status bar HP & splash screen PWA senada dengan desain situs.
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const pengaturan = await getPengaturan();
  const namaSekolah = pengaturanValue(pengaturan, "nama_sekolah", "Website Sekolah");

  return {
    name: namaSekolah,
    // short_name dipakai sebagai label di bawah ikon home screen —
    // dibatasi ~12 karakter oleh Android supaya gak terpotong aneh.
    short_name: namaSekolah.length > 12 ? namaSekolah.slice(0, 12) : namaSekolah,
    description: pengaturanValue(
      pengaturan,
      "profil_singkat",
      "Website resmi sekolah."
    ),
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#042f2e",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
