

export interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  rows?: number;
  id?: string;
  name?: string;
}

export const Textarea = ({
  value,
  onChange,
  placeholder,
  hasError,
  rows = 5,
  id,
  name
}: TextareaProps) => {
  return (
    <textarea
      value={value}
      id={id}
      name={name}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 border rounded-md resize-none ${hasError ? 'border-red-500' : 'border-gray-300'
        }`}
    />
  );
};
