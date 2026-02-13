export interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

export const Switch = ({ checked, onChange, label }: SwitchProps) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer">
        <div
            onClick={() => onChange(!checked)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
            checked ? 'bg-(--color-publish-green)' : 'bg-(--color-publish-gray)'
            }`}
        >
            <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                checked ? 'translate-x-6' : 'translate-x-0'
            }`}
            />
        </div>
        {label && <span className="text-sm">{label}</span>}
        </label>
    );
};
