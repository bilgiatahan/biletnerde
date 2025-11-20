'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  Search,
  MapPin,
  Calendar as CalendarIcon,
  Grid3x3,
  Check,
  ChevronsUpDown,
} from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { cn } from './ui/utils';

interface SearchBarProps {
  onSearch?: (filters: { query: string; city: string; date: string; category: string }) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('all');
  const [category, setCategory] = useState('all');
  const [openCity, setOpenCity] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const cityCommandId = useId();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsSticky(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const cities = [
    { value: 'istanbul', label: 'İstanbul' },
    { value: 'ankara', label: 'Ankara' },
    { value: 'izmir', label: 'İzmir' },
    { value: 'antalya', label: 'Antalya' },
    { value: 'adana', label: 'Adana' },
    { value: 'bursa', label: 'Bursa' },
    { value: 'gaziantep', label: 'Gaziantep' },
    { value: 'konya', label: 'Konya' },
    { value: 'kayseri', label: 'Kayseri' },
    { value: 'eskisehir', label: 'Eskişehir' },
    { value: 'mersin', label: 'Mersin' },
    { value: 'diyarbakir', label: 'Diyarbakır' },
    { value: 'samsun', label: 'Samsun' },
    { value: 'denizli', label: 'Denizli' },
    { value: 'sanliurfa', label: 'Şanlıurfa' },
    { value: 'trabzon', label: 'Trabzon' },
    { value: 'malatya', label: 'Malatya' },
    { value: 'kahramanmaras', label: 'Kahramanmaraş' },
    { value: 'erzurum', label: 'Erzurum' },
    { value: 'van', label: 'Van' },
    { value: 'batman', label: 'Batman' },
    { value: 'elazig', label: 'Elazığ' },
    { value: 'kocaeli', label: 'Kocaeli' },
    { value: 'manisa', label: 'Manisa' },
    { value: 'sivas', label: 'Sivas' },
    { value: 'balikesir', label: 'Balıkesir' },
    { value: 'tekirdag', label: 'Tekirdağ' },
    { value: 'aydin', label: 'Aydın' },
    { value: 'hatay', label: 'Hatay' },
    { value: 'mugla', label: 'Muğla' },
    { value: 'mardin', label: 'Mardin' },
    { value: 'afyon', label: 'Afyonkarahisar' },
    { value: 'ordu', label: 'Ordu' },
    { value: 'sakarya', label: 'Sakarya' },
  ];

  const dates = [
    { value: 'all', label: 'Tüm Tarihler' },
    { value: 'today', label: 'Bugün' },
    { value: 'tomorrow', label: 'Yarın' },
    { value: 'weekend', label: 'Bu Haftasonu' },
    { value: 'next10', label: 'Önümüzdeki 10 Gün' },
  ];

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'concert', label: 'Konser' },
    { value: 'theater', label: 'Tiyatro' },
    { value: 'sports', label: 'Spor' },
    { value: 'festival', label: 'Festival' },
  ];

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ query, city, date, category });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && city) {
      handleSearch();
    }
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden className='h-0 w-full' />
      <div
        className={cn('mx-auto -mt-8 z-10 w-full sticky top-0', !isSticky && 'container')}
      >
        <div
          className={cn(
            'bg-white shadow-2xl p-6 border border-gray-100 transition-all duration-200',
            isSticky ? 'rounded-none' : 'rounded-2xl px-4',
          )}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
            {/* Search Input */}
            <div className='lg:col-span-1 relative'>
              <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10'>
                <Search className='h-5 w-5' />
              </div>
              <Input
                type='text'
                placeholder='Etkinlik Ara'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className='pl-10 h-12! border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'
              />
            </div>

            {/* City Select */}
            <div className='relative'>
              <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none'>
                <MapPin className='h-5 w-5' />
              </div>
              <Popover open={openCity} onOpenChange={setOpenCity}>
                <PopoverTrigger asChild>
                  <button
                    role='combobox'
                    aria-expanded={openCity}
                    aria-controls={cityCommandId}
                    className='h-12! w-full pl-10 pr-3 py-2 text-sm border border-input rounded-md bg-input-background focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] flex items-center justify-between whitespace-nowrap data-placeholder:text-muted-foreground'
                    data-placeholder={!city}
                  >
                    <span className='line-clamp-1 text-left flex items-center gap-2'>
                      {city ? cities.find((c) => c.value === city)?.label : 'Şehir seçiniz'}
                    </span>
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Şehir ara...' />
                    <CommandList id={cityCommandId}>
                      <CommandEmpty>Şehir bulunamadı.</CommandEmpty>
                      <CommandGroup>
                        {cities.map((c) => (
                          <CommandItem
                            key={c.value}
                            value={c.label}
                            onSelect={() => {
                              setCity(c.value);
                              setOpenCity(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                city === c.value ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            {c.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Date Select */}
            <div className='relative'>
              <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none'>
                <CalendarIcon className='h-5 w-5' />
              </div>
              <Select value={date} onValueChange={setDate}>
                <SelectTrigger className='h-12! pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'>
                  <SelectValue placeholder='Tarih Seçin' />
                </SelectTrigger>
                <SelectContent>
                  {dates.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Select */}
            <div className='relative'>
              <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none'>
                <Grid3x3 className='h-5 w-5' />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className='h-12! pl-10 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500'>
                  <SelectValue placeholder='Kategori Seçin' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div>
              <Button
                onClick={handleSearch}
                disabled={!city}
                className='w-full h-12! bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Search className='h-5 w-5 mr-2' />
                ARA
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
