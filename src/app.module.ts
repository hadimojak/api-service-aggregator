import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ThirdpartyModule } from './modules/thirdparty/thirdparty.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
    RabbitmqModule,
    ThirdpartyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
