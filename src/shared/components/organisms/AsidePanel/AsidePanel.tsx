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
                className="fixed inset-0 bg-black/10 z-40 transition-opacity"
                onClick={onClose}
            />

            <div className="fixed right-0 top-0 h-full w-130 bg-white shadow-xl z-50 flex flex-col overflow-hidden">
                <div className="flex justify-end p-6">
                    <button
                        onClick={onClose}
                        className="text-blue-400 hover:text-blue-600 font-medium transition-colors border-none bg-transparent cursor-pointer"
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
