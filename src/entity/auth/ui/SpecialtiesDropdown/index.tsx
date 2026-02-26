import CheckIcon from '@/shared/assets/svg/CheckIcon';
import { useState, useRef, useEffect } from 'react';
import { useMultiSelect } from '../../model/useMultiSelect';
import { useCustomInput } from '../../model/useCustomInput';

interface SpecialtiesDropdownProps<T extends string> {
  label?: string;
  items: T[];
  placeholder?: string;
  selectedItems?: T[];
  onSelect?: (items: T[]) => void;
  allowCustomInput?: boolean;
}

export default function SpecialtiesDropdown<T extends string>({
  label,
  items,
  placeholder,
  selectedItems: externalSelectedItems,
  onSelect,
  allowCustomInput = false,
}: SpecialtiesDropdownProps<T>) {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const multiSelect = useMultiSelect({
    items,
    initialSelectedItems: externalSelectedItems,
    onSelect,
  });

  const customInput = useCustomInput({
    onSubmit: multiSelect.addCustomItem,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    if (item === '직접 입력...') {
      customInput.activateCustomInput();
      return;
    }
    multiSelect.handleSelect(item);
  };

  const displayText = multiSelect.displayText || placeholder || '선택해주세요';

  return (
    <div ref={dropdownRef} className="relative flex w-full flex-col gap-2">
      {label && <label className="text-label">{label}</label>}
      <button
        type="button"
        className="w-full rounded-xl border border-yellow-400 bg-white px-5 py-5"
        onClick={() => setShow((prev) => !prev)}>
        <div className="flex flex-row items-center justify-between">
          <span className="text-body5">{displayText}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            {show ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
          </svg>
        </div>
      </button>
      {show && (
        <div className="absolute top-full z-10 mt-1 max-h-[300px] w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-md">
          {multiSelect.allItems.map((item) => {
            const isSelected = multiSelect.isSelected(item);
            return (
              <button
                key={item}
                type="button"
                className={`flex w-full flex-row items-center px-5 py-4 ${
                  isSelected ? 'bg-blue-50' : 'bg-white'
                }`}
                onClick={() => handleSelect(item)}>
                <div className="mr-3 flex h-8 w-8 items-center justify-center">
                  {isSelected && <CheckIcon />}
                </div>
                <span className="text-body5">{item}</span>
              </button>
            );
          })}

          {allowCustomInput && !customInput.isAddingCustomItem && (
            <button
              type="button"
              className="flex w-full flex-row items-center bg-white px-5 py-4"
              onClick={() => handleSelect('직접 입력...')}>
              <div className="mr-3 flex h-8 w-8 items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0075C2"
                  strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <span className="text-body5 text-[#0075C2]">직접 입력...</span>
            </button>
          )}

          {allowCustomInput && customInput.isAddingCustomItem && (
            <div className="flex flex-row items-center bg-white px-5 py-4">
              <div className="mr-3 flex h-8 w-8 items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0075C2"
                  strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <input
                ref={customInput.customInputRef}
                className="flex-1 border-b border-gray-300 text-body5 outline-none"
                placeholder="새로운 특기 입력"
                value={customInput.customItemText}
                onChange={(e) => customInput.updateCustomItemText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && customInput.handleSubmitCustomItem()}
                autoFocus
              />
              <button
                type="button"
                className="ml-2 p-2"
                onClick={customInput.handleSubmitCustomItem}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0075C2"
                  strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
