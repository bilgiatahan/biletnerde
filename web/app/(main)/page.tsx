'use client';

import { useMemo } from 'react';
import { mockEvents } from '@/data/mockEvents';
import { useFilters } from '@/lib/filters-context';
import { HomePage } from '@/components/HomePage';
import { Header } from '@/components/Header';

export default function LandingPage() {
  const { selectedCity } = useFilters();

  const events = useMemo(() => {
    if (selectedCity === 'all') {
      return mockEvents;
    }
    return mockEvents.filter((event) => event.location === selectedCity);
  }, [selectedCity]);

  return (
    <div>
      <Header page='home' />
      <HomePage
        events={events}
      />
    </div>
  );
}
