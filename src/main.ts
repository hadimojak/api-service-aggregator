import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from './config/config.service';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { RedisService } from './redis/redis.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'], // <-- Enable this explicitly
    },
  );

  try {
    await app.init();

    const redisService = app.get(RedisService);
    await redisService.checkConnection();

    const rabbitmqService = app.get(RabbitmqService);
    await rabbitmqService.checkConnection();
  } catch (error) {
    console.log(error);

    logger.error(
      'Server startup aborted because Redis or RabbitMQ is not connected.',
      error instanceof Error ? error.stack : String(error),
    );
    await app.close();
    process.exit(1);
  }

  const configService = app.get(ConfigService);
  const port = configService.config.app.port;  

  await app.listen({ port, host: '0.0.0.0' });

  logger.verbose(`API running on http://localhost:${port}`);
}
bootstrap();
