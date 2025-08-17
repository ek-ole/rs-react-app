import { PaginationButtons } from '@/app/(client)/_components/pagination-buttons';
import { cn } from '@/app/(server)/_lib/cn';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className={cn('mt-6 flex items-center justify-center gap-1', 'text-sm font-medium')}>
      <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
