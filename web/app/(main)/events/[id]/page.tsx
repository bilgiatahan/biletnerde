
import { getTicketById } from '@/lib/api';
import { EventDetailPage } from '@/components/EventDetailPage';
import Link from 'next/link';

type EventDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetail({ params }: EventDetailProps) {
  const { id } = await params;
  const ticket = await getTicketById(id);

  if (!ticket) {
    return (
      <div className='flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center'>
        <h1 className='text-2xl font-semibold text-gray-900'>Etkinlik bulunamadı</h1>
        <p className='text-gray-600'>Aradığınız etkinlik yayından kaldırılmış veya hiç eklenmemiş olabilir.</p>
        <Link href='/events'>
          Etkinliklere Dön
        </Link>
      </div>
    );
  }

  return (
    <EventDetailPage
      event={ticket}
      similarEvents={[]}
    />
  );
}
