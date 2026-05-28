import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useI18n, tagLabel, type TagKey } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, LogOut, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Restaurante = {
  id: string;
  nome: string;
  slug: string;
  google_maps_url: string;
};

type Avaliacao = {
  id: string;
  nota: number;
  comentario: string | null;
  tags: string[];
  created_at: string;
  score_comida: number | null;
  score_servicio: number | null;
  score_limpieza: number | null;
  score_calidad_precio: number | null;
};

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const [session, setSession] = React.useState<Session | null>(null);
  const [authReady, setAuthReady] = React.useState(false);
  const [restaurante, setRestaurante] = React.useState<Restaurante | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [avaliacoes, setAvaliacoes] = React.useState<Avaliacao[]>([]);
  const [period, setPeriod] = React.useState<"7" | "30" | "90" | "all">("30");
  const [ratingFilter, setRatingFilter] = React.useState<"all" | "1" | "2" | "3" | "4" | "5">(
    "all",
  );
  const [copied, setCopied] = React.useState(false);

  // Auth bootstrap
  React.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setAuthReady(true);
      if (!s) navigate({ to: "/login" });
    });
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setAuthReady(true);
      if (!s) navigate({ to: "/login" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  // Load restaurante + avaliacoes
  React.useEffect(() => {
    if (!session) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data: rest } = await supabase
        .from("restaurantes")
        .select("id, nome, slug, google_maps_url")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (cancelled) return;
      if (!rest) {
        setRestaurante(null);
        setLoading(false);
        return;
      }
      setRestaurante(rest as Restaurante);
      const { data: avs } = await supabase
        .from("avaliacoes")
        .select(
          "id, nota, comentario, tags, created_at, score_comida, score_servicio, score_limpieza, score_calidad_precio",
        )
        .eq("restaurante_id", rest.id)
        .order("created_at", { ascending: false });
      if (cancelled) return;
      setAvaliacoes((avs ?? []) as Avaliacao[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const filtered = React.useMemo(() => {
    const now = Date.now();
    const days = period === "all" ? null : Number(period);
    return avaliacoes.filter((a) => {
      if (days != null) {
        const ageDays = (now - new Date(a.created_at).getTime()) / 86400000;
        if (ageDays > days) return false;
      }
      if (ratingFilter !== "all" && a.nota !== Number(ratingFilter)) return false;
      return true;
    });
  }, [avaliacoes, period, ratingFilter]);

  const total = filtered.length;
  const avg = total > 0 ? filtered.reduce((s, a) => s + a.nota, 0) / total : 0;
  const positives = filtered.filter((a) => a.nota >= 4);
  const negatives = filtered.filter((a) => a.nota <= 3);
  const positivePct = total > 0 ? Math.round((positives.length / total) * 100) : 0;
  const negativePct = total > 0 ? Math.round((negatives.length / total) * 100) : 0;

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const publicUrl = restaurante
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/avaliar/${restaurante.slug}`
    : "";

  const copyLink = async () => {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!authReady || (session && loading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">{t.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
              <Star className="h-4 w-4 fill-current" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {t.dash.title}
              </p>
              <p className="text-sm font-medium text-foreground">
                {restaurante?.nome ?? t.app.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="gap-1.5 text-xs text-muted-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              {t.auth.signOut}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {!restaurante ? (
          <div className="rounded-xl border border-border/60 bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">{t.dash.noRestaurant}</p>
          </div>
        ) : (
          <>
            {/* Public link */}
            <div className="mb-6 rounded-xl border border-border/60 bg-card p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {t.dash.publicLink}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <code className="flex-1 truncate rounded-md bg-muted px-3 py-2 font-mono text-xs text-foreground">
                  {publicUrl}
                </code>
                <Button variant="outline" size="sm" onClick={copyLink} className="gap-1.5">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? t.dash.copied : t.dash.copyLink}
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Select value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
                <SelectTrigger className="h-9 w-auto gap-2">
                  <span className="text-xs text-muted-foreground">{t.dash.filterPeriod}:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">{t.dash.period7}</SelectItem>
                  <SelectItem value="30">{t.dash.period30}</SelectItem>
                  <SelectItem value="90">{t.dash.period90}</SelectItem>
                  <SelectItem value="all">{t.dash.periodAll}</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={ratingFilter}
                onValueChange={(v) => setRatingFilter(v as typeof ratingFilter)}
              >
                <SelectTrigger className="h-9 w-auto gap-2">
                  <span className="text-xs text-muted-foreground">{t.dash.filterRating}:</span>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.dash.ratingAll}</SelectItem>
                  <SelectItem value="5">5 ★</SelectItem>
                  <SelectItem value="4">4 ★</SelectItem>
                  <SelectItem value="3">3 ★</SelectItem>
                  <SelectItem value="2">2 ★</SelectItem>
                  <SelectItem value="1">1 ★</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Metrics */}
            <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric label={t.dash.metricTotal} value={total.toString()} />
              <Metric
                label={t.dash.metricAverage}
                value={total > 0 ? `${avg.toFixed(1)} ★` : "—"}
              />
              <Metric
                label={t.dash.metricPositive}
                value={`${positives.length}`}
                hint={`${positivePct}%`}
              />
              <Metric
                label={t.dash.metricNegative}
                value={`${negatives.length}`}
                hint={`${negativePct}%`}
                tone="warn"
              />
            </div>

            {/* Improvement Wall */}
            <section className="mb-10">
              <h2 className="mb-3 text-sm font-medium text-foreground">
                {t.dash.improvementWall}{" "}
                <span className="ml-1 text-xs text-muted-foreground">({negatives.length})</span>
              </h2>
              {negatives.length === 0 ? (
                <EmptyCard text={t.dash.improvementEmpty} />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {negatives.map((a) => (
                    <ReviewCard key={a.id} review={a} locale={locale} highlight />
                  ))}
                </div>
              )}
            </section>

            {/* Positive */}
            <section>
              <h2 className="mb-3 text-sm font-medium text-foreground">
                {t.dash.recent}{" "}
                <span className="ml-1 text-xs text-muted-foreground">({positives.length})</span>
              </h2>
              {positives.length === 0 ? (
                <EmptyCard text={t.dash.recentEmpty} />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {positives.map((a) => (
                    <ReviewCard key={a.id} review={a} locale={locale} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function Metric({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "warn";
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span
          className={cn(
            "text-2xl font-light tracking-tight",
            tone === "warn" ? "text-[oklch(0.55_0.18_30)]" : "text-foreground",
          )}
        >
          {value}
        </span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}

function EmptyCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border/70 bg-background p-6 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function ReviewCard({
  review,
  locale,
  highlight,
}: {
  review: Avaliacao;
  locale: string;
  highlight?: boolean;
}) {
  const { t } = useI18n();
  const date = new Date(review.created_at).toLocaleDateString(
    locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US",
    { day: "2-digit", month: "short", year: "numeric" },
  );
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-4 transition-colors",
        highlight
          ? "border-[oklch(0.85_0.08_30)] bg-[oklch(0.985_0.015_30)]"
          : "border-border/60",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3.5 w-3.5",
                i < review.nota
                  ? "fill-[oklch(0.83_0.16_82)] stroke-[oklch(0.7_0.15_75)]"
                  : "fill-transparent stroke-muted-foreground/40",
              )}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <span className="text-[11px] text-muted-foreground">{date}</span>
      </div>
      {review.comentario && (
        <p className="mt-3 text-sm leading-relaxed text-foreground">{review.comentario}</p>
      )}
      {highlight && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { label: `🍽️ ${t.rate.critFood}`, value: review.score_comida },
            { label: `🛎️ ${t.rate.critService}`, value: review.score_servicio },
            { label: `✨ ${t.rate.critCleanliness}`, value: review.score_limpieza },
            { label: `💰 ${t.rate.critValue}`, value: review.score_calidad_precio },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-md border border-border/60 bg-background px-2.5 py-1.5"
            >
              <p className="truncate text-[10px] font-medium text-muted-foreground">
                {c.label}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      c.value && c.value <= 2
                        ? "bg-[oklch(0.6_0.18_30)]"
                        : c.value && c.value === 3
                          ? "bg-[oklch(0.75_0.15_70)]"
                          : "bg-[oklch(0.65_0.15_150)]",
                    )}
                    style={{ width: `${((c.value ?? 0) / 5) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-[10px] font-semibold tabular-nums text-foreground">
                  {c.value ?? "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {review.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
            >
              {tagLabel(t, tag as TagKey)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
