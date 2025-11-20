import { Module } from '@nestjs/common';
import { ProviderAService } from './services/provider-a.service';
import { ProviderBService } from './services/provider-b.service';
import { ProviderCService } from './services/provider-c.service';

@Module({
  providers: [ProviderAService, ProviderBService, ProviderCService],
  exports: [ProviderAService, ProviderBService, ProviderCService],
})
export class ProvidersModule {}
