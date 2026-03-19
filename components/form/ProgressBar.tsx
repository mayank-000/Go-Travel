interface ProgressBarProps {
  step: number;
  total: number;
}

export default function ProgressBar({ step, total }: ProgressBarProps) {
  const percent = ((step + 1) / total) * 100;

  return (
    <div>
      <p className="mb-2">
        Question {step + 1} of {total}
      </p>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-blue-500 rounded"
          style={{ width: percent + "%" }}
        />
      </div>
    </div>
  );
}