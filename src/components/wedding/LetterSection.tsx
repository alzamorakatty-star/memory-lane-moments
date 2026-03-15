import type { Translations } from "@/data/wedding-data";

interface LetterSectionProps {
  t: Translations;
}

export default function LetterSection({ t }: LetterSectionProps) {
  return (
    <section className="max-w-2xl mx-auto px-6 py-24 space-y-8">
      {t.thanksMessage.map((paragraph, idx) => (
        <p
          key={idx}
          className="font-body text-lg leading-[1.7] text-foreground"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {paragraph}
        </p>
      ))}

      <div className="pt-8 space-y-1">
        <p className="font-display text-lg font-medium text-foreground">{t.withLove}</p>
        <p className="font-display text-xl font-medium text-foreground">{t.signatures}</p>
      </div>
    </section>
  );
}
