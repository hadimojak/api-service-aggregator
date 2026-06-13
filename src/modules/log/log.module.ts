import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLogEntity } from './entities/request-log.entity';
import { LogService } from './log.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestLogEntity])],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
