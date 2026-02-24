import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  secureTextEntry?: boolean;
  returnKeyType?: string;
  onSubmitEditing?: () => void;
  keyboardType?: string;
  editable?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      icon,
      secureTextEntry,
      returnKeyType,
      onSubmitEditing,
      keyboardType,
      editable = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSubmitEditing) {
        onSubmitEditing();
      }
    };

    const getInputType = () => {
      if (secureTextEntry) return 'password';
      if (keyboardType === 'numeric' || keyboardType === 'number-pad') return 'number';
      if (keyboardType === 'email-address') return 'email';
      if (keyboardType === 'phone-pad') return 'tel';
      return props.type || 'text';
    };

    return (
      <div className="flex w-full flex-col gap-2">
        <label className="text-label">{label}</label>
        <div className="relative">
          <input
            ref={ref}
            className="w-full rounded-xl border border-gray-400 px-4 py-5 text-body5 focus:border-sub2-500"
            type={getInputType()}
            onChange={props.onChange}
            onKeyPress={handleKeyPress}
            disabled={disabled || !editable}
            {...props}
          />
          {icon && (
            <div className="absolute bottom-0 right-4 top-0 flex justify-center">{icon}</div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
