import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOrigins =
    configService.get<string>('CORS_ORIGINS') ?? 'http://localhost:3000';
  const allowedOrigins = corsOrigins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow tools like Postman (no origin) plus anything in the whitelist.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origin not allowed by CORS'), false);
    },
    credentials: true,
  });

  const port = configService.get<number>('PORT', 4000);
  await app.listen(port);
}

bootstrap();
