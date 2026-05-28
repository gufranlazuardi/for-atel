"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import PetalRain from "./PetalRain";

import { useQuestionStore } from "@/lib/store";
import { questions } from "@/lib/questions";
import { toast } from "sonner";

export default function ResultPage() {
  const router = useRouter();

  const answers = useQuestionStore((s) => s.answers);
  const reset = useQuestionStore((s) => s.reset);

  const ref = useRef<HTMLDivElement>(null);
  const petalContainerRef = useRef<HTMLDivElement>(null);

  const hasSubmitted = useRef(false);

  // Transform answers
  const result = questions.map((question, index) => {
    const selectedIndex = answers[index];

    const selectedOption =
      selectedIndex !== undefined
        ? question.options[selectedIndex]
        : undefined;

    return {
      question: question.question,
      answer: selectedOption?.text,
      icon: selectedOption?.icon,
    };
  });

  // Romantic summary 😭
  const summary = `
  Atel ternyata suka ${result[0]?.answer?.toLowerCase()}
  dan tipe yang ${result[1]?.answer?.toLowerCase()} 🥹
  `;

  // Submit to backend
  useEffect(() => {
    if (hasSubmitted.current) return;

    const submitResult = async () => {
      try {
        await fetch("/api/questionnaire", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: result,
            summary,
          }),
        });

        hasSubmitted.current = true;
      } catch (error) {
        console.error(error);
      }
    };

    submitResult();
  }, []);

  // GSAP animation
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".result-emoji", {
        scale: 0,
        rotation: 20,
        duration: 0.6,
        ease: "back.out(2)",
      })
        .from(
          ".result-title",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".result-sub",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".result-item",
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.4,
          },
          "-=0.2"
        )
        .from(
          ".result-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2"
        )
        .from(
          ".result-note",
          {
            opacity: 0,
            duration: 0.4,
          },
          "-=0.1"
        );
    },
    { scope: ref }
  );

  const handleRestart = () => {
    sessionStorage.removeItem("atel-questionnaire-storage")
    // reset();
    router.push("/");
  };

  const handleStore = async () => {
    try {
      const body = {
        answers: result,
        summary,
      };

      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      toast.success("Data terkirim! Terima kasih, Atel!")

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Failed store result");
      }

      alert("Jawaban berhasil dikirim 😭💌");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-y-auto bg-cream-100"
    >
      <div
        ref={petalContainerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c85a3a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-auto px-8 py-16 flex flex-col items-center text-center">
        <div className="result-emoji text-6xl mb-6">💌</div>

        <h2 className="result-title font-serif text-3xl text-brown mb-3">
          Makasih, Atel!
        </h2>

        <p className="result-sub text-sm text-brown-light leading-relaxed mb-8">
          Ini cuma iseng aja yaaaa tellllllllll wakwkakawkwaa
          <br />
          Semoga UAS nya lancar, handstandnya makin kuat, cepet cepet s2 deh biar bisa gua kirimin karang bunga yang 10 meter itu
        </p>

        {/* Result Cards */}
        <div className="flex flex-col gap-3 mb-8">
          {result.map((item, i) => (
            <div
              key={i}
              className="result-item bg-white/70 backdrop-blur rounded-2xl p-4 border border-[#eadfd3] text-left"
            >
              <p className="text-[11px] uppercase tracking-wider text-brown-border mb-1">
                Pertanyaan {i + 1}
              </p>

              <p className="text-sm text-brown mb-2">
                {item.question}
              </p>

              <div className="flex items-center gap-2 text-terracotta text-sm font-medium">
                <span>{item.icon}</span>
                <span>{item.answer}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <p className="italic text-brown-light text-sm leading-relaxed mb-8">
          {summary}
        </p>


        <button
          onClick={handleRestart}
          className="result-cta bg-terracotta text-white rounded-full px-10 py-3.5 text-sm font-medium tracking-wide hover:bg-terracotta-dark transition-colors duration-200 active:scale-95"
        >
          Mulai Lagi ↺
        </button>


        <p className="result-note mt-6 text-[11px] text-brown-border">
          untuk Atel, dengan sepenuh hati ♡
        </p>
      </div>
    </div >
  );
}