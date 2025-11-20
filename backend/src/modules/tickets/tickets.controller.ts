import { Controller, Get, Post, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { GetTicketsDto } from './dto/get-tickets.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  async list(@Query() query: GetTicketsDto) {
    return this.ticketsService.getTickets(query);
  }

  // Mock senaryoda worker beklememek icin manuel senkronizasyon ucu
  @Post('sync')
  async sync() {
    return this.ticketsService.syncTickets();
  }
}
