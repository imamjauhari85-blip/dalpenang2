"use client";

interface CloudinaryLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Custom loader untuk next/image.
 *
 * Semua gambar publik di situs ini sudah dilayani lewat Cloudinary dan
 * sudah dioptimasi lewat helper cldThumb/cldWide/cldOptimized (lib/utils/
 * cloudinary.ts) — resize, crop, q_auto (kualitas otomatis), f_auto
 * (format otomatis webp/avif) sudah dipasang di URL sebelum sampai ke
 * komponen <Image>.
 *
 * Kalau loader ini TIDAK didaftarkan, next/image akan memproses ULANG
 * gambar yang sudah dioptimasi itu lewat Vercel Image Optimization API
 * (endpoint /_next/image) — dobel proses, dan paling penting: kuota
 * Image Optimization di paket Vercel gratis terbatas (1.000 sumber unik/
 * bulan). Dengan loader custom ini, next/image cukup dipakai untuk
 * manfaat non-optimasi-byte-nya saja: lazy-loading native, mencegah
 * layout shift (CLS) lewat width/height terkunci, dan atribut
 * priority/fetchPriority untuk gambar LCP (mis. Hero) — browser tetap
 * request LANGSUNG ke Cloudinary, bukan lewat server Next/Vercel.
 *
 * Untuk src non-Cloudinary (mis. placeholder placehold.co, fallback
 * ui-avatars.com) URL juga dikembalikan apa adanya — aman karena loader
 * custom tidak divalidasi lewat images.remotePatterns.
 */
export default function cloudinaryLoader({ src }: CloudinaryLoaderProps): string {
  return src;
}
