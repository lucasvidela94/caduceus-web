import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Question, AnswerResponse } from "#/queries/questions";

export type AnswerRecord = {
  selected: string;
  correct: boolean;
  correctAnswer: string;
  explanation: string | null;
};

export type QuizSession = {
  questions: Question[];
  currentIndex: number;
  answers: Record<string, AnswerRecord>;
  startedAt: string;
  completedAt: string | null;
};

type QuizStore = {
  session: QuizSession | null;
  startSession: (questions: Question[]) => void;
  addAnswer: (questionId: string, selected: string, answer: AnswerResponse) => void;
  goNext: () => void;
  completeSession: () => void;
  resetSession: () => void;
};

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      session: null,
      startSession: (questions) =>
        set({
          session: {
            questions,
            currentIndex: 0,
            answers: {},
            startedAt: new Date().toISOString(),
            completedAt: null,
          },
        }),
      addAnswer: (questionId, selected, answer) =>
        set((state) => {
          if (!state.session) return state;
          return {
            session: {
              ...state.session,
              answers: {
                ...state.session.answers,
                [questionId]: {
                  selected,
                  correct: answer.correct,
                  correctAnswer: answer.correct_answer,
                  explanation: answer.explanation,
                },
              },
            },
          };
        }),
      goNext: () =>
        set((state) => {
          if (!state.session) return state;
          return {
            session: {
              ...state.session,
              currentIndex: state.session.currentIndex + 1,
            },
          };
        }),
      completeSession: () =>
        set((state) => {
          if (!state.session) return state;
          return {
            session: {
              ...state.session,
              currentIndex: state.session.questions.length,
              completedAt: new Date().toISOString(),
            },
          };
        }),
      resetSession: () => set({ session: null }),
    }),
    { name: "caduceo-quiz" },
  ),
);
