import { describe, it, expect, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLockBodyScroll } from "./useLockBodyScroll";

describe("useLockBodyScroll", () => {
  afterEach(() => {
    // Bersihkan efek samping ke document.body antar test
    document.body.style.overflow = "";
  });

  it("mengunci scroll body (overflow: hidden) saat locked=true", () => {
    renderHook(() => useLockBodyScroll(true));
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("TIDAK mengunci scroll body saat locked=false", () => {
    renderHook(() => useLockBodyScroll(false));
    expect(document.body.style.overflow).toBe("");
  });

  it("mengembalikan scroll body seperti semula saat locked berubah dari true ke false", () => {
    const { rerender } = renderHook(({ locked }) => useLockBodyScroll(locked), {
      initialProps: { locked: true },
    });
    expect(document.body.style.overflow).toBe("hidden");

    rerender({ locked: false });
    expect(document.body.style.overflow).toBe("");
  });

  it("mengembalikan scroll body saat komponen unmount (modal ditutup lewat navigasi)", () => {
    const { unmount } = renderHook(() => useLockBodyScroll(true));
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
