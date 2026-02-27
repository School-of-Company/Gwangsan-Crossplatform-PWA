import { useState } from 'react';

interface DropdownProps<T extends string> {
  label?: string;
  items: { value: T; label: string }[];
  placeholder?: string;
  selectedItem?: T;
  width?: string;
  onSelect?: (item: T) => void;
}

export function Dropdown<T extends string>({
  label,
  items,
  placeholder,
  selectedItem,
  onSelect,
  width = 'full',
}: DropdownProps<T>) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<T | null>(selectedItem || null);

  const selectedLabel = selected
    ? items.find((item) => item.value === selected)?.label
    : selectedItem
      ? items.find((item) => item.value === selectedItem)?.label
      : undefined;

  return (
    <div className={`w-${width} relative flex flex-col gap-2`}>
      {label && <span className="text-label text-black">{label}</span>}
      <button
        type="button"
        className={`rounded-xl border ${show ? 'border-sub2-500' : 'border-gray-400'} px-4 py-5 text-left text-body5`}
        onClick={() => setShow((prev) => !prev)}>
        <div className="flex flex-row items-center justify-between">
          <span>{selectedLabel || placeholder || '선택해주세요'}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {show ? (
              <path
                d="M3 10L8 5L13 10"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M3 6L8 11L13 6"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>
      </button>
      {show && (
        <div className="absolute left-0 top-full z-50 max-h-[200px] w-full overflow-auto rounded-xl border border-gray-300 bg-gray-50">
          {items.map((item, i) => (
            <button
              key={item.value}
              type="button"
              className={`w-full border-b border-gray-300 bg-gray-50 px-4 py-5 text-left hover:bg-gray-100 ${i === 0 ? 'rounded-t-xl' : ''} ${i === items.length - 1 ? 'rounded-b-xl border-b-0' : ''}`}
              onClick={() => {
                setSelected(item.value);
                if (onSelect) {
                  onSelect(item.value);
                }
                setShow(false);
              }}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
