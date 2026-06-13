import { Injectable, Inject, OnModuleDestroy, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class RabbitmqService implements OnModuleDestroy {
  private readonly logger = new Logger(RabbitmqService.name);

  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async onModuleDestroy() {
    await this.client.close();
  }

  async checkConnection(): Promise<void> {
    try {
      await this.client.connect();
      this.logger.verbose('RabbitMQ connected');
    } catch (error) {
      this.logger.fatal(
        'Failed to connect to RabbitMQ',
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async produce(payload: unknown): Promise<void> {
    const queueName = ConfigService.config.rabbitmq.queueName;

    await lastValueFrom(this.client.emit(queueName, payload));
  }
}
