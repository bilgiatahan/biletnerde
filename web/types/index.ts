export interface Event {
  id: string;
  title: string;
  category: 'concert' | 'theater' | 'sports' | 'festival';
  date: string;
  time: string;
  city: string;
  venue: string;
  platform: 'Biletix' | 'Bubilet' | 'Passo' | 'Mobilet';
  image: string;
  description: string;
  price: string;
  ticketUrl: string;
  featured?: boolean;
  popular?: boolean;
}

export interface FilterState {
  category: string[];
  city: string[];
  date: string;
  platform: string[];
  sortBy: 'date' | 'popularity';
}

export interface Ticket {
  id: string;
  provider: string;
  title: string;
  location: string;
  venue: string;
  category: string;
  price: number;
  date: string;
  description: string;
  time: string;
  url: string;
  image: string;
  rawData: any;
}

export interface TicketResponse {
  data: Ticket[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}