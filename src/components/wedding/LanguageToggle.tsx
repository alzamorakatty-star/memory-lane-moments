import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanguageToggleProps {
  isSpanish: boolean;
  onToggle: () => void;
}

export default function LanguageToggle({ isSpanish, onToggle }: LanguageToggleProps) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="rounded-full bg-background/80 backdrop-blur-md shadow-paper font-ui text-xs tracking-wide gap-1.5 px-4"
      >
        <Languages size={14} strokeWidth={1.5} />
        {isSpanish ? "EN" : "ES"}
      </Button>
    </div>
  );
}
