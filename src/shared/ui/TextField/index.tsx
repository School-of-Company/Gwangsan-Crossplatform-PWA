import { forwardRef } from 'react';

interface TextFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex w-full gap-2">
        <label className="text-label">{label}</label>
        <textarea
          ref={ref}
          className="max-h-[200px] min-h-[120px] w-full rounded-xl border border-gray-400 px-4 py-5 text-body5 focus:border-sub2-500"
          {...props}
        />
      </div>
    );
  }
);

TextField.displayName = 'TextField';
