import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from '../../common/dto/create-provider.dto';
import { ProviderQueryDto } from '../../common/dto/provider-query.dto';
import { UUID } from 'crypto';

@Controller('admin/provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  async providersInquiry(@Query() query: ProviderQueryDto) {
    return this.providerService.find(query);
  }

  @Get(':id')
  async providerInquiry(@Param() params: { id: UUID }) {
    return this.providerService.findById(params.id);
  }

  @Post()
  async createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Put(':id')
  async updateProvider(
    @Param() params: { id: UUID },
    @Body() updateProviderDto: CreateProviderDto,
  ) {
    return this.providerService.update(params.id, updateProviderDto);
  }

  @Patch(':id')
  async partialUpdateProvider(
    @Param() params: { id: UUID },
    @Body() partialUpdateProviderDto: Partial<CreateProviderDto>,
  ) {
    return this.providerService.partialUpdate(
      params.id,
      partialUpdateProviderDto,
    );
  }

  @Delete(':id')
  async deleteProvider(@Param() params: { id: UUID }) {
    return this.providerService.remove(params.id);
  }
}
