import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from 'src/config/config.service';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  providers: [
    {
      provide: 'RABBITMQ_SERVICE',
      inject: [ConfigService],
      useFactory: (): ClientProxy =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${ConfigService.config.rabbitmq.user}:${ConfigService.config.rabbitmq.password}@${ConfigService.config.rabbitmq.host}:${ConfigService.config.rabbitmq.port}`,
            ],
            queue: ConfigService.config.rabbitmq.queueName,
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
