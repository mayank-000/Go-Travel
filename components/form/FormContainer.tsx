"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import Questions from "./Question";

export default function FormContainer() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const next = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Final Answer:", answers);
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const canProceed = !!answers[question.key]?.trim();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          top: "80px",
          left: 0,
          right: 0,
          height: "2px",
          zIndex: 50,
          backgroundColor: "rgba(42,77,106,0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "var(--ochre)",
            transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div
          className="juno-container w-full"
          style={{ maxWidth: "680px", paddingTop: "7rem", paddingBottom: "5rem" }}
        >
          {/* Step label */}
          <span
            className="font-heading text-[9px] tracking-[0.4em] uppercase block mb-5"
            style={{ color: "var(--sage)" }}
          >
            Question {step + 1} of {questions.length}
          </span>

          <Questions
            question={question}
            value={answers[question.key]}
            onAnswer={handleAnswer}
          />

          {/* Navigation */}
          <div
            className="flex items-center justify-between"
            style={{
              marginTop: "3.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(42,77,106,0.08)",
            }}
          >
            <button
              onClick={back}
              className="font-heading text-[11px] tracking-[0.2em] uppercase flex items-center gap-2 transition-opacity duration-300 hover:opacity-50"
              style={{
                background: "none",
                border: "none",
                color: "rgba(61,61,61,0.5)",
                cursor: "pointer",
              }}
            >
              ← {step === 0 ? "Home" : "Back"}
            </button>

            <button
              onClick={next}
              disabled={!canProceed}
              className="font-heading text-[11px] tracking-[0.22em] uppercase px-8 py-4 transition-all duration-300"
              style={{
                backgroundColor: canProceed
                  ? "var(--navy)"
                  : "rgba(42,77,106,0.15)",
                color: canProceed
                  ? "var(--cream)"
                  : "rgba(42,77,106,0.35)",
                cursor: canProceed ? "pointer" : "not-allowed",
                border: "none",
              }}
            >
              {step === questions.length - 1 ? "Submit →" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}