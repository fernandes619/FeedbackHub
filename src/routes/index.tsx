import { createFileRoute, Link } from "@tanstack/react-router";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { Star, MessageSquare, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
            <Star className="h-4 w-4 fill-current" />
          </div>
          <span className="text-sm font-medium tracking-tight text-foreground">{t.app.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/login"
            className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {t.app.loginCta}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-16 text-center sm:pt-28">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.app.tagline}</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight text-foreground sm:text-6xl">
          {t.app.title}.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t.app.homeIntro}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            {t.app.homeCta}
          </Link>
        </div>

        <div className="mt-20 grid gap-6 text-left sm:grid-cols-3">
          <Feature
            icon={<Star className="h-4 w-4" />}
            title="5 estrelas → Google"
            desc="Avaliações altas viram reseñas públicas."
          />
          <Feature
            icon={<MessageSquare className="h-4 w-4" />}
            title="Crítica → Privado"
            desc="Notas baixas ficam só com o gerente."
          />
          <Feature
            icon={<BarChart3 className="h-4 w-4" />}
            title="Métricas claras"
            desc="Acompanhe média e tendências."
          />
        </div>
      </main>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground">
        {icon}
      </div>
      <h3 className="mt-3 text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}
