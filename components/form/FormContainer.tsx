"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import Questions from "./Question";
import ProgressBar from "./ProgressBar";

export default function FormContainer() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[step];

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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[500px]">
        <ProgressBar step={step} total={questions.length} />
        <Questions
          question={question}
          value={answers[question.key]}
          onAnswer={handleAnswer}
        />
        <div className="flex justify-between mt-6">
          <button onClick={back}>Back</button>
          <button onClick={next}>
            {step === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}