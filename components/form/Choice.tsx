interface ChoiceProps {
  options: string[];
  value: string | undefined;
  onSelect: (value: string) => void;
}

export default function Choice({ options, value, onSelect }: ChoiceProps) {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`border p-3 rounded text-left transition-colors duration-200 ${
            value === opt
              ? "bg-blue-100 border-blue-400"
              : "border-gray-300 hover:border-blue-300"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}