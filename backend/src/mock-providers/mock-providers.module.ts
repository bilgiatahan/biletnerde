import { Module } from '@nestjs/common';
import { MockProvidersController } from './mock-providers.controller';

@Module({
  controllers: [MockProvidersController],
})
export class MockProvidersModule {}
