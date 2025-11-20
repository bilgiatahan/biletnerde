import { Controller, Get } from '@nestjs/common';
import { providerAEvents } from './provider-a.mock';
import { providerBEvents } from './provider-b.mock';
import { providerCEvents } from './provider-c.mock';

@Controller('mock')
export class MockProvidersController {
  @Get('provider-a')
  providerA() {
    return providerAEvents;
  }

  @Get('provider-b')
  providerB() {
    return providerBEvents;
  }

  @Get('provider-c')
  providerC() {
    return providerCEvents;
  }
}
