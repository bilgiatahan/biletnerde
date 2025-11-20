import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NormalizedTicket } from '../../../common/types/normalized-ticket.interface';
import { ProviderCAdapter, ProviderCRawTicket } from '../adapters/provider-c.adapter';
import { BaseProviderService } from './base-provider.service';

@Injectable()
export class ProviderCService extends BaseProviderService {
  constructor(private readonly configService: ConfigService) {
    super(configService.get<string>('MOCK_PROVIDER_C_URL') ?? '');
  }

  async fetchTickets(): Promise<NormalizedTicket[]> {
    const { data } = await this.http.get<ProviderCRawTicket[]>('');
    return ProviderCAdapter.normalize(data);
  }
}
