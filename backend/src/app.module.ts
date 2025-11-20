import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { TicketsModule } from './modules/tickets/tickets.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { MockProvidersModule } from './mock-providers/mock-providers.module';
import { WorkersModule } from './workers/workers.module';
import { CitiesModule } from './modules/cities/cities.module';
import { TicketEntity } from './modules/tickets/entities/ticket.entity';
import { SyncLogEntity } from './modules/tickets/entities/sync-log.entity';

const ENABLE_BULL = process.env.ENABLE_BULL !== 'false';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const ttl = 1000 * 60 * 5;
        const useRedis = configService.get<string>('USE_REDIS_CACHE', 'true') === 'true';

        if (!useRedis) {
          return { ttl };
        }

        return {
          store: await redisStore({
            socket: {
              host: configService.get<string>('REDIS_HOST', 'localhost'),
              port: configService.get<number>('REDIS_PORT', 6379),
            },
            ttl,
          }),
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_PATH', 'tickets.sqlite'),
        entities: [TicketEntity, SyncLogEntity],
        synchronize: true,
      }),
    }),
    ...(ENABLE_BULL
      ? [
          BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              connection: {
                host: configService.get<string>('REDIS_HOST', 'localhost'),
                port: configService.get<number>('REDIS_PORT', 6379),
              },
            }),
          }),
        ]
      : []),
    ProvidersModule,
    TicketsModule,
    MockProvidersModule,
    CitiesModule,
    ...(ENABLE_BULL ? [WorkersModule] : []),
  ],
})
export class AppModule {}
