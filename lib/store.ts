import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface QuestionStore {
  currentStep: number;
  answers: (number | undefined)[];
  direction: "forward" | "back";

  setAnswer: (step: number, optionIdx: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set) => ({
      currentStep: 0,
      answers: [],
      direction: "forward",

      setAnswer: (step, optionIdx) =>
        set((state) => {
          const answers = [...state.answers];
          answers[step] = optionIdx;

          return { answers };
        }),

      nextStep: () =>
        set((state) => ({
          currentStep: state.currentStep + 1,
          direction: "forward",
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(0, state.currentStep - 1),
          direction: "back",
        })),

      reset: () =>
        set({
          currentStep: 0,
          answers: [],
          direction: "forward",
        }),
    }),
    {
      name: "atel-questionnaire-storage",

      storage: createJSONStorage(() => sessionStorage),
    }
  )
);