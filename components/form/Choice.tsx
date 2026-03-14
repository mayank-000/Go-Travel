import { button } from "framer-motion/client";

export default function Choice({
    options, 
    value,
    onSelect
}: any) {

    return (
        <div className="">
            {options.map((opt: string) => (
                <button 
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className={`border p-3 rounded text-left ${value === opt ? "bg-blue-200" : ""}`}
                >{opt}</button>
            ))}
        </div>
    )
}