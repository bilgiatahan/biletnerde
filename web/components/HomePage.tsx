'use client';

import { useState, useEffect } from 'react';
import { Event } from '../types';
import { EventCarousel } from './EventCarousel';
import { HeroSlider } from './HeroSlider';
import { SearchBar } from './SearchBar';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Sparkles, TrendingUp, Calendar, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  events: Event[];
  onViewDetails: (eventId: string) => void;
  onViewAllEvents: () => void;
}

export function HomePage({ events, onViewDetails, onViewAllEvents }: HomePageProps) {
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = window.setTimeout(() => setShowWelcomeDialog(true), 0);
      localStorage.setItem('hasSeenWelcome', 'true');
      return () => window.clearTimeout(timer);
    }
  }, []);
  const featuredEvents = events.filter((e) => e.featured);
  const popularEvents = events.filter((e) => e.popular);

  // Get events for this week
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const thisWeekEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    return eventDate >= today && eventDate <= nextWeek;
  });

  const heroEvents = featuredEvents.slice(0, 5);

  const handleSearch = (filters: {
    query: string;
    city: string;
    date: string;
    category: string;
  }) => {
    // Navigate to events list with filters
    console.log('Search filters:', filters);
    onViewAllEvents();
  };

  return (
    <div className='min-h-screen bg-linear-to-b from-gray-50 to-white'>
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className='sm:max-w-[600px] p-0 overflow-hidden'>
          <button
            onClick={() => setShowWelcomeDialog(false)}
            className='absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 hover:bg-white transition-colors shadow-lg'
          >
            <X className='h-4 w-4 text-gray-700' />
          </button>

          <div className='relative h-[250px] w-full overflow-hidden'>
            <ImageWithFallback
              src='https://images.unsplash.com/photo-1648260029310-5f1da359af9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZmVzdGl2YWwlMjBjcm93ZHxlbnwxfHx8fDE3NjIxNjk5Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
              alt='Etkinlik görseli'
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent'></div>
          </div>

          <div className='p-8'>
            <DialogHeader className='space-y-3 mb-6'>
              <DialogTitle className='text-3xl text-center text-gray-900'>
                Hiçbir Etkinliği Kaçırmayın
              </DialogTitle>
              <DialogDescription className='text-lg text-gray-600 text-center leading-relaxed'>
                Tüm bilet platformlarını tek tek kontrol etmeye son! Türkiye&apos;deki tüm
                etkinlikleri tek bir yerde görün.
              </DialogDescription>
            </DialogHeader>

            <div className='flex flex-col gap-3'>
              <Button
                size='lg'
                onClick={() => {
                  setShowWelcomeDialog(false);
                  onViewAllEvents();
                }}
                className='w-full bg-indigo-600 text-white hover:bg-indigo-700'
              >
                Etkinlikleri Keşfet
              </Button>
              <Button
                size='lg'
                variant='outline'
                onClick={() => setShowWelcomeDialog(false)}
                className='w-full'
              >
                Daha Sonra
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <HeroSlider events={heroEvents} onViewDetails={onViewDetails} />

      <SearchBar onSearch={handleSearch} />

      {/* Featured Events */}
      <section className='container mx-auto px-4 py-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <Sparkles className='h-6 w-6 text-indigo-600' />
            <h2 className='text-gray-900'>Öne Çıkan Etkinlikler</h2>
          </div>
          <Button
            variant='ghost'
            onClick={onViewAllEvents}
            className='text-indigo-600 hover:text-indigo-700'
          >
            Tümünü Gör →
          </Button>
        </div>
        <EventCarousel events={featuredEvents} onViewDetails={onViewDetails} />
      </section>

      {/* Popular Events */}
      <section className='container mx-auto px-4 py-6'>
        <div className='flex items-center gap-2 mb-4'>
          <TrendingUp className='h-6 w-6 text-indigo-600' />
          <h2 className='text-gray-900'>Popüler Etkinlikler</h2>
        </div>
        <EventCarousel events={popularEvents} onViewDetails={onViewDetails} />
      </section>

      {/* This Week */}
      <section className='container mx-auto px-4 py-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-6 w-6 text-indigo-600' />
            <h2 className='text-gray-900'>Bu Haftanın Etkinlikleri</h2>
          </div>
          <Button
            variant='ghost'
            onClick={onViewAllEvents}
            className='text-indigo-600 hover:text-indigo-700'
          >
            Tümünü Gör →
          </Button>
        </div>
        <EventCarousel events={thisWeekEvents} onViewDetails={onViewDetails} />
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4 py-12'>
        <div className='bg-linear-to-r from-indigo-600 to-indigo-500 rounded-3xl p-12 text-center text-white'>
          <h2 className='text-3xl md:text-4xl mb-4'>Hiçbir Etkinliği Kaçırmayın</h2>
          <p className='text-lg text-indigo-50 mb-8 max-w-2xl mx-auto'>
            Tüm bilet platformlarını tek tek kontrol etmeye son! Türkiye&apos;deki tüm etkinlikleri
            tek bir yerde görün.
          </p>
          <Button
            size='lg'
            onClick={onViewAllEvents}
            className='bg-white text-indigo-600 hover:bg-indigo-50'
          >
            Etkinlikleri Keşfet
          </Button>
        </div>
      </section>
    </div>
  );
}
