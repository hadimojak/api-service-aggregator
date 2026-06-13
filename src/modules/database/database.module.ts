import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';

@Module({
  providers: [DatabaseService],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: ConfigService.config.postgress.POSTGRES_HOST,
        port: ConfigService.config.postgress.POSTGRES_PORT,
        username: ConfigService.config.postgress.POSTGRES_USER,
        password: ConfigService.config.postgress.POSTGRES_PASSWORD,
        database: ConfigService.config.postgress.POSTGRES_DB,
        synchronize: false,
        logging: false,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
  ],
})
export class DatabaseModule {}
