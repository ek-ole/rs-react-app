import { cn } from '@/utils/cn';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPagesToShow = () => {
    const pages = [];
    const maxVisible = 3;

    pages.push(1);

    const start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages - 1, currentPage + Math.floor(maxVisible / 2));

    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className={cn('mt-6 flex items-center justify-center gap-1', 'text-sm font-medium')}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'hover:bg-shadow hover:text-primary-light',
          'hover:border-shadow cursor-pointer',
          'border-shadow rounded-xl border-2 px-2 font-medium',
          'transition-colors duration-400 sm:px-4 sm:py-2',
        )}
        aria-label="Previous page"
      >
        &larr;
      </button>

      {getPagesToShow().map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={cn(
              'flex h-9 w-9 items-center justify-center',
              'hover:bg-shadow hover:text-primary-light',
              'hover:border-shadow cursor-pointer',
              'rounded-xl border-2 px-2 font-medium',
              'transition-colors duration-400 sm:px-4 sm:py-2',
              currentPage === page ? 'text-primary-light bg-shadow border-shadow' : 'border-shadow',
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'hover:bg-shadow hover:text-primary-light',
          'hover:border-shadow cursor-pointer',
          'border-shadow rounded-xl border-2 px-2 font-medium',
          'transition-colors duration-400 sm:px-4 sm:py-2',
        )}
        aria-label="Next page"
      >
        &rarr;
      </button>
    </div>
  );
}
