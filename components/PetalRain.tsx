"use client";

import { useEffect } from "react";
import { FLOWER_EMOJIS } from "@/lib/questions";

interface PetalRainProps {
  container: HTMLDivElement | null;
}
export default function PetalRain({ container }: PetalRainProps) {
  useEffect(() => {
    if (!container) return;

    const petals: HTMLElement[] = [];

    const spawnPetal = (delay: number) => {
      setTimeout(() => {
        const el = document.createElement("div");

        el.className = "petal";

        el.textContent =
          FLOWER_EMOJIS[
          Math.floor(Math.random() * FLOWER_EMOJIS.length)
          ];

        el.style.left = `${Math.random() * 100}%`;

        el.style.top = "-40px";

        el.style.animationDuration = `${2 + Math.random() * 1.5
          }s`;

        el.style.transform = `rotate(${Math.random() * 360
          }deg)`;

        container.appendChild(el);

        petals.push(el);

        setTimeout(() => {
          el.remove();
        }, 4000);
      }, delay);
    };

    for (let i = 0; i < 14; i++) {
      spawnPetal(i * 100);
    }

    for (let i = 0; i < 8; i++) {
      spawnPetal(800 + i * 150);
    }

    return () => {
      petals.forEach((p) => p.remove());
    };
  }, [container]);

  return null;
}