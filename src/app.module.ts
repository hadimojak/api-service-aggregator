import { Module } from '@nestjs/common';
import { RedisModule } from './modules/cache/redis/redis.module';
import { RabbitmqModule } from './modules/queue/rabbitmq/rabbitmq.module';
import { ConfigModule } from './config/config.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { DatabaseModule } from './modules/database/database.module';
import { ProviderModule } from './modules/provider/provider.module';
import { LogModule } from './modules/log/log.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
    RabbitmqModule,
    TenantModule,
    DatabaseModule,
    ProviderModule,
    LogModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
