import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NormalizedTicket } from '../../../common/types/normalized-ticket.interface';
import { ProviderAAdapter, ProviderARawTicket } from '../adapters/provider-a.adapter';
import { BaseProviderService } from './base-provider.service';

@Injectable()
export class ProviderAService extends BaseProviderService {
  constructor(private readonly configService: ConfigService) {
    super(configService.get<string>('MOCK_PROVIDER_A_URL') ?? '');
  }

  async fetchTickets(): Promise<NormalizedTicket[]> {
    const { data } = await this.http.get<ProviderARawTicket[]>('');
    return ProviderAAdapter.normalize(data);
  }
}
