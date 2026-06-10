import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigValidationSchema } from './model/configuration.schema';
import { RedisModule } from './redis/redis.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ThirdpartyModule } from './thirdparty/thirdparty.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
      validationSchema: ConfigValidationSchema,
    }),
    RedisModule,
    RabbitmqModule,
    ThirdpartyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
