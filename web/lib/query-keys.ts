import { GetTicketsParams } from './api';

type TicketsQueryParams = Required<Pick<GetTicketsParams, 'page' | 'limit'>> &
  Pick<GetTicketsParams, 'location' | 'category' | 'date' | 'minPrice' | 'maxPrice'>;

export const buildTicketsQueryParams = (params: GetTicketsParams): TicketsQueryParams => ({
  page: params.page ?? 1,
  limit: params.limit ?? 24,
  location: params.location,
  category: params.category,
  date: params.date,
  minPrice: params.minPrice,
  maxPrice: params.maxPrice,
});

export const ticketsQueryKey = (params: TicketsQueryParams) =>
  ['tickets', params] as const;

export type TicketsQueryKey = ReturnType<typeof ticketsQueryKey>;

