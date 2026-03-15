import { useState, useMemo } from "react";
import { Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { providers } from "@/data/wedding-data";
import type { Translations } from "@/data/wedding-data";

interface ProvidersSectionProps {
  t: Translations;
}

export default function ProvidersSection({ t }: ProvidersSectionProps) {
  const [showProviders, setShowProviders] = useState(false);

  const groupedProviders = useMemo(() => {
    const map = new Map<string, { name: string; url: string }[]>();
    for (const item of providers) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push({ name: item.name, url: item.url });
    }
    return Array.from(map.entries());
  }, []);

  return (
    <section className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center">
        <Button
          onClick={() => setShowProviders((prev) => !prev)}
          variant="outline"
          className="font-display text-sm px-6 py-5 rounded-full shadow-paper transition-all duration-200 hover:-translate-y-px active:scale-95"
        >
          <Sparkles size={16} strokeWidth={1.5} className="mr-2" />
          {t.providersButton}
        </Button>
      </div>

      <AnimatePresence>
        {showProviders && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-12 space-y-8">
              <p className="font-body text-base text-muted-foreground text-center leading-relaxed">
                {t.providersIntro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {groupedProviders.map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <p className="font-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                      {category}
                    </p>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <a
                          key={item.name}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 font-body text-sm text-foreground hover:text-primary transition-colors group"
                        >
                          {item.name}
                          <ExternalLink size={12} strokeWidth={1.5} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
