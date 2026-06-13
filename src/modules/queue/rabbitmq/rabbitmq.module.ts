import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '../../../config/config.service';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  providers: [
    {
      provide: ConfigService.config.rabbitmq.serviceName,
      useFactory: (): ClientProxy =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,

          
          options: {
            urls: [
              `amqp://${ConfigService.config.rabbitmq.user}:${ConfigService.config.rabbitmq.password}@${ConfigService.config.rabbitmq.host}:${ConfigService.config.rabbitmq.port}`,
            ],
            queue: ConfigService.config.rabbitmq.defaultQueueName,
            queueOptions: { durable: true },
            noAck: true,
          },
        }),
    },
    RabbitmqService,
  ],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
