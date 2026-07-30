"use client";

import { useEffect } from "react";

/**
 * useEscapeKey
 *
 * Jalankan `onEscape` saat tombol Escape ditekan, selama `active` bertahan
 * true — dipakai supaya modal/lightbox bisa ditutup pakai keyboard, bukan
 * cuma klik mouse/tap (penting untuk aksesibilitas: pengguna keyboard-only
 * dan sebagian besar screen reader mengandalkan Escape untuk menutup dialog).
 *
 * Sebelumnya cuma diterapkan di sebagian modal (Ekstrakurikuler,
 * PhotoGridWithLightbox) — diekstrak jadi hook supaya gampang dipasang
 * konsisten di semua modal, termasuk yang sebelumnya belum ada
 * (DetailModal, FasilitasSection).
 *
 * @param active  true = listener aktif (biasanya: modal sedang terbuka)
 * @param onEscape callback saat Escape ditekan
 */
export function useEscapeKey(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onEscape();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, onEscape]);
}
