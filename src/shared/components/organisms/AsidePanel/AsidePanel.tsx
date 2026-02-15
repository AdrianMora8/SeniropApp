export interface AsidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const AsidePanel = ({ isOpen, onClose, children }: AsidePanelProps) => {
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-[rgb(var(--color-overlay)/0.1)] z-40 transition-opacity"
                onClick={onClose}
            />

            <div className="fixed right-0 top-0 h-full w-full md:w-130 bg-[rgb(var(--color-bg-main))] shadow-xl z-50 flex flex-col overflow-hidden transition-all duration-300">
                <div className="flex justify-end p-6">
                    <button
                        onClick={onClose}
                        className="text-[rgb(var(--color-text-link))] hover:text-[rgb(var(--color-text-link-hover))] font-medium transition-colors border-none bg-transparent cursor-pointer"
                    >
                        ✕ CLOSE
                    </button>
                </div>

                <div className="flex-1 px-6 flex flex-col" >
                    {children}
                </div>
            </div>
        </>
    );
};
