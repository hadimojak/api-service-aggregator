import { ApiModule } from './api/api.module';
import { RedisModule } from './cache/redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { LogModule } from './log/log.module';
import { NotificationModule } from './notification/notification.module';
import { ProviderModule } from './provider/provider.module';
import { RabbitmqModule } from './queue/rabbitmq/rabbitmq.module';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { ConfigModule } from '../config/config.module';


export default {
  ConfigModule,
  RedisModule,
  RabbitmqModule,
  TenantModule,
  DatabaseModule,
  ProviderModule,
  LogModule,
  UserModule,
  NotificationModule,
  WalletModule,
  ApiModule,
};
