import { Module } from '@nestjs/common';
import { ThirdpartyController } from './thirdparty.controller';
import { ThirdpartyService } from './thirdparty.service';

@Module({
  controllers: [ThirdpartyController],
  providers: [ThirdpartyService],
  exports: [ThirdpartyService],
})
export class ThirdpartyModule {}
