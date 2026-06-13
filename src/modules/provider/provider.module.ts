import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderEntity } from './entities/provider.entity';

@Module({
  providers: [ProviderService],
  imports: [HttpModule, TypeOrmModule.forFeature([ProviderEntity])],
  exports: [ProviderService],
})
export class ProviderModule {}
