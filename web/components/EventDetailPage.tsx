'use client';

import { useState } from 'react';
import {
  Calendar,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Clock,
  Heart,
  Share2,
  Copy,
  Check,
  Link,
} from 'lucide-react';
import { Ticket } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { EventCarousel } from './EventCarousel';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';

interface EventDetailPageProps {
  event: Ticket;
  similarEvents: Ticket[];
}

export function EventDetailPage({
  event,
  similarEvents,
}: EventDetailPageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
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

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success('Favorilere eklendi!');
    } else {
      toast.info('Favorilerden çıkarıldı');
    }
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link kopyalandı!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Link kopyalanamadı');
    }
  };

  const handleShareWhatsApp = () => {
    const text = `${event.title} - ${formatDate(event.date)} ${event.time}`;
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `${event.title} etkinliğini kaçırmayın!`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank',
    );
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
    );
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Back Button */}
      <div className='bg-white border-b'>
        <div className='container mx-auto px-4 py-4'>
          <Link href='/events'>
            <Button variant='ghost' className='text-gray-600 hover:text-gray-900'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Geri Dön
            </Button>
          </Link>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Event Image */}
            <div className='relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg'>
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className='h-full w-full object-cover'
              />
              <div className='absolute top-4 left-4 flex gap-2'>
                <Badge className={getCategoryColor()}>{getCategoryLabel(event.category)}</Badge>
              </div>
            </div>

            {/* Event Details */}
            <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-200'>
              <div className='flex items-start justify-between gap-4 mb-6'>
                <h1 className='text-3xl text-gray-900 flex-1'>{event.title}</h1>

                {/* Action Buttons */}
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={handleFavoriteToggle}
                    className={`transition-colors ${
                      isFavorite
                        ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' size='icon' className='hover:bg-gray-50'>
                        <Share2 className='h-5 w-5' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-48'>
                      <DropdownMenuItem onClick={handleShareWhatsApp} className='cursor-pointer'>
                        <svg className='h-4 w-4 mr-2' viewBox='0 0 24 24' fill='currentColor'>
                          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                        </svg>
                        WhatsApp
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={handleShareTwitter} className='cursor-pointer'>
                        <svg className='h-4 w-4 mr-2' viewBox='0 0 24 24' fill='currentColor'>
                          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                        </svg>
                        Twitter (X)
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={handleShareFacebook} className='cursor-pointer'>
                        <svg className='h-4 w-4 mr-2' viewBox='0 0 24 24' fill='currentColor'>
                          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                        </svg>
                        Facebook
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={handleCopyLink} className='cursor-pointer'>
                        {copied ? (
                          <Check className='h-4 w-4 mr-2 text-green-600' />
                        ) : (
                          <Copy className='h-4 w-4 mr-2' />
                        )}
                        {copied ? 'Kopyalandı!' : 'Linki Kopyala'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <div className='flex items-start gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100'>
                    <Calendar className='h-5 w-5 text-indigo-600' />
                  </div>
                  <div>
                    <div className='text-sm text-gray-500 mb-1'>Tarih</div>
                    <div className='text-gray-900'>{formatDate(event.date)}</div>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100'>
                    <Clock className='h-5 w-5 text-indigo-600' />
                  </div>
                  <div>
                    <div className='text-sm text-gray-500 mb-1'>Saat</div>
                    <div className='text-gray-900'>{event.time}</div>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100'>
                    <MapPin className='h-5 w-5 text-indigo-600' />
                  </div>
                  <div>
                    <div className='text-sm text-gray-500 mb-1'>Mekan</div>
                    <div className='text-gray-900'>{event.venue}</div>
                    <div className='text-sm text-gray-600'>{event.location}</div>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100'>
                    <ExternalLink className='h-5 w-5 text-indigo-600' />
                  </div>
                  <div>
                    <div className='text-sm text-gray-500 mb-1'>Platform</div>
                    <div className='text-gray-900'>{event.provider}</div>
                  </div>
                </div>
              </div>

              <div className='border-t pt-6'>
                <h2 className='text-gray-900 mb-4'>Etkinlik Hakkında</h2>
                <p className='text-gray-700 leading-relaxed'>{event.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <div className='sticky top-24 space-y-6'>
              {/* Ticket Info Card */}
              <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-200'>
                <h3 className='font-semibold text-gray-900 mb-4'>Bilet Bilgileri</h3>

                <div className='space-y-4'>
                  <div>
                    <div className='text-sm text-gray-500 mb-1'>Fiyat Aralığı</div>
                    <div className='text-2xl font-semibold text-gray-900'>{event.price}</div>
                  </div>

                  <div className='pt-4 border-t'>
                    <div className='text-sm text-gray-500 mb-2'>Bilet Satış Platformu</div>
                    <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                      <span className='font-medium text-gray-900'>{event.provider}</span>
                    </div>
                  </div>

                  <Button
                    className='w-full bg-indigo-600 hover:bg-indigo-700 text-white'
                    size='lg'
                    onClick={() => window.open(event.url, '_blank')}
                  >
                    Bilet Satın Al
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Button>

                  <p className='text-xs text-gray-500 text-center'>
                    {event.provider} sitesine yönlendirileceksiniz
                  </p>
                </div>
              </div>

              {/* Info Card */}
              <div className='bg-indigo-50 rounded-2xl p-6 border border-indigo-100'>
                <h3 className='font-semibold text-indigo-900 mb-2'>💡 Bilgi</h3>
                <p className='text-sm text-indigo-800'>
                  Ticket Aggregator bilet satışı yapmaz. Sadece farklı platformlardaki etkinlikleri
                  tek bir yerde gösteriyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <div className='mt-16'>
            <h2 className='text-gray-900 mb-6'>Benzer Etkinlikler</h2>
            <EventCarousel events={[]} />
          </div>
        )}
      </div>
    </div>
  );
}
