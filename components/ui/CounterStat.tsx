"use client";

import { useEffect, useRef, useState } from "react";

type CounterStatProps = {
  value: number;
  suffix?: string;
  label: string;
};

export function CounterStat({ value, suffix = "", label }: CounterStatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-bold text-max-black md:text-5xl">
        {count}
        <span className="text-max-base">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-max-gray">{label}</p>
    </div>
  );
}
