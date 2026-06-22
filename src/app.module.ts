import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { AuthModule } from './modules/auth/auth.module';
import modules from './modules/index';

@Module({
  imports: [
    modules.ConfigModule,
    modules.RedisModule,
    modules.RabbitmqModule,
    modules.TenantModule,
    modules.DatabaseModule,
    modules.ProviderModule,
    modules.LogModule,
    TestModule,
    modules.UserModule,
    modules.NotificationModule,
    modules.WalletModule,
    modules.ApiModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
