interface ErrorMessageProps {
  error?: string | null;
  className?: string;
}

export function ErrorMessage({ error, className = 'h-6' }: ErrorMessageProps) {
  return (
    <div className={className}>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
