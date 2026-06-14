import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderEntity } from './entities/provider.entity';
import { ProviderController } from './provider.controller';

@Module({
  providers: [ProviderService],
  imports: [HttpModule, TypeOrmModule.forFeature([ProviderEntity])],
  exports: [ProviderService],
  controllers: [ProviderController],
})
export class ProviderModule {}
