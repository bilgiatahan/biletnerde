import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { SyncLogEntity } from './entities/sync-log.entity';
import { NormalizedTicket } from '../../common/types/normalized-ticket.interface';
import { GetTicketsDto } from './dto/get-tickets.dto';

@Injectable()
export class TicketsRepository {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketsRepo: Repository<TicketEntity>,
    @InjectRepository(SyncLogEntity)
    private readonly syncLogRepo: Repository<SyncLogEntity>,
  ) {}

  async saveMany(tickets: NormalizedTicket[]): Promise<void> {
    await this.ticketsRepo.save(tickets);
  }

  async findAll(): Promise<TicketEntity[]> {
    return this.ticketsRepo.find();
  }

  async clear(): Promise<void> {
    await this.ticketsRepo.clear();
  }

  async findOneById(id: string): Promise<TicketEntity | null> {
    return this.ticketsRepo.findOne({
      where: { id },
    });
  }

  async findByFilter(
    filter: GetTicketsDto,
  ): Promise<{ data: TicketEntity[]; total: number }> {
    const qb = this.ticketsRepo.createQueryBuilder('ticket');
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 20;

    if (filter.provider) {
      qb.andWhere('ticket.provider = :provider', { provider: filter.provider });
    }

    if (filter.location) {
      qb.andWhere('ticket.location LIKE :location', {
        location: `%${filter.location}%`,
      });
    }

    if (filter.minPrice !== undefined) {
      qb.andWhere('ticket.price >= :minPrice', { minPrice: filter.minPrice });
    }

    if (filter.maxPrice !== undefined) {
      qb.andWhere('ticket.price <= :maxPrice', { maxPrice: filter.maxPrice });
    }

    if (filter.category) {
      qb.andWhere('ticket.category = :category', { category: filter.category });
    }

    if (filter.date) {
      qb.andWhere('ticket.date = :date', { date: filter.date });
    }

    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }

  async logSync(provider: string, status: string, message?: string) {
    await this.syncLogRepo.save({ provider, status, message });
  }
}
