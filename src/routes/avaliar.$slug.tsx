import * as React from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { StarRating } from "@/components/StarRating";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type Restaurante = {
  id: string;
  nome: string;
  google_maps_url: string;
};

export const Route = createFileRoute("/avaliar/$slug")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("restaurantes")
      .select("id, nome, google_maps_url")
      .eq("slug", params.slug)
      .maybeSingle();
    if (error) throw error;
    if (!data) throw notFound();
    return { restaurante: data as Restaurante };
  },
  notFoundComponent: NotFoundView,
  component: RatePage,
});

function NotFoundView() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-end px-6 py-5">
        <LanguageSwitcher />
      </header>
      <main className="flex flex-1 items-center justify-center px-6 pb-16 text-center">
        <div className="max-w-sm">
          <h1 className="text-xl font-medium text-foreground">{t.rate.notFoundTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.rate.notFoundDesc}</p>
        </div>
      </main>
    </div>
  );
}

// Flow:
// "rate"      -> only stars visible
// "high"      -> 4-5 stars: thank-you + "Post on Google" button (review NOT yet saved)
// "low"      -> 1-3 stars: comment + tags + send feedback button
// "success"   -> low rating submitted, manager notified confirmation
type Step = "rate" | "high" | "low" | "success";

type CriterionKey = "food" | "service" | "cleanliness" | "value";
const CRITERIA: { key: CriterionKey; emoji: string }[] = [
  { key: "food", emoji: "🍽️" },
  { key: "service", emoji: "🛎️" },
  { key: "cleanliness", emoji: "✨" },
  { key: "value", emoji: "💰" },
];

function MiniStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = React.useState<number | null>(null);
  const display = hover ?? value;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChange(n)}
          className="p-0.5 transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            className={cn(
              "h-5 w-5 transition-colors",
              n <= display
                ? "fill-[oklch(0.83_0.16_82)] stroke-[oklch(0.7_0.15_75)]"
                : "fill-transparent stroke-muted-foreground/40",
            )}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

function RatePage() {
  const { restaurante } = Route.useLoaderData();
  const { t } = useI18n();
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [scores, setScores] = React.useState<Record<CriterionKey, number>>({
    food: 0,
    service: 0,
    cleanliness: 0,
    value: 0,
  });
  const [step, setStep] = React.useState<Step>("rate");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [highSaved, setHighSaved] = React.useState(false);

  const handleRate = async (n: number) => {
    setRating(n);
    setError(null);
    if (n >= 4) {
      setStep("high");
      if (!highSaved) {
        const { error: err } = await supabase.from("avaliacoes").insert({
          restaurante_id: restaurante.id,
          nota: n,
          comentario: null,
          tags: [],
        });
        if (!err) setHighSaved(true);
      }
    } else {
      setStep("low");
    }
  };

  const submitLow = async () => {
    if (rating < 1) return;
    setSubmitting(true);
    setError(null);
    const { error: err } = await supabase.from("avaliacoes").insert({
      restaurante_id: restaurante.id,
      nota: rating,
      comentario: comment.trim() || null,
      tags: [],
      score_comida: scores.food || null,
      score_servicio: scores.service || null,
      score_limpieza: scores.cleanliness || null,
      score_calidad_precio: scores.value || null,
    });
    setSubmitting(false);
    if (err) {
      setError(t.common.error);
      return;
    }
    setStep("success");
  };

  const setScore = (k: CriterionKey, n: number) =>
    setScores((prev) => ({ ...prev, [k]: n }));

  const criterionLabel = (k: CriterionKey) =>
    k === "food"
      ? t.rate.critFood
      : k === "service"
        ? t.rate.critService
        : k === "cleanliness"
          ? t.rate.critCleanliness
          : t.rate.critValue;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {restaurante.nome}
        </span>
        <LanguageSwitcher />
      </header>

      <main className="flex flex-1 items-start justify-center px-6 pb-16 pt-4 sm:items-center sm:pt-0">
        <div className="w-full max-w-md">
          {(step === "rate" || step === "high" || step === "low") && (
            <div className="text-center">
              <h1 className="text-2xl font-light tracking-tight text-foreground sm:text-3xl">
                {t.rate.headline}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">{t.rate.subline}</p>

              <div className="mt-10">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t.rate.starsLabel}
                </p>
                <StarRating value={rating} onChange={handleRate} className="mt-4" />
              </div>
            </div>
          )}

          {step === "high" && (
            <div className="mt-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.95_0.05_82)]">
                <Check className="h-7 w-7 text-[oklch(0.55_0.15_75)]" />
              </div>
              <h2 className="mt-6 text-lg font-medium text-foreground">
                {t.rate.highTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t.rate.highMessage}
              </p>
              <Button asChild className="mt-8 h-11 w-full">
                <a
                  href={restaurante.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.rate.postOnGoogle}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}

          {step === "low" && (
            <div className="mt-10">
              <h3 className="text-sm font-medium text-foreground">
                {t.rate.criteriaTitle}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{t.rate.criteriaHelp}</p>

              <div className="mt-5 space-y-3">
                {CRITERIA.map(({ key, emoji }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-4 py-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <span className="text-base leading-none">{emoji}</span>
                      <span>{criterionLabel(key)}</span>
                    </div>
                    <MiniStars value={scores[key]} onChange={(n) => setScore(key, n)} />
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-left">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="details">
                  {t.rate.detailsLabel}
                </label>
                <Textarea
                  id="details"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.rate.detailsPlaceholder}
                  rows={2}
                  maxLength={500}
                />
              </div>

              {error && <p className="mt-4 text-xs text-destructive">{error}</p>}

              <Button
                onClick={submitLow}
                disabled={submitting}
                className="mt-6 h-11 w-full"
              >
                {submitting ? t.common.submitting : t.rate.sendFeedback}
              </Button>
            </div>
          )}

          {step === "success" && (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[oklch(0.94_0.06_155)]">
                <Check className="h-8 w-8 text-[oklch(0.5_0.14_155)]" strokeWidth={2.5} />
              </div>
              <h2 className="mt-6 text-xl font-medium text-foreground">
                {t.rate.successTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t.rate.successMessage}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
