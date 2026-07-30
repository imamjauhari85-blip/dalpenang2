import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    // Cuma jalankan file test kita sendiri (hooks/lib), BUKAN scan seluruh
    // project termasuk node_modules atau .next — supaya cepat & gak
    // nyasar ke file yang bukan test.
    include: ["hooks/**/*.test.{ts,tsx}", "lib/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      // Samakan dengan alias "@/*" di tsconfig.json supaya import di file
      // test bisa pakai path yang sama seperti di kode aplikasi.
      "@": path.resolve(__dirname, "."),
    },
  },
});
