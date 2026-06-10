import { Controller, Post, Body, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ThirdpartyService } from './thirdparty.service';
import { CreateThirdPartyDto } from './dto/create-thirdparty.dto';

@Controller('thirdparty')
export class ThirdpartyController {
  constructor(private readonly service: ThirdpartyService) {}

  @Get('health')
  health() {
    return this.service.health();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateThirdPartyDto) {
    return this.service.create(dto);
  }
}
