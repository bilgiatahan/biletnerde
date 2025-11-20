'use client';

import { useRef, useState } from 'react';
import { Calendar, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Event } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSliderProps {
  events: Event[];
  onViewDetails: (eventId: string) => void;
}

export function HeroSlider({ events, onViewDetails }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const goToNext = () => swiperRef.current?.slideNext();
  const goToPrevious = () => swiperRef.current?.slidePrev();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      concert: 'Konser',
      theater: 'Tiyatro',
      sports: 'Spor',
      festival: 'Festival',
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getCategoryColor = () => {
    return 'bg-indigo-100 text-indigo-700';
  };

  if (events.length === 0) return null;

  return (
    <div className='relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900'>
      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={events.length > 1}
        className='h-full'
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <div className='min-w-full h-full relative'>
              {/* Background Image */}
              <div className='absolute inset-0'>
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className='h-full w-full object-cover'
                />
                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20' />
              </div>

              {/* Content */}
              <div className='relative h-full container mx-auto px-4'>
                <div className='h-full flex flex-col justify-end pb-16 md:pb-20'>
                  <div className='max-w-3xl'>
                    {/* Category Badge */}
                    <div className='mb-4'>
                      <Badge className={`${getCategoryColor()} text-sm md:text-base px-4 py-1.5`}>
                        {getCategoryLabel(event.category)}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h1 className='text-3xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6'>
                      {event.title}
                    </h1>

                    {/* Event Details */}
                    <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 md:mb-8'>
                      <div className='flex items-center gap-2 text-white/90'>
                        <Calendar className='h-5 w-5' />
                        <span className='text-sm md:text-base'>
                          {formatDate(event.date)} • {event.time}
                        </span>
                      </div>
                      <div className='flex items-center gap-2 text-white/90'>
                        <MapPin className='h-5 w-5' />
                        <span className='text-sm md:text-base'>
                          {event.venue}, {event.city}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className='mb-6 md:mb-8'>
                      <div className='text-white/80 text-sm mb-1'>Bilet Fiyatı</div>
                      <div className='text-2xl md:text-3xl text-white'>{event.price}</div>
                    </div>

                    {/* CTA Button */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                      <Button
                        size='lg'
                        onClick={() => onViewDetails(event.id)}
                        className='bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
                      >
                        Bilet Al • {event.platform}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={goToPrevious}
        className='absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white'
      >
        <ChevronLeft className='h-6 w-6' />
      </button>
      <button
        onClick={goToNext}
        className='absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white'
      >
        <ChevronRight className='h-6 w-6' />
      </button>

      {/* Dots Indicator */}
      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
