import Input from "./Input";
import Choice from "./Choice";

export default function Question({
    question,
    value,
    onAnswer
}: any) {
    return (
        <div className="">
            <h2 className="">{question.label}</h2>

            {question.type === "text" && (
                <input 
                    value={value}
                    onChange={(v) => onAnswer(question.key, v)}
                />
            )}

            {question.type === "choice" && (
                <Choice
                    options={question.options}
                    value={value}
                    onSelect={(v: string) => onAnswer(question.key, v)}
                />
            )}
        </div>
    )
}