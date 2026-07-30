import { describe, it, expect } from "vitest";
import { cldTransform, cldThumb, cldWide, cldOptimized } from "./cloudinary";

const SAMPLE_URL =
  "https://res.cloudinary.com/dsgkp7jlg/image/upload/v1699999999/sekolah/logo.jpg";

describe("cldTransform", () => {
  it("menyisipkan segmen transformasi tepat setelah /upload/", () => {
    const result = cldTransform(SAMPLE_URL, "w_400,h_400,c_fill");
    expect(result).toBe(
      "https://res.cloudinary.com/dsgkp7jlg/image/upload/w_400,h_400,c_fill/v1699999999/sekolah/logo.jpg"
    );
  });

  it("mengembalikan string kosong kalau url null", () => {
    expect(cldTransform(null, "w_400")).toBe("");
  });

  it("mengembalikan string kosong kalau url undefined", () => {
    expect(cldTransform(undefined, "w_400")).toBe("");
  });

  it("mengembalikan string kosong kalau url adalah string kosong", () => {
    expect(cldTransform("", "w_400")).toBe("");
  });

  it("mengembalikan url apa adanya kalau BUKAN url Cloudinary (mis. path lokal /assets/...)", () => {
    const localPath = "/assets/img/logo-placeholder.png";
    expect(cldTransform(localPath, "w_400")).toBe(localPath);
  });

  it("mengembalikan url apa adanya kalau domain cloudinary tapi bukan format /upload/ yang dikenal", () => {
    const weirdUrl = "https://res.cloudinary.com/dsgkp7jlg/raw/authenticated/xxx";
    expect(cldTransform(weirdUrl, "w_400")).toBe(weirdUrl);
  });
});

describe("preset cldThumb / cldWide / cldOptimized", () => {
  it("cldThumb menghasilkan transformasi persegi dengan crop fill", () => {
    const result = cldThumb(SAMPLE_URL, 200);
    expect(result).toContain("/upload/w_200,h_200,c_fill,g_auto,q_auto,f_auto/");
  });

  it("cldThumb pakai default 400px kalau size gak dikasih", () => {
    const result = cldThumb(SAMPLE_URL);
    expect(result).toContain("w_400,h_400");
  });

  it("cldWide menghasilkan transformasi lebar tanpa tinggi tetap", () => {
    const result = cldWide(SAMPLE_URL, 1200);
    expect(result).toContain("/upload/w_1200,c_fill,g_auto,q_auto,f_auto/");
  });

  it("cldOptimized cuma nambah q_auto,f_auto tanpa resize", () => {
    const result = cldOptimized(SAMPLE_URL);
    expect(result).toContain("/upload/q_auto,f_auto/");
    expect(result).not.toMatch(/w_\d/); // gak ada resize paksa
  });

  it("semua preset tetap aman (gak error) kalau dikasih url kosong", () => {
    expect(cldThumb(null)).toBe("");
    expect(cldWide(undefined)).toBe("");
    expect(cldOptimized("")).toBe("");
  });
});
