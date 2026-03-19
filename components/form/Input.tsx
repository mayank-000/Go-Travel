interface InputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <div style={{ position: "relative", marginTop: "1.5rem" }}>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Type your answer…"}
        className="font-heading w-full bg-transparent outline-none"
        style={{
          fontSize:     "clamp(1rem, 2.2vw, 1.3rem)",
          fontWeight:   300,
          color:        "var(--charcoal)",
          border:       "none",
          borderBottom: "1.5px solid rgba(42,77,106,0.25)",
          paddingBottom: "14px",
          caretColor:   "var(--ochre)",
          transition:   "border-color 0.3s ease",
          width:        "100%",
        }}
        onFocus={(e) =>
          ((e.target as HTMLInputElement).style.borderBottomColor =
            "var(--ochre)")
        }
        onBlur={(e) =>
          ((e.target as HTMLInputElement).style.borderBottomColor =
            "rgba(42,77,106,0.25)")
        }
      />
    </div>
  );
}