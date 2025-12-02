'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal } from 'lucide-react';

import { getTickets } from '@/lib/api';
import { buildTicketsQueryParams, ticketsQueryKey } from '@/lib/query-keys';
import type { FilterState, TicketResponse } from '@/types';
import { EventCard } from './EventCard';
import { FilterSidebar } from './FilterSidebar';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { PaginationControls } from './PaginationControls';

const DEFAULT_LIMIT = 24;

export function EventsListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const decodeListParam = useCallback((value?: string | null) => {
    if (!value) return [];
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }, []);

  const resolveDateFilter = useCallback((value: string | null | undefined) => {
    if (!value) return undefined;
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    const startOfDayUtc = (dateValue: Date) =>
      new Date(
        Date.UTC(
          dateValue.getUTCFullYear(),
          dateValue.getUTCMonth(),
          dateValue.getUTCDate(),
        ),
      );

    const toDateOnly = (dateValue: Date) => startOfDayUtc(dateValue).toISOString().slice(0, 10);

    const now = new Date();

    if (value === 'today') {
      return toDateOnly(now);
    }
    if (value === 'week') {
      const week = new Date(now);
      week.setDate(week.getDate() + 7);
      return toDateOnly(week);
    }
    if (value === 'month') {
      const month = new Date(now);
      month.setMonth(month.getMonth() + 1);
      return toDateOnly(month);
    }

    return undefined;
  }, []);

  const inferDatePreset = useCallback(
    (value: string | null | undefined): FilterState['date'] => {
      if (!value) return '';
      const presets: FilterState['date'][] = ['today', 'week', 'month'];
      for (const preset of presets) {
        if (resolveDateFilter(preset) === value) return preset;
      }
      return '';
    },
    [resolveDateFilter],
  );

  const deriveFiltersFromParams = useCallback((): FilterState => {
    const params = searchParams;
    const datePreset = inferDatePreset(params?.get('date'));
    return {
      category: decodeListParam(params?.get('category')),
      city: decodeListParam(params?.get('city')),
      date: datePreset,
      platform: decodeListParam(params?.get('platform')),
      sortBy: (params?.get('sortBy') as FilterState['sortBy']) ?? 'date',
    };
  }, [decodeListParam, inferDatePreset, searchParams]);

  const [filters, setFilters] = useState<FilterState>(() => deriveFiltersFromParams());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setFilters(deriveFiltersFromParams());
  }, [deriveFiltersFromParams]);

  const currentPage = useMemo(() => {
    const param = searchParams?.get('page');
    const parsed = Number(param);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }, [searchParams]);

  const limit = useMemo(() => {
    const param = searchParams?.get('limit');
    const parsed = Number(param);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_LIMIT;
  }, [searchParams]);

  const city = useMemo(() => {
    const value = searchParams?.get('city');
    if (!value) return undefined;
    const [first] = value.split(',').filter(Boolean);
    if (!first || first === 'all') return undefined;
    return first;
  }, [searchParams]);

  const category = useMemo(() => {
    const value = searchParams?.get('category');
    if (!value) return undefined;
    const [first] = value.split(',').filter(Boolean);
    return first;
  }, [searchParams]);

  const dateParam = searchParams?.get('date');
  const date = useMemo(() => dateParam ?? undefined, [dateParam]);

  const queryParams = useMemo(
    () =>
      buildTicketsQueryParams({
        location: city,
        category,
        date,
        page: currentPage,
        limit,
      }),
    [category, city, currentPage, date, limit],
  );

  const { data, isLoading, isFetching, isError, refetch } = useQuery<TicketResponse>({
    queryKey: ticketsQueryKey(queryParams),
    queryFn: () => getTickets(queryParams),
    placeholderData: (previousData) => previousData,
  });

  const totalPages = data?.meta.totalPages ?? 1;
  const totalResults = data?.meta.total ?? 0;
  const hasResults = totalResults > 0;
  const resultsStart = hasResults ? (currentPage - 1) * limit + 1 : 0;
  const resultsEnd = hasResults ? Math.min(totalResults, currentPage * limit) : 0;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    const queryString = params.toString();
    return `${pathname}${queryString ? `?${queryString}` : ''}`;
  };

  const applyFilters = (nextFilters: FilterState) => {
    setFilters(nextFilters);
    const params = new URLSearchParams(searchParams?.toString() ?? '');

    const setArrayParam = (key: string, values: string[]) => {
      if (!values.length) {
        params.delete(key);
        return;
      }
      params.set(key, values.join(','));
    };

    setArrayParam('category', nextFilters.category);
    setArrayParam('city', nextFilters.city);
    setArrayParam('platform', nextFilters.platform);

    const resolvedDate = nextFilters.date ? resolveDateFilter(nextFilters.date) : undefined;
    if (resolvedDate) {
      params.set('date', resolvedDate);
    } else {
      params.delete('date');
    }

    if (nextFilters.sortBy && nextFilters.sortBy !== 'date') {
      params.set('sortBy', nextFilters.sortBy);
    } else {
      params.delete('sortBy');
    }

    params.set('page', '1');
    params.set('limit', limit.toString());

    const targetUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(targetUrl);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    router.push(buildUrl(page));
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-gray-900 mb-2'>Tüm Etkinlikler</h1>
          <p className='text-gray-600'>
            {isLoading ? 'Etkinlikler yükleniyor...' : `${totalResults} etkinlik bulundu`}
            {!isLoading && hasResults && ` • ${resultsStart}-${resultsEnd}`}
          </p>
        </div>

        <div className='flex gap-8'>
          <aside className='hidden lg:block w-64 shrink-0'>
            <div className='sticky top-24'>
              <FilterSidebar filters={filters} onFilterChange={applyFilters} />
            </div>
          </aside>

          <div className='flex-1'>
            <div className='lg:hidden mb-6'>
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant='outline' className='w-full'>
                    <SlidersHorizontal className='mr-2 h-4 w-4' />
                    Filtreler
                  </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-[300px] p-0'>
                  <div className='p-6'>
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={applyFilters}
                      isMobile
                      onClose={() => setMobileFiltersOpen(false)}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {isError && (
              <div className='rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive'>
                Etkinlikleri yüklerken bir sorun oluştu.
                <button type='button' className='underline ml-1' onClick={() => refetch()}>
                  Tekrar dene
                </button>
              </div>
            )}

            {isLoading && !data && (
              <div className='py-16 text-center text-gray-500'>Etkinlikler yükleniyor...</div>
            )}

            {!isLoading && data && data.data.length === 0 && (
              <div className='py-16 text-center text-gray-500'>Bu filtreler için etkinlik bulunamadı.</div>
            )}

            {data && data.data.length > 0 && (
              <div className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                  {data.data.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                {isFetching && (
                  <p className='text-sm text-gray-500 text-center'>Yeni etkinlikler yükleniyor...</p>
                )}
              </div>
            )}

            {data && totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
