export interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
}

export const Switch = ({ checked, onChange, label, disabled = false }: SwitchProps) => {
    return (
        <label
            className={`flex items-center gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
            <div
                onClick={() => !disabled && onChange(!checked)}
                className="relative flex items-center w-14.5 h-9.5"
            >
                <div
                    className="absolute flex items-center w-14.5 h-9.5 p-3 opacity-50 rounded-[10px] left-0 top-0 transition-colors duration-200 ease-in-out"
                >
                    <div
                        className={`w-8.5 h-3.5 rounded-[10px] ${checked ? 'bg-[rgb(var(--color-success))]' : 'bg-[rgb(var(--color-switch-off))]'
                            }`}
                    />
                </div>

                <div
                    className={`absolute flex items-center w-9.5 h-9.5 p-2.25 top-0 transition-all duration-200 ease-in-out ${checked ? 'left-5' : '-left-px'
                        }`}
                >
                    <div
                        className={`w-5 h-5 rounded-full shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_rgba(0,0,0,0.14),0px_1px_3px_rgba(0,0,0,0.12)] ${checked
                            ? 'bg-[rgb(var(--color-success))]'
                            : 'bg-[rgb(var(--color-bg-main))] border border-[rgb(var(--color-border-subtle))]'
                            }`}
                    />
                </div>
            </div>
            {label && <span className="text-sm font-medium select-none">{label}</span>}
        </label>
    );
};