import { Ticket, TicketResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface GetTicketsParams {
  location?: string;
  category?: string;
  date?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}


export async function getTickets(params?: GetTicketsParams): Promise<TicketResponse> {
  const searchParams = new URLSearchParams();

  if (params?.location) searchParams.set('location', params.location);
  if (params?.category) searchParams.set('category', params.category);
  if (params?.date) searchParams.set('date', params.date);
  if (params?.minPrice !== undefined) searchParams.set('minPrice', params.minPrice.toString());
  if (params?.maxPrice !== undefined) searchParams.set('maxPrice', params.maxPrice.toString());
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());

  const url = `${API_BASE_URL}/tickets${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch tickets');
  }

  const data = (await response.json()) as TicketResponse;
  return data;
}

export async function getTicketById(id: string): Promise<Ticket> {
  const url = `${API_BASE_URL}/tickets/${id}`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch ticket');
  }

  const data = (await response.json()) as Ticket;
  return data;
}

