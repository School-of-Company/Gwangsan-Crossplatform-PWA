import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const ProgressBar = ({ value, onChange, min = 0, max = 100, step = 1 }: ProgressBarProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setLocalValue(newValue);
    onChange(newValue);
  };

  const percentage = ((localValue - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <span className="text-label text-black">밝기</span>
      <div className="relative mt-2 flex h-12 items-center">
        <div className="relative h-[6px] w-full rounded bg-[#F1F5F9]">
          <div
            className="absolute left-0 top-0 h-full rounded bg-sub2-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue}
          onChange={handleChange}
          className="absolute h-12 w-full cursor-pointer opacity-0"
          style={{ zIndex: 1 }}
        />
        <div
          className="pointer-events-none absolute h-6 w-6 rounded-full border-2 border-sub2-500 bg-white shadow"
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
