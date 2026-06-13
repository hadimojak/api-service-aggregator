import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ThirdpartyService } from './thirdparty.service';
import { CreateThirdPartyDto } from '../../common/dto/create-thirdparty.dto';

@Controller('api')
export class ThirdpartyController {
  constructor(private readonly service: ThirdpartyService) {}

  @Get('health')
  health() {
    return this.service.health();
  }

  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() dto: CreateThirdPartyDto) {
    return this.service.createUser(dto);
  }

  @Post('carIns')
  @HttpCode(HttpStatus.CREATED)
  carInsurance() {
    return this.service.carInsurance();
  }
}
