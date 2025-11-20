import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

export const TICKET_SYNC_QUEUE = 'ticketSyncQueue';

@Injectable()
export class TicketSyncQueue implements OnModuleInit {
  constructor(@InjectQueue(TICKET_SYNC_QUEUE) private readonly queue: Queue) {}

  async onModuleInit() {
    await this.queue.add('ticket-sync', {}, {
      repeat: { pattern: '*/5 * * * *' },
      jobId: 'ticket-sync',
      removeOnComplete: true,
      removeOnFail: true,
    });
  }
}
