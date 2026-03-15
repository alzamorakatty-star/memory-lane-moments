import { useState } from "react";
import { translations } from "@/data/wedding-data";
import LanguageToggle from "@/components/wedding/LanguageToggle";
import HeroSection from "@/components/wedding/HeroSection";
import LetterSection from "@/components/wedding/LetterSection";
import GallerySection from "@/components/wedding/GallerySection";
import ProvidersSection from "@/components/wedding/ProvidersSection";

export default function Index() {
  const [isSpanish, setIsSpanish] = useState(true);
  const t = isSpanish ? translations.es : translations.en;

  return (
    <div className="min-h-screen bg-background">
      <LanguageToggle isSpanish={isSpanish} onToggle={() => setIsSpanish(!isSpanish)} />
      
      <HeroSection t={t} />
      
      <div className="w-12 h-px bg-border mx-auto" />
      
      <LetterSection t={t} />
      
      <GallerySection t={t} />
      
      <ProvidersSection t={t} />
      
      {/* Footer */}
      <footer className="py-16 text-center">
        <p className="font-display text-2xl font-medium text-foreground">{t.footerSignature}</p>
      </footer>
    </div>
  );
}
