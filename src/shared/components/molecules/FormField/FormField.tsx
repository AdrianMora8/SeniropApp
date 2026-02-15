import { Label } from '@/shared/components/atoms/Label/Label';

export interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    children: React.ReactNode;
}

export const FormField = ({
    label,
    htmlFor,
    error,
    children
}: FormFieldProps) => {

    return (

        <div className="flex flex-col gap-2">

            <Label htmlFor={htmlFor}>
                {label}
            </Label>

            {children}

            {error && (
                <span className="text-sm text-red-500">
                    {error}
                </span>
            )}

        </div>

    );

};