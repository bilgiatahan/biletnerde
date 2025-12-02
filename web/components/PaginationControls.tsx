'use client';

import { useMemo } from 'react';
import { Button } from './ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PAGE_DELTA = 2;

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationControlsProps) {
  const visiblePages = useMemo(() => {
    const start = Math.max(1, currentPage - PAGE_DELTA);
    const end = Math.min(totalPages, currentPage + PAGE_DELTA);
    const pages: number[] = [];
    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`mt-10 flex flex-col items-center gap-4 ${className ?? ''}`}>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Önceki
        </Button>

        {visiblePages.map((page) => (
          <button
            key={page}
            type='button'
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] rounded-md border px-3 py-2 text-sm ${
              page === currentPage
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {page}
          </button>
        ))}

        <Button
          variant='outline'
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Sonraki
        </Button>
      </div>

      <p className='text-sm text-gray-500'>
        Sayfa {currentPage} / {totalPages}
      </p>
    </div>
  );
}

