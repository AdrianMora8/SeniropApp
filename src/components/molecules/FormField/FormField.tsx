export interface FormFieldProps {
    label: string;
    error?: string;
    children: React.ReactNode;
}

export const FormField = ({ label, error, children }: FormFieldProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>
            
            {children}
            
            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
};