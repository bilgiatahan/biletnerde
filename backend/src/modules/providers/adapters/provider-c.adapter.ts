import { NormalizedTicket } from '../../../common/types/normalized-ticket.interface';
import { generateTicketId } from '../../../common/utils/uuid.util';

export interface ProviderCRawTicket {
  platform: string;
  title: string;
  date: string;
  time: string;
  price: number;
  city: string;
  venue: string;
  category: string;
  description: string;
  ticketUrl: string;
  image: string;
}

export class ProviderCAdapter {
  static normalize(rawTickets: ProviderCRawTicket[]): NormalizedTicket[] {
    return rawTickets.map((ticket) => ({
      id: generateTicketId(),
      provider: ticket.platform,
      title: ticket.title,
      location: ticket.city,
      venue: ticket.venue,
      category: ticket.category,
      price: ticket.price,
      date: ticket.date,
      description: ticket.description,
      time: ticket.time,
      url: ticket.ticketUrl,
      image: ticket.image,
      rawData: ticket,
    }));
  }
}
