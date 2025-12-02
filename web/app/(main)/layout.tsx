import type { ReactNode } from 'react';
import { FiltersProvider } from '@/lib/filters-context';
import { QueryProvider } from '@/lib/query-client';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <FiltersProvider>
        <div className='flex min-h-screen flex-col bg-background text-foreground'>
          <main className='flex-1'>{children}</main>
          <Footer />
        </div>
        <Toaster position='top-right' />
      </FiltersProvider>
    </QueryProvider>
  );
}
