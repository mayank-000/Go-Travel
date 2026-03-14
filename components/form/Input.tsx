export default function Input({ value, onChange }: any) {

    return (
        <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className=""
            placeholder="Type your answer..."
        />
    )
}