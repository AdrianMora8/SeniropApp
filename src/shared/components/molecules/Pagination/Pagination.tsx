
export interface PaginationProps {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const Pagination = ({
    totalItems,
    currentPage,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange
}: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-between px-6 py-4 border-t border-[rgb(var(--color-border-subtle))]">
            <div className="flex items-center gap-2">
                <span className="text-sm text-[rgb(var(--color-text-secondary))]">Rows per page:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    className="border border-[rgb(var(--color-border))] rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-border-focus))]"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-sm text-[rgb(var(--color-text-secondary))]">
                    {startItem}-{endItem} of {totalItems}
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="p-2 rounded hover:bg-[rgb(var(--color-bg-tertiary))] disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous page"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5 15L7.5 10L12.5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded hover:bg-[rgb(var(--color-bg-tertiary))] disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next page"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 15L12.5 10L7.5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
