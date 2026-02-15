import { Label } from '@/shared/components/atoms/Label/Label';

export interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
}

export const FormField = ({
    label,
    htmlFor,
    error,
    children,
    className
}: FormFieldProps) => {

    return (

        <div className={`flex flex-col gap-2 ${className || ''}`}>

            <Label htmlFor={htmlFor}>
                {label}
            </Label>

            {children}

            {error && (
                <span className="text-sm text-[rgb(var(--color-danger))]">
                    {error}
                </span>
            )}

        </div>

    );

};