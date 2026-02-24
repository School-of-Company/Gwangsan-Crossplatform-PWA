import { CSSProperties } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'error';
  width?: string;
  style?: CSSProperties;
}

export const Button = ({
  children,
  disabled = false,
  variant = 'primary',
  style,
  width = 'w-auto',
  className,
  ...props
}: ButtonProps) => {
  const buttonClasses = `
    min-h-[56px] ${width} flex items-center justify-center rounded-lg px-8 py-4
    ${
      disabled
        ? variant === 'primary'
          ? 'bg-[#CDCDCF]'
          : variant === 'secondary'
            ? 'border-2 border-[#CDCDCF] bg-white'
            : 'bg-[#CDCDCF]'
        : variant === 'primary'
          ? 'bg-[#8FC31D]'
          : variant === 'secondary'
            ? 'border-2 border-[#8FC31D] bg-white active:bg-gray-50'
            : 'bg-[#DF454A]'
    }
    ${className || ''}
  `;

  const textClasses = `
    text-lg font-semibold
    ${
      disabled
        ? 'text-gray-500'
        : variant === 'primary'
          ? 'text-white'
          : variant === 'secondary'
            ? 'text-[#8FC31D]'
            : 'text-white'
    }
  `;

  return (
    <button className={buttonClasses} disabled={disabled} style={style} {...props}>
      <span className={textClasses}>{children}</span>
    </button>
  );
};
