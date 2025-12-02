'use client';

import { Ticket } from '@/types';
import { HomePage } from './HomePage';

interface HomePageClientProps {
  events: Ticket[];
}

export function HomePageClient({ events }: HomePageClientProps) {

  return (
    <HomePage
      events={events}
    />
  );
}

