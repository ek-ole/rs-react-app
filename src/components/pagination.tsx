type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPage, onPageChange }: PaginationProps) {
  return (
    <div className="my-4 flex gap-2">
      {Array.from({ length: totalPage }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`rounded px-3 py-1 ${
            currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
