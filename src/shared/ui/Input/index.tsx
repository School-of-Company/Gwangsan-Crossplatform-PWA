import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, icon, ...props }, ref) => {
  return (
    <div className="flex w-full gap-2">
      <label className="text-label">{label}</label>
      <div className="relative">
        <input
          ref={ref}
          className="w-full rounded-xl border border-gray-400 px-4 py-5 text-body5 focus:border-sub2-500 focus:outline-none"
          {...props}
        />
        {icon && <div className="absolute bottom-0 right-4 top-0 flex justify-center">{icon}</div>}
      </div>
    </div>
  );
});
