import watercolorFlower from "@/assets/watercolor-flower.png";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
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
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight">
          {subtitle}
        </h1>
        <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
          {title}
        </p>
      </div>
    </section>
  );
}
