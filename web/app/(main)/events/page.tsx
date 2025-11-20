'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { mockEvents } from '@/data/mockEvents';
import { useFilters } from '@/lib/filters-context';
import { EventsListPage } from '@/components/EventsListPage';
import { Header } from '@/components/Header';

export default function EventsPage() {
  const router = useRouter();
  const { selectedCity, searchQuery } = useFilters();

  const events = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesCity = selectedCity === 'all' || event.city === selectedCity;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        normalizedQuery.length === 0 ||
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.venue.toLowerCase().includes(normalizedQuery) ||
        event.city.toLowerCase().includes(normalizedQuery);
      return matchesCity && matchesSearch;
    });
  }, [selectedCity, searchQuery]);

  return (
    <div>
      <Header page='events' />
      <EventsListPage
        events={events}
        onViewDetails={(eventId) => router.push(`/events/${eventId}`)}
      />
    </div>
  );
}
