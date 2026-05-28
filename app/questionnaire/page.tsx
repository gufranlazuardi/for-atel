"use client";

import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { questions } from "@/lib/questions";
import { useQuestionStore } from "@/lib/store";
import ProgressDots from "@/components/ProgressDots";
import QuestionCard from "@/components/QuestionCard";

export default function QuestionnairePage() {
  const router = useRouter();
  const bodyRef = useRef<HTMLDivElement>(null);
  const isAnim = useRef(false);

  const { currentStep, answers, direction, setAnswer, nextStep, prevStep } =
    useQuestionStore();

  const currentAnswer = answers[currentStep];
  const hasAnswer = currentAnswer !== undefined;
  const isLastQuestion = currentStep === questions.length - 1;

  // Slide out current card, then navigate
  const animateOut = useCallback(
    (dir: "left" | "right", onComplete: () => void) => {
      if (isAnim.current) return;
      isAnim.current = true;
      const card = bodyRef.current?.querySelector(".q-card-wrap");
      gsap.to(card, {
        x: dir === "left" ? -60 : 60,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          isAnim.current = false;
          onComplete();
        },
      });
    },
    []
  );

  const handleNext = useCallback(() => {
    if (!hasAnswer) return;
    if (isLastQuestion) {
      animateOut("left", () => router.push("/result"));
    } else {
      animateOut("left", () => nextStep());
    }
  }, [hasAnswer, isLastQuestion, animateOut, nextStep, router]);

  const handleBack = useCallback(() => {
    if (currentStep === 0) return;
    animateOut("right", () => prevStep());
  }, [currentStep, animateOut, prevStep]);

  useGSAP(() => {
    gsap.set(".q-card-wrap", {
      opacity: 1,
      x: 0,
    });
  }, [currentStep]);

  return (
    <div className="relative w-full h-screen flex flex-col bg-cream-100">
      {/* Header */}
      <div className="flex items-center justify-between px-7 pt-10 pb-2 flex-shrink-0">
        <span className="font-serif italic text-terracotta text-base">
          untuk Atel ♡
        </span>
        <ProgressDots total={questions.length} current={currentStep} />
      </div>

      {/* Question body */}
      <div
        ref={bodyRef}
        className="flex-1 flex flex-col justify-center px-7 overflow-hidden"
      >
        <div className="q-card-wrap">
          <QuestionCard
            key={currentStep}
            question={questions[currentStep]}
            stepIndex={currentStep}
            totalSteps={questions.length}
            selectedOption={currentAnswer}
            direction={direction}
            onSelect={(idx) => setAnswer(currentStep, idx)}
          />
        </div>
      </div>

      {/* Footer navigation */}
      <div className="flex items-center justify-between px-7 pb-12 pt-4 flex-shrink-0">
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="text-brown-light text-sm font-normal hover:text-brown transition-colors duration-200 py-2"
          >
            ← Balik
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={handleNext}
          disabled={!hasAnswer}
          className="flex items-center gap-2 bg-terracotta text-white rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 hover:bg-terracotta-dark active:scale-95 disabled:bg-brown-border disabled:cursor-not-allowed"
        >
          {isLastQuestion ? "Selesai 🎉" : "Lanjut →"}
        </button>
      </div>
    </div>
  );
}
