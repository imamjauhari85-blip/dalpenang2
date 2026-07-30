import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useEscapeKey } from "./useEscapeKey";

function pressKey(key: string) {
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));
}

describe("useEscapeKey", () => {
  it("memanggil onEscape saat tombol Escape ditekan dan active=true", () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(true, onEscape));

    pressKey("Escape");
    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it("TIDAK memanggil onEscape kalau active=false (modal lagi tertutup)", () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(false, onEscape));

    pressKey("Escape");
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("TIDAK memanggil onEscape untuk tombol lain selain Escape", () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(true, onEscape));

    pressKey("Enter");
    pressKey("a");
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("berhenti mendengarkan setelah unmount (gak nyisa listener nyantol)", () => {
    const onEscape = vi.fn();
    const { unmount } = renderHook(() => useEscapeKey(true, onEscape));

    unmount();
    pressKey("Escape");
    expect(onEscape).not.toHaveBeenCalled();
  });

  it("dengarkan callback terbaru walau di-rerender dengan callback baru", () => {
    const onEscapeLama = vi.fn();
    const onEscapeBaru = vi.fn();
    const { rerender } = renderHook(({ cb }) => useEscapeKey(true, cb), {
      initialProps: { cb: onEscapeLama },
    });

    rerender({ cb: onEscapeBaru });
    pressKey("Escape");

    expect(onEscapeLama).not.toHaveBeenCalled();
    expect(onEscapeBaru).toHaveBeenCalledTimes(1);
  });
});
