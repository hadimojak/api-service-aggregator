import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitmqService implements OnModuleDestroy {
  private readonly logger = new Logger(RabbitmqService.name);
  private isConnected = false;

  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.client.close();
    }
  }

  async checkConnection(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    this.logger.verbose(`Connecting to RabbitMQ queue ${'API_JOB'}...`);
    await this.client.connect();
    this.isConnected = true;
    this.logger.verbose('RabbitMQ connected successfully');
  }

  async produce(payload: unknown): Promise<void> {
    await lastValueFrom(this.client.emit('API_JOB', payload));
  }
}
