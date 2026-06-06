import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <h2
        className={cn(
          "font-heading text-3xl font-bold tracking-tight md:text-4xl",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-white/80" : "text-muted",
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 rounded-full bg-gold",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}
