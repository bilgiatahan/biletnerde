'use client';

import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Ticket } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  event: Ticket;
}

export function EventCard({ event }: EventCardProps) {
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

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      Biletix: 'text-white',
      Bubilet: 'text-white',
      Passo: 'text-white',
      Mobilet: 'text-white',
    };
    return colors[platform] || 'bg-indigo-600 text-white';
  };

  const getPlatformStyle = (platform: string) => {
    const styles: Record<string, React.CSSProperties> = {
      Biletix: { backgroundColor: '#026cdf' },
      Bubilet: { backgroundColor: '#00c656' },
      Passo: { backgroundColor: '#d0021b' },
      Mobilet: { backgroundColor: '#6c31ed' },
    };
    return styles[platform] || { backgroundColor: '#4F46E5' };
  };

  return (
    <Link href={`/events/${event.id}`}>
      <Card className='group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl cursor-pointer'>
        <div className='relative aspect-4/3 overflow-hidden bg-gray-100'>
          <ImageWithFallback
            src={event.image}
            alt={event.title}
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
          <div className='absolute top-2 left-2'>
            <Badge className={`${getCategoryColor()} border-0 px-2.5 py-0.5 text-xs`}>
              {getCategoryLabel(event.category)}
            </Badge>
          </div>
        </div>

        <CardContent className='p-3 space-y-1'>
          <h3 className='font-semibold text-gray-900 line-clamp-1'>{event.title}</h3>

          <div className='space-y-0.5'>
            <div className='flex items-center gap-1.5 text-sm text-gray-600'>
              <Calendar className='h-3.5 w-3.5 text-gray-400 shrink-0' />
              <span>
                {formatDate(event.date)} • {event.time}
              </span>
            </div>

            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <MapPin className='h-3.5 w-3.5 text-gray-400 shrink-0' />
              <span className='line-clamp-1'>
                {event.venue}, {event.location}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className='p-3 pt-0 flex items-center justify-between'>
          <Badge
            className={`${getPlatformColor(event.provider)} border-0 px-2.5 py-1 text-xs`}
            style={getPlatformStyle(event.provider)}
          >
            {event.provider}
          </Badge>
          <span className='text-sm font-semibold text-gray-900'>{event.price}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
