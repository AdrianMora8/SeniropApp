export interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    hasError?: boolean;
}

export const DatePicker = ({ value, onChange, hasError }: DatePickerProps) => {
    return (
    <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-md ${
            hasError ? 'border-red-500' : 'border-gray-300'
        }`}
        />
    );
};
