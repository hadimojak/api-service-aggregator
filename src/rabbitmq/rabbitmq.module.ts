import { Module } from '@nestjs/common';
import {
  ClientProxyFactory,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  providers: [
    {
      provide: 'RABBITMQ_SERVICE',
      inject: [ConfigService],
      useFactory: (config: ConfigService): ClientProxy =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${config.get('RABBITMQ_USER')}:${config.get('RABBITMQ_PASS')}@${config.get('RABBITMQ_HOST')}:${config.get('RABBITMQ_PORT')}`,
            ],
            queue: config.get<string>('RBT_QUEUE_NAME'),
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
