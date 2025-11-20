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
