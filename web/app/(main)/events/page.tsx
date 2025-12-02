import { Suspense } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { EventsListPage } from '@/components/EventsListPage';
import { Header } from '@/components/Header';
import { getTickets } from '@/lib/api';
import { buildTicketsQueryParams, ticketsQueryKey } from '@/lib/query-keys';

interface PageProps {
  searchParams: {
    city?: string;
    category?: string;
    date?: string;
    page?: string;
    limit?: string;
  };
}

export default async function EventsPage({ searchParams }: PageProps) {
  const city = searchParams.city && searchParams.city !== 'all' ? searchParams.city : undefined;
  const parsedPage = Number(searchParams.page);
  const parsedLimit = Number(searchParams.limit);

  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 24;

  const params = buildTicketsQueryParams({
    location: city,
    category: searchParams.category,
    date: searchParams.date,
    page,
    limit,
  });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ticketsQueryKey(params),
    queryFn: () => getTickets(params),
  });
  return (
    <div>
      <Header page='events' />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div className='py-16 text-center text-gray-500'>Etkinlikler yükleniyor...</div>}>
          <EventsListPage />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
