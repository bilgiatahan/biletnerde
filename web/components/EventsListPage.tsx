'use client';

import { useState } from 'react';
import { Event, FilterState } from '../types';
import { EventCard } from './EventCard';
import { FilterSidebar } from './FilterSidebar';
import { Button } from './ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface EventsListPageProps {
  events: Event[];
  onViewDetails: (eventId: string) => void;
}

export function EventsListPage({ events, onViewDetails }: EventsListPageProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    city: [],
    date: '',
    platform: [],
    sortBy: 'date',
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredEvents = events.filter((event) => {
    if (filters.category.length > 0 && !filters.category.includes(event.category)) {
      return false;
    }

    if (filters.city.length > 0 && !filters.city.includes(event.city)) {
      return false;
    }

    if (filters.platform.length > 0 && !filters.platform.includes(event.platform)) {
      return false;
    }

    if (filters.date) {
      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (filters.date === 'today') {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (eventDate < today || eventDate >= tomorrow) return false;
      } else if (filters.date === 'week') {
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        if (eventDate < today || eventDate > nextWeek) return false;
      } else if (filters.date === 'month') {
        const nextMonth = new Date(today);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        if (eventDate < today || eventDate > nextMonth) return false;
      }
    }

    return true;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (filters.sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      const scoreA = (a.featured ? 2 : 0) + (a.popular ? 1 : 0);
      const scoreB = (b.featured ? 2 : 0) + (b.popular ? 1 : 0);
      return scoreB - scoreA;
    }
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-gray-900 mb-2'>Tüm Etkinlikler</h1>
          <p className='text-gray-600'>{sortedEvents.length} etkinlik bulundu</p>
        </div>

        <div className='flex gap-8'>
          {/* Desktop Sidebar */}
          <aside className='hidden lg:block w-64 flex-shrink-0'>
            <div className='sticky top-24'>
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className='flex-1'>
            {/* Mobile Filter Button */}
            <div className='lg:hidden mb-6'>
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant='outline' className='w-full'>
                    <SlidersHorizontal className='mr-2 h-4 w-4' />
                    Filtreler
                  </Button>
                </SheetTrigger>
                <SheetContent side='left' className='w-[300px] p-0'>
                  <div className='p-6'>
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={setFilters}
                      isMobile
                      onClose={() => setMobileFiltersOpen(false)}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Events Grid */}
            {sortedEvents.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {sortedEvents.map((event) => (
                  <EventCard key={event.id} event={event} onViewDetails={onViewDetails} />
                ))}
              </div>
            ) : (
              <div className='text-center py-16'>
                <div className='text-6xl mb-4'>🔍</div>
                <h3 className='text-gray-900 mb-2'>Etkinlik Bulunamadı</h3>
                <p className='text-gray-600 mb-6'>
                  Seçtiğiniz filtrelere uygun etkinlik bulunamadı. Filtreleri değiştirerek tekrar
                  deneyin.
                </p>
                <Button
                  variant='outline'
                  onClick={() =>
                    setFilters({
                      category: [],
                      city: [],
                      date: '',
                      platform: [],
                      sortBy: 'date',
                    })
                  }
                >
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
