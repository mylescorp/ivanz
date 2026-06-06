import Image from "next/image";
import type { SiteImage } from "@/lib/data/images";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  image?: SiteImage;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  title,
  description,
  image,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy py-16 text-white md:py-20",
        className,
      )}
    >
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {children}
        <h1 className="font-heading text-4xl font-bold md:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-white/80">{description}</p>
        )}
      </div>
    </section>
  );
}
