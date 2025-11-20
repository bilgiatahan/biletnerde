'use client';

import { FilterState } from '../types';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({ filters, onFilterChange, isMobile, onClose }: FilterSidebarProps) {
  const categories = [
    { value: 'concert', label: 'Konserler' },
    { value: 'theater', label: 'Tiyatro' },
    { value: 'sports', label: 'Spor' },
    { value: 'festival', label: 'Festivaller' },
  ];

  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Antalya'];
  const platforms = ['Biletix', 'Bubilet', 'Passo', 'Mobilet'];

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];
    onFilterChange({ ...filters, category: newCategories });
  };

  const handleCityToggle = (city: string) => {
    const newCities = filters.city.includes(city)
      ? filters.city.filter((c) => c !== city)
      : [...filters.city, city];
    onFilterChange({ ...filters, city: newCities });
  };

  const handlePlatformToggle = (platform: string) => {
    const newPlatforms = filters.platform.includes(platform)
      ? filters.platform.filter((p) => p !== platform)
      : [...filters.platform, platform];
    onFilterChange({ ...filters, platform: newPlatforms });
  };

  const handleDateChange = (date: string) => {
    onFilterChange({ ...filters, date });
  };

  const handleSortChange = (sortBy: 'date' | 'popularity') => {
    onFilterChange({ ...filters, sortBy });
  };

  const clearFilters = () => {
    onFilterChange({
      category: [],
      city: [],
      date: '',
      platform: [],
      sortBy: 'date',
    });
  };

  return (
    <div
      className={`${isMobile ? 'h-full overflow-y-auto' : ''} bg-white rounded-lg border border-gray-200 p-6 space-y-6`}
    >
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold text-gray-900'>Filtreler</h3>
        {isMobile && (
          <Button variant='ghost' size='icon' onClick={onClose}>
            <X className='h-5 w-5' />
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className='space-y-3'>
        <Label className='text-gray-900'>Kategori</Label>
        <div className='space-y-2'>
          {categories.map((category) => (
            <div key={category.value} className='flex items-center space-x-2'>
              <Checkbox
                id={`category-${category.value}`}
                checked={filters.category.includes(category.value)}
                onCheckedChange={() => handleCategoryToggle(category.value)}
              />
              <label
                htmlFor={`category-${category.value}`}
                className='text-sm text-gray-700 cursor-pointer'
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* City Filter */}
      <div className='space-y-3'>
        <Label className='text-gray-900'>Şehir</Label>
        <div className='space-y-2'>
          {cities.map((city) => (
            <div key={city} className='flex items-center space-x-2'>
              <Checkbox
                id={`city-${city}`}
                checked={filters.city.includes(city)}
                onCheckedChange={() => handleCityToggle(city)}
              />
              <label htmlFor={`city-${city}`} className='text-sm text-gray-700 cursor-pointer'>
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Platform Filter */}
      <div className='space-y-3'>
        <Label className='text-gray-900'>Platform</Label>
        <div className='space-y-2'>
          {platforms.map((platform) => (
            <div key={platform} className='flex items-center space-x-2'>
              <Checkbox
                id={`platform-${platform}`}
                checked={filters.platform.includes(platform)}
                onCheckedChange={() => handlePlatformToggle(platform)}
              />
              <label
                htmlFor={`platform-${platform}`}
                className='text-sm text-gray-700 cursor-pointer'
              >
                {platform}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Date Filter */}
      <div className='space-y-3'>
        <Label className='text-gray-900'>Tarih</Label>
        <RadioGroup value={filters.date} onValueChange={handleDateChange}>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='' id='date-all' />
            <Label htmlFor='date-all' className='text-sm text-gray-700 cursor-pointer'>
              Tüm Tarihler
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='today' id='date-today' />
            <Label htmlFor='date-today' className='text-sm text-gray-700 cursor-pointer'>
              Bugün
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='week' id='date-week' />
            <Label htmlFor='date-week' className='text-sm text-gray-700 cursor-pointer'>
              Bu Hafta
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='month' id='date-month' />
            <Label htmlFor='date-month' className='text-sm text-gray-700 cursor-pointer'>
              Bu Ay
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Sort By */}
      <div className='space-y-3'>
        <Label className='text-gray-900'>Sırala</Label>
        <RadioGroup
          value={filters.sortBy}
          onValueChange={(value) => handleSortChange(value as 'date' | 'popularity')}
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='date' id='sort-date' />
            <Label htmlFor='sort-date' className='text-sm text-gray-700 cursor-pointer'>
              Tarihe Göre
            </Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='popularity' id='sort-popularity' />
            <Label htmlFor='sort-popularity' className='text-sm text-gray-700 cursor-pointer'>
              Popülerliğe Göre
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <Button
        variant='outline'
        className='w-full border-gray-300 text-gray-700 hover:bg-gray-100'
        onClick={clearFilters}
      >
        Filtreleri Temizle
      </Button>
    </div>
  );
}
