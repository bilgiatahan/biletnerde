'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EventCard } from './EventCard';
import { Event, Ticket } from '../types';
import { useRef } from 'react';

interface EventCarouselProps {
  events: Ticket[];
}

export function EventCarousel({ events }: EventCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (events.length === 0) return null;

  return (
    <div className='relative group'>
      {/* Left Arrow - appears on hover */}
      <button
        onClick={() => scroll('left')}
        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity'
        aria-label='Sola kaydır'
      >
        <ChevronLeft className='h-5 w-5 text-gray-700' />
      </button>

      {/* Right Arrow - appears on hover */}
      <button
        onClick={() => scroll('right')}
        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity'
        aria-label='Sağa kaydır'
      >
        <ChevronRight className='h-5 w-5 text-gray-700' />
      </button>

      <div
        ref={scrollContainerRef}
        className='flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {events.map((event) => (
          <div key={event.id} className='flex-none w-[260px] md:w-[280px]'>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
