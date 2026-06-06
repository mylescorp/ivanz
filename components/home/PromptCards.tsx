"use client";

import Link from "next/link";
import { promptCards } from "@/lib/data/services";

export function PromptCards() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {promptCards.map((card) => (
        <Link
          key={card.id}
          href={`/contact?service=${card.id}`}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition-all hover:border-gold/50 hover:bg-white/10"
        >
          <span className="mr-2">{card.emoji}</span>
          {card.label}
        </Link>
      ))}
    </div>
  );
}
