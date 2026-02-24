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
      <div className="relative mt-2 flex items-center h-12">
        <div className="relative w-full h-[6px] rounded bg-[#F1F5F9]">
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
          className="absolute w-full h-12 opacity-0 cursor-pointer"
          style={{ zIndex: 1 }}
        />
        <div
          className="absolute w-6 h-6 rounded-full border-2 border-sub2-500 bg-white shadow pointer-events-none"
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
