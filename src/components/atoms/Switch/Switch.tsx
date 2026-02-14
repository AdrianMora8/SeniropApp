export interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
}
export const Switch = ({ checked, onChange, label, disabled = false }: SwitchProps) => {
    return (
        <label className={`flex items-center gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
            <div
                onClick={() => !disabled && onChange(!checked)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-(--color-publish-green)' : 'bg-gray-300'
                    }`}
            >
                <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </div>
            {label && <span className="text-sm font-medium select-none">{label}</span>}
        </label>
    );
};
