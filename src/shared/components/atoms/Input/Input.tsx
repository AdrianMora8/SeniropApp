export interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    hasError?: boolean;
    type?: 'text' | 'number' | 'email' | 'password';
    name?: string;
    id?: string;
}

export const Input = ({ value, onChange, placeholder, hasError, type = 'text', name, id }: InputProps) => {
    return (
        <input
            type={type}
            value={value}
            name={name}
            id={id}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md ${hasError ? 'border-red-500' : 'border-gray-300'
                }`}
        />
    );
};  