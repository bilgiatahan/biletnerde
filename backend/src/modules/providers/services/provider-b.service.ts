import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NormalizedTicket } from '../../../common/types/normalized-ticket.interface';
import { ProviderBAdapter, ProviderBRawTicket } from '../adapters/provider-b.adapter';
import { BaseProviderService } from './base-provider.service';

@Injectable()
export class ProviderBService extends BaseProviderService {
  constructor(private readonly configService: ConfigService) {
    super(configService.get<string>('MOCK_PROVIDER_B_URL') ?? '');
  }

  async fetchTickets(): Promise<NormalizedTicket[]> {
    const { data } = await this.http.get<ProviderBRawTicket[]>('');
    return ProviderBAdapter.normalize(data);
  }
}
