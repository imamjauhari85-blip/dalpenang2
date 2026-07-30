import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useCountUp } from "./useCountUp";

/**
 * jsdom belum mengimplementasi IntersectionObserver secara native, jadi
 * kita bikin mock sederhana yang bisa dipicu manual di test — cukup
 * menyimpan callback-nya, lalu kita panggil sendiri dengan
 * isIntersecting: true/false sesuai skenario yang mau ditest.
 */
class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IntersectionObserverCallback;
  observedElements: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observedElements.push(el);
  }
  unobserve() {}
  disconnect() {}

  trigger(isIntersecting: boolean) {
    this.callback(
      this.observedElements.map(
        (target) => ({ isIntersecting, target }) as IntersectionObserverEntry
      ),
      this as unknown as IntersectionObserver
    );
  }
}

function TestComponent({ target, duration }: { target: number; duration?: number }) {
  const { count, ref } = useCountUp<HTMLDivElement>(target, { duration });
  return <div ref={ref} data-testid="counter">{count}</div>;
}

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("useCountUp", () => {
  it("mulai dari 0 sebelum elemen masuk viewport", () => {
    render(<TestComponent target={100} />);
    expect(screen.getByTestId("counter").textContent).toBe("0");
  });

  it("menghitung naik sampai ke angka target begitu elemen masuk viewport", () => {
    render(<TestComponent target={100} duration={1000} />);
    const observer = MockIntersectionObserver.instances[0];

    act(() => {
      observer.trigger(true);
      vi.advanceTimersByTime(1000 + 50); // + buffer, karena interval 16ms gak selalu pas habis tepat di angka duration
    });

    expect(screen.getByTestId("counter").textContent).toBe("100");
  });

  it("gak mengulang animasi kalau intersection ke-trigger lagi (cuma sekali)", () => {
    render(<TestComponent target={50} duration={500} />);
    const observer = MockIntersectionObserver.instances[0];

    act(() => {
      observer.trigger(true);
      vi.advanceTimersByTime(500 + 50);
    });
    expect(screen.getByTestId("counter").textContent).toBe("50");

    // Trigger lagi (misal: elemen keluar-masuk viewport lagi) — seharusnya
    // gak reset ke 0 atau ngulang animasi.
    act(() => {
      observer.trigger(false);
      observer.trigger(true);
    });
    expect(screen.getByTestId("counter").textContent).toBe("50");
  });

  it("langsung 0 tanpa animasi kalau target = 0", () => {
render(<TestComponent target={0} duration={1000} />);
const observer = MockIntersectionObserver.instances[0];

act(() => {
observer.trigger(true);
vi.advanceTimersByTime(1000);
});

expect(screen.getByTestId("counter").textContent).toBe("0");
});
});
