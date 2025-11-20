import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TicketsRepository } from './tickets.repository';
import { GetTicketsDto } from './dto/get-tickets.dto';
import { CACHE_KEYS } from '../../common/constants/cache.constants';
import { ProviderAService } from '../providers/services/provider-a.service';
import { ProviderBService } from '../providers/services/provider-b.service';
import { ProviderCService } from '../providers/services/provider-c.service';
import { NormalizedTicket } from '../../common/types/normalized-ticket.interface';
import { TicketEntity } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  private static readonly FILTERABLE_FIELDS: (keyof GetTicketsDto)[] = [
    'provider',
    'location',
    'minPrice',
    'maxPrice',
    'category',
    'date',
  ];

  constructor(
    private readonly ticketsRepository: TicketsRepository,
    private readonly providerAService: ProviderAService,
    private readonly providerBService: ProviderBService,
    private readonly providerCService: ProviderCService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getTickets(filter?: GetTicketsDto) {
    const safeFilter = filter ?? {};
    const page = safeFilter.page ?? 1;
    const limit = safeFilter.limit ?? 20;
    const hasActiveFilters = TicketsService.FILTERABLE_FIELDS.some(
      (field) => safeFilter[field] !== undefined,
    );
    const useCache = !hasActiveFilters;

    if (useCache) {
      const cached = (await this.cacheManager.get(
        CACHE_KEYS.ALL_TICKETS,
      )) as TicketEntity[] | undefined;
      if (cached) {
        return this.buildPaginatedResponse(cached, page, limit);
      }
    }

    if (!hasActiveFilters) {
      const tickets = await this.ticketsRepository.findAll();

      if (useCache) {
        await this.cacheManager.set(CACHE_KEYS.ALL_TICKETS, tickets, 1000 * 60 * 5);
      }

      return this.buildPaginatedResponse(tickets, page, limit);
    }

    const { data, total } = await this.ticketsRepository.findByFilter({
      ...safeFilter,
      page,
      limit,
    });

    return {
      data,
      meta: this.buildMeta(total, page, limit),
    };
  }

  async syncTickets(): Promise<NormalizedTicket[]> {
    const [aTickets, bTickets, cTickets] = await Promise.all([
      this.providerAService.fetchTickets(),
      this.providerBService.fetchTickets(),
      this.providerCService.fetchTickets(),
    ]);

    const merged = [...aTickets, ...bTickets, ...cTickets];
    await this.ticketsRepository.clear();
    await this.ticketsRepository.saveMany(merged);
    await this.cacheManager.del(CACHE_KEYS.ALL_TICKETS);
    return merged;
  }

  private buildPaginatedResponse(tickets: TicketEntity[], page: number, limit: number) {
    const total = tickets.length;
    const start = (page - 1) * limit;
    const data = tickets.slice(start, start + limit);

    return {
      data,
      meta: this.buildMeta(total, page, limit),
    };
  }

  private buildMeta(total: number, page: number, limit: number) {
    return {
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  }
}
