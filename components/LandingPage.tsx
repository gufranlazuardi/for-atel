"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FLOWER_EMOJIS } from "@/lib/questions";

gsap.registerPlugin();

const FLOWER_POSITIONS = [
  { top: "10%", left: "6%", size: "32px" },
  { top: "15%", right: "8%", size: "28px" },
  { top: "55%", left: "3%", size: "30px" },
  { top: "70%", right: "5%", size: "26px" },
  { top: "35%", left: "1%", size: "24px" },
  { top: "42%", right: "2%", size: "28px" },
  { top: "80%", left: "18%", size: "26px" },
  { top: "6%", left: "38%", size: "22px" },
  { top: "83%", right: "20%", size: "24px" },
];

export default function LandingPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".landing-tagline", { opacity: 0, y: 10, duration: 0.5, delay: 0.1 });

      gsap.from(".landing-title", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".landing-sub", { opacity: 0, y: 10, duration: 0.5, delay: 0.6 });

      gsap.from(".landing-btn", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.8,
        ease: "back.out(1.5)",
        immediateRender: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const doorLeft = document.querySelector(".door-left") as HTMLElement;
    const doorRight = document.querySelector(".door-right") as HTMLElement;

    const tl = gsap.timeline();

    // Close doors
    tl.to(doorLeft, { scaleX: 1, duration: 0.5, ease: "power3.inOut" })
      .to(doorRight, { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, "<")
      .to({}, { duration: 0.2 })
      // Navigate
      .call(() => router.push("/questionnaire"))
      // Small pause then open doors on new page
      .to({}, { duration: 0.3 })
      .to(doorLeft, { scaleX: 0, duration: 0.6, ease: "power3.inOut" })
      .to(doorRight, { scaleX: 0, duration: 0.6, ease: "power3.inOut" }, "<");
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-cream-100"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #c85a3a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating flowers */}
      {FLOWER_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="flower-item absolute pointer-events-none select-none"
          style={{
            top: pos.top,
            left: "left" in pos ? pos.left : undefined,
            right: "right" in pos ? (pos as { right?: string }).right : undefined,
            fontSize: pos.size,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
          }}
        >
          {FLOWER_EMOJIS[i % FLOWER_EMOJIS.length]}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        <p className="landing-tagline text-xs text-brown-light uppercase tracking-[0.2em] mb-4">
          sebuah pertanyaan kecil
        </p>

        <h1 className="landing-title font-serif text-[52px] leading-tight text-brown mb-2">
          Hai,{" "}
          <span className="italic text-terracotta">Atel</span>{" "}
          🌸
        </h1>

        <p className="landing-sub text-sm text-brown-light mb-10">
          ada yang mau gua tanyain... azeeekk
        </p>

        <button
          onClick={handleEnter}
          className="landing-btn group relative inline-flex items-center gap-2 border border-terracotta text-terracotta rounded-full px-9 py-3.5 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:bg-terracotta hover:text-white active:scale-95"
        >
          <span>Buka</span>
          <span className="group-hover:rotate-90 transition-transform duration-300">✦</span>
        </button>
      </div>
    </div>
  );
}
