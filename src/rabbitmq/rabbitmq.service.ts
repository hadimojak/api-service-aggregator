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
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitmqService.name);

  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.checkConnection();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  async checkConnection(): Promise<void> {
    this.logger.verbose(`Connecting to RabbitMQ queue ${'API_JOB'}...`);
    await this.client.connect();
    this.logger.verbose('RabbitMQ connected successfully');
  }

  async produce(payload: unknown): Promise<void> {
    await lastValueFrom(this.client.emit('API_JOB', payload));
  }
}
