import { Injectable, Inject, OnModuleDestroy, Logger } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '../../../config/config.service';
import { LogService } from '../../log/log.service';

@Injectable()
export class RabbitmqService implements OnModuleDestroy {
  private readonly logger = new Logger(RabbitmqService.name);

  constructor(
    @Inject(ConfigService.config.rabbitmq.serviceName)
    private readonly client: ClientProxy,
    @Inject(LogService) private readonly logService: LogService,
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
    lastValueFrom(this.client.emit(queue, payload));
  }

  @EventPattern('request-log')
  async handle(@Payload() data: any, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();

    try {
      await this.logService.createLog(data);

      channel.ack(message); // ✅ success
    } catch (e) {
      channel.nack(message, false, true); // retry
    }
  }
}
