"use client";

import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  total: number;
  current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-400 ease-out",
            i === current
              ? "w-5 bg-terracotta"
              : i < current
              ? "w-1.5 bg-terracotta-light"
              : "w-1.5 bg-brown-border"
          )}
        />
      ))}
    </div>
  );
}
