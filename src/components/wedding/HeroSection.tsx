import { useState, useEffect } from "react";
import watercolorFlower from "@/assets/watercolor-flower.png";
import type { Translations } from "@/data/wedding-data";
import { WEDDING_DATE, getElapsedTime } from "@/data/wedding-data";

interface HeroSectionProps {
  t: Translations;
}

export default function HeroSection({ t }: HeroSectionProps) {
  const [elapsed, setElapsed] = useState(getElapsedTime(WEDDING_DATE));

  useEffect(() => {
    const interval = setInterval(() => setElapsed(getElapsedTime(WEDDING_DATE)), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-6">
      <img
        src={watercolorFlower}
        alt=""
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-[80vw] opacity-30 mix-blend-multiply pointer-events-none select-none"
      />
      <div className="relative z-10 text-center space-y-6">
        <p className="font-ui text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Katty Alzamora & Christian Heins
        </p>

        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight">
            {t.title}
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Countdown */}
        <div className="pt-4 space-y-2">
          <p className="font-ui text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            {t.counterLabel}
          </p>
          <div className="flex items-center justify-center gap-6">
            <CounterUnit value={elapsed.days} label={t.days} />
            <CounterUnit value={elapsed.hours} label={t.hours} />
            <CounterUnit value={elapsed.minutes} label={t.minutes} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CounterUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-3xl md:text-4xl font-medium text-foreground tabular-nums">
        {value}
      </p>
      <p className="font-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
