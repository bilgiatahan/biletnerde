import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TicketSyncQueue, TICKET_SYNC_QUEUE } from './ticket-sync.queue';
import { TicketSyncProcessor } from './ticket-sync.processor';
import { TicketsModule } from '../modules/tickets/tickets.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: TICKET_SYNC_QUEUE }),
    TicketsModule,
  ],
  providers: [TicketSyncQueue, TicketSyncProcessor],
})
export class WorkersModule {}
