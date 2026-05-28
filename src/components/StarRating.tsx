import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (n: number) => void;
  size?: number;
  readOnly?: boolean;
  className?: string;
}

export function StarRating({ value, onChange, size = 44, readOnly, className }: StarRatingProps) {
  const [hover, setHover] = React.useState<number | null>(null);
  const display = hover ?? value;

  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)} role="radiogroup">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= display;
        return (
          <button
            key={n}
            type="button"
            disabled={readOnly}
            aria-label={`${n} stars`}
            aria-checked={value === n}
            role="radio"
            onMouseEnter={() => !readOnly && setHover(n)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onClick={() => !readOnly && onChange?.(n)}
            className={cn(
              "rounded-full p-1 transition-transform",
              !readOnly && "hover:scale-110 active:scale-95",
              readOnly && "cursor-default",
            )}
          >
            <Star
              style={{ width: size, height: size }}
              className={cn(
                "transition-colors",
                filled
                  ? "fill-[oklch(0.83_0.16_82)] stroke-[oklch(0.7_0.15_75)]"
                  : "fill-transparent stroke-muted-foreground/40",
              )}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}
