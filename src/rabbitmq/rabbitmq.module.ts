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
      useFactory: (configService: ConfigService): ClientProxy =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.config.rabbitmq.user}:${configService.config.rabbitmq.password}@${configService.config.rabbitmq.host}:${configService.config.rabbitmq.port}`,
            ],
            queue: configService.config.rabbitmq.queueName,
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
