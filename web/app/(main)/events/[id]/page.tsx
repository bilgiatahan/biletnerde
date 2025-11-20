'use client';

import { useRouter } from 'next/navigation';
import { mockEvents } from '@/data/mockEvents';
import { EventDetailPage } from '@/components/EventDetailPage';

type EventDetailProps = {
  params: {
    id: string;
  };
};

export default function EventDetail({ params }: EventDetailProps) {
  const router = useRouter();
  const event = mockEvents.find((item) => item.id === params.id);

  if (!event) {
    return (
      <div className='flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center'>
        <h1 className='text-2xl font-semibold text-gray-900'>Etkinlik bulunamadı</h1>
        <p className='text-gray-600'>Aradığınız etkinlik yayından kaldırılmış olabilir.</p>
        <button
          onClick={() => router.push('/events')}
          className='rounded-full bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 transition'
        >
          Etkinliklere Dön
        </button>
      </div>
    );
  }

  const similarEvents = mockEvents
    .filter((item) => item.category === event.category && item.id !== event.id)
    .slice(0, 6);

  return (
    <EventDetailPage
      event={event}
      similarEvents={similarEvents}
      onBack={() => router.push('/events')}
      onViewDetails={(eventId) => router.push(`/events/${eventId}`)}
    />
  );
}
