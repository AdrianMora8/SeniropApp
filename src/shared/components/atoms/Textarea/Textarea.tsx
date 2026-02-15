

export interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  rows?: number;
  id?: string;
  name?: string;
  className?: string;
}

export const Textarea = ({
  value,
  onChange,
  placeholder,
  hasError,
  rows = 5,
  id,
  name,
  className = ''
}: TextareaProps) => {
  return (
    <textarea
      value={value}
      id={id}
      name={name}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 border rounded-md resize-none overflow-hidden ${hasError ? 'border-[rgb(var(--color-danger))]' : 'border-[rgb(var(--color-border))]'} ${className}`}
    />
  );
};
