import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n, type Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className={className}>
      <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
        <SelectTrigger className="h-8 w-auto gap-2 border-none bg-transparent px-2 text-xs text-muted-foreground shadow-none hover:text-foreground focus:ring-0">
          <Globe className="h-3.5 w-3.5" />
          <SelectValue aria-label={t.language.label} />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectItem value="pt">PT</SelectItem>
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="es">ES</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
