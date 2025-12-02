'use client';

import { useRouter } from 'next/navigation';
import { Event } from '@/types';
import { HomePage } from './HomePage';

interface HomePageClientProps {
  events: Event[];
}

export function HomePageClient({ events }: HomePageClientProps) {
  const router = useRouter();

  return (
    <HomePage
      events={events}
      onViewDetails={(eventId) => router.push(`/events/${eventId}`)}
      onViewAllEvents={() => router.push('/events')}
    />
  );
}

