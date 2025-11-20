import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { TicketsService } from '../modules/tickets/tickets.service';
import { TicketsRepository } from '../modules/tickets/tickets.repository';
import { TICKET_SYNC_QUEUE } from './ticket-sync.queue';

@Processor(TICKET_SYNC_QUEUE)
export class TicketSyncProcessor extends WorkerHost {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly ticketsRepository: TicketsRepository,
  ) {
    super();
  }

  async process(job: Job): Promise<void> {
    try {
      await this.ticketsService.syncTickets();
      await this.ticketsRepository.logSync('all', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      await this.ticketsRepository.logSync('all', 'failed', message);
      throw error;
    }
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job | undefined, error: Error) {
    // eslint-disable-next-line no-console
    console.error('[TicketSyncProcessor] job failed', job?.id, error.message);
  }
}
