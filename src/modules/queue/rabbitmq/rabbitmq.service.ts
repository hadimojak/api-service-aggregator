import { Injectable, Inject, OnModuleDestroy, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class RabbitmqService implements OnModuleDestroy {
  private readonly logger = new Logger(RabbitmqService.name);

  constructor(
    @Inject(ConfigService.config.rabbitmq.serviceName)
    private readonly client: ClientProxy,
  ) {}

  async onModuleDestroy() {
    await this.client.close();
  }

  async checkConnection() {
    try {
      await this.client.connect();

      this.logger.verbose('RabbitMQ connected');
    } catch (error) {
      this.logger.fatal('RabbitMQ connection failed');

      throw error;
    }
  }

  async publish<T>(queue: string, payload: T): Promise<void> {
    await lastValueFrom(this.client.emit(queue, payload));
  }
}
