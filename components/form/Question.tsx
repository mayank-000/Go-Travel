import Choice from "./Choice";
import { type Question as QuestionItem } from "@/lib/questions";

interface QuestionProps {
  question: QuestionItem;
  value: string | undefined;
  onAnswer: (key: string, value: string) => void;
}

export default function Question({ question, value, onAnswer }: QuestionProps) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium">{question.label}</h2>

      {question.type === "text" && (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onAnswer(question.key, e.target.value)}
          className="mt-3 w-full border-b border-gray-400 bg-transparent outline-none py-2 text-base"
          placeholder={question.placeholder}
        />
      )}

      {question.type === "choice" && question.options && (
        <Choice
          options={question.options}
          value={value}
          onSelect={(v: string) => onAnswer(question.key, v)}
        />
      )}
    </div>
  );
}