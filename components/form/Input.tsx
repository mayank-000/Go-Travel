interface InputProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function Input({ value, onChange }: InputProps) {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className=""
      placeholder="Type your answer..."
    />
  );
}