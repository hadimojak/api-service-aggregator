import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name);

  constructor(private readonly configService: ConfigService) {
    super({
      host: configService.get('HOST_REDIS'),
      port: configService.get('REDIS_PORT'),
      password: configService.get('REDIS_PASS'),
      lazyConnect: true,
    });

    this.on('connect', () => {
      this.logger.verbose('Redis connected');
    });

    this.on('ready', () => {
      this.logger.verbose('Redis ready');
    });

    this.on('error', (err) => {
      this.logger.fatal(`Redis error: ${err.message}`, err.stack);
    });

    this.on('close', () => {
      this.logger.verbose('Redis connection closed');
    });
  }

  async onModuleInit() {
    await this.checkConnection();
  }

  async onModuleDestroy() {
    await this.quit();
  }

  async checkConnection(): Promise<void> {
    if (this.status !== 'ready') {
      await this.connect();
    }

    const response = await this.ping();
    if (response !== 'PONG') {
      throw new Error(`Redis ping failed with response: ${response}`);
    }
  }
}
