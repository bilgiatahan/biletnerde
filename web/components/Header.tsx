'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Calendar as CalendarIcon,
  Clock,
  Music,
  Search,
  Ticket,
  TrendingUp,
  User,
} from 'lucide-react';
import { mockEvents } from '@/data/mockEvents';
import { useFilters } from '@/lib/filters-context';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const popularSearches = ['Konserler', 'Tiyatro', 'Spor', 'Festivaller'];

export function Header({ page }: { page: 'home' | 'events' }) {
  const { searchQuery, setSearchQuery } = useFilters();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [recentSearches] = useState<string[]>(['Tarkan Konseri', 'Galatasaray Maçı', 'Stand Up']);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const eventSuggestions =
    searchQuery.length >= 2
      ? mockEvents
          .filter(
            (event) =>
              event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              event.venue.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .slice(0, 4)
      : [];

  const artistSuggestions =
    searchQuery.length >= 2
      ? [
          { name: 'Tarkan', type: 'Sanatçı' },
          { name: 'Sezen Aksu', type: 'Sanatçı' },
          { name: 'Hadise', type: 'Sanatçı' },
        ].filter((artist) => artist.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : [];

  const totalResults = eventSuggestions.length + artistSuggestions.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigateToEvents = () => {
    if (pathname !== '/events') {
      router.push('/events');
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setShowAutocomplete(query.length >= 2);
  };

  const handleSelectSuggestion = (query: string) => {
    setSearchQuery(query);
    setShowAutocomplete(false);
    navigateToEvents();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setShowAutocomplete(false);
      navigateToEvents();
    }
  };

  const style =
    page === 'home'
      ? 'absolute top-0 z-50 w-full'
      : 'sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80';

  return (
    <header className={`${style}`}>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between gap-4'>
          <button
            onClick={() => router.push('/')}
            className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity'
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-xl from-indigo-600 to-indigo-500'>
              <Ticket className='h-6 w-6 text-white' />
            </div>
            <div className='hidden sm:block'>
              <div className={`${page === 'home' ? 'text-white' : 'text-gray-900'} font-semibold`}>
                Ticket Aggregator
              </div>
              <div className={`${page === 'home' ? 'text-white/50' : 'text-gray-500'} text-xs`}>
                Tüm etkinlikler, tek yerde
              </div>
            </div>
          </button>

          {page !== 'home' && (
            <div className='flex-1 max-w-xl' ref={searchRef}>
              <div className='relative'>
                <Search className='absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
                <Input
                  type='text'
                  placeholder='Etkinlik, sanatçı veya mekan ara...'
                  value={searchQuery}
                  className='pl-12 pr-4 h-12 rounded-full bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all'
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowAutocomplete(true)}
                />

                {showAutocomplete && (
                  <div className='absolute left-0 top-full mt-2 w-full bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden z-50'>
                    {totalResults > 0 ? (
                      <div className='py-3'>
                        <div className='px-5 py-2 flex items-center justify-between border-b border-gray-100'>
                          <span className='text-xs text-gray-500 uppercase tracking-wide'>
                            Arama Sonuçları
                          </span>
                          <span className='text-xs text-gray-400'>{totalResults} sonuç</span>
                        </div>

                        {eventSuggestions.length > 0 && (
                          <div className='py-2'>
                            <div className='px-5 py-2 flex items-center gap-2'>
                              <CalendarIcon className='h-3.5 w-3.5 text-indigo-600' />
                              <span className='text-xs text-gray-700 font-medium'>Etkinlikler</span>
                            </div>
                            {eventSuggestions.map((event) => (
                              <button
                                key={event.id}
                                className='w-full px-5 py-2.5 hover:bg-gray-50 transition-colors text-left flex items-center gap-3 group'
                                onClick={() => handleSelectSuggestion(event.title)}
                              >
                                <div className='relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100'>
                                  <ImageWithFallback
                                    src={event.image}
                                    alt={event.title}
                                    className='w-full h-full object-cover'
                                  />
                                </div>
                                <div className='flex-1 min-w-0'>
                                  <div className='text-sm text-gray-900 font-medium truncate group-hover:text-indigo-600 transition-colors'>
                                    {event.title}
                                  </div>
                                  <div className='flex items-center gap-2 mt-0.5 text-xs text-gray-500'>
                                    <span className='truncate'>{event.city}</span>
                                    <span className='text-gray-400'>•</span>
                                    <span>
                                      {new Date(event.date).toLocaleDateString('tr-TR', {
                                        day: 'numeric',
                                        month: 'short',
                                      })}
                                    </span>
                                    <span className='text-gray-400'>•</span>
                                    <span>{event.time}</span>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {artistSuggestions.length > 0 && (
                          <div className='py-2 border-t border-gray-100'>
                            <div className='px-5 py-2 flex items-center gap-2'>
                              <Music className='h-3.5 w-3.5 text-indigo-600' />
                              <span className='text-xs text-gray-700 font-medium'>Sanatçılar</span>
                            </div>
                            {artistSuggestions.map((artist) => (
                              <button
                                key={artist.name}
                                className='w-full px-5 py-2.5 hover:bg-gray-50 transition-colors text-left flex items-center gap-3 group'
                                onClick={() => handleSelectSuggestion(artist.name)}
                              >
                                <div className='relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-linear-to-br from-indigo-100 to-indigo-50 flex items-center justify-center'>
                                  <Music className='h-6 w-6 text-indigo-600' />
                                </div>
                                <div className='flex-1 min-w-0'>
                                  <div className='text-sm text-gray-900 font-medium truncate group-hover:text-indigo-600 transition-colors'>
                                    {artist.name}
                                  </div>
                                  <div className='text-xs text-gray-500 mt-0.5'>{artist.type}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : searchQuery.length >= 2 ? (
                      <div className='px-5 py-8 text-center text-gray-500'>
                        <Search className='h-10 w-10 mx-auto mb-3 text-gray-300' />
                        <p className='text-sm font-medium text-gray-700'>Sonuç bulunamadı</p>
                        <p className='text-xs text-gray-500 mt-1'>
                          Farklı anahtar kelimeler deneyin
                        </p>
                      </div>
                    ) : (
                      <div className='py-3'>
                        {recentSearches.length > 0 && (
                          <div className='mb-2'>
                            <div className='px-5 py-2 flex items-center gap-2'>
                              <Clock className='h-3.5 w-3.5 text-indigo-600' />
                              <span className='text-xs text-gray-700 font-medium'>
                                Son Aramalar
                              </span>
                            </div>
                            <div className='px-3 py-2'>
                              {recentSearches.map((search) => (
                                <button
                                  key={search}
                                  className='inline-block m-1 px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors text-sm text-gray-700'
                                  onClick={() => handleSelectSuggestion(search)}
                                >
                                  {search}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className='border-t border-gray-100 pt-2'>
                          <div className='px-5 py-2 flex items-center gap-2'>
                            <TrendingUp className='h-3.5 w-3.5 text-indigo-600' />
                            <span className='text-xs text-gray-700 font-medium'>
                              Popüler Aramalar
                            </span>
                          </div>
                          <div className='px-3 py-2'>
                            {popularSearches.map((search) => (
                              <button
                                key={search}
                                className='inline-block m-1 px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-700'
                                onClick={() => handleSelectSuggestion(search)}
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className='hidden md:flex items-center gap-2'>
            <Button
              onClick={() => router.push('/login')}
              className='bg-indigo-600 hover:bg-indigo-700 text-white'
            >
              <User className='h-4 w-4 mr-2' />
              Giriş Yap
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
