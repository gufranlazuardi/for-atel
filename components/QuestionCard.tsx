"use client";

import { useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Question } from "@/lib/questions";

interface QuestionCardProps {
  question: Question;
  stepIndex: number;
  totalSteps: number;
  selectedOption?: number;
  direction: "forward" | "back";
  onSelect: (optionIdx: number) => void;
}

export default function QuestionCard({
  question,
  stepIndex,
  totalSteps,
  selectedOption,
  direction,
  onSelect,
}: QuestionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fromX = direction === "forward" ? 60 : -60;

      // Card slide in
      gsap.fromTo(
        cardRef.current,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );

      // Stagger options — always ensure final state is visible
      const opts = cardRef.current?.querySelectorAll(".q-option-item");
      if (opts && opts.length > 0) {
        gsap.fromTo(
          opts,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.4,
            delay: 0.15,
            ease: "power2.out",
            // clearProps: "opacity,transform", // reset so CSS takes over
          }
        );
      }
    },
    { scope: cardRef, dependencies: [stepIndex] }
  );

  const handleSelect = useCallback(
    (idx: number) => {
      onSelect(idx);
      // Micro bounce on selected option
      const el = document.querySelector(`[data-option="${idx}"]`);
      if (el) {
        gsap.from(el, { scale: 0.96, duration: 0.2, ease: "back.out(2)" });
      }
    },
    [onSelect]
  );

  return (
    <div ref={cardRef} className="w-full">
      {/* Step counter */}
      <p className="text-[11px] text-terracotta uppercase tracking-[0.15em] mb-4 font-medium">
        {stepIndex + 1} / {totalSteps}
      </p>

      {/* Question */}
      <h2 className="font-serif text-[26px] leading-[1.35] text-brown mb-8">
        {question.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            data-option={i}
            onClick={() => handleSelect(i)}
            style={
              selectedOption === i
                ? { borderColor: "#c85a3a", backgroundColor: "#fff0eb", color: "#c85a3a" }
                : { borderColor: "#e8d5c4", backgroundColor: "#ffffff", color: "#5a3a2a" }
            }
            className="q-option-item w-full flex items-center gap-3 rounded-2xl px-5 py-4 text-left border transition-all duration-200 active:scale-[0.98] hover:translate-x-1"
          >
            <span
              style={{
                backgroundColor: selectedOption === i ? "rgba(200,90,58,0.1)" : "#f7ede0",
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
            >
              {opt.icon}
            </span>
            <span className="text-[15px] leading-snug font-normal">
              {opt.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
