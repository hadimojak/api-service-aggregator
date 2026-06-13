import { Module } from '@nestjs/common';
import { RedisModule } from './modules/cache/redis/redis.module';
import { RabbitmqModule } from './modules/queue/rabbitmq/rabbitmq.module';
import { ThirdpartyModule } from './modules/thirdparty/thirdparty.module';
import { ConfigModule } from './config/config.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
    RabbitmqModule,
    ThirdpartyModule,
    TenantModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
