import { Body, Controller, Post } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from '../../common/dto/create-provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  async createProvider(@Body() createProviderDto: CreateProviderDto) {
    this.providerService.create(createProviderDto);
  }
}
