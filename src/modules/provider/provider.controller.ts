import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from '../../common/dto/create-provider.dto';

@Controller('admin/provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  async providersInquiry(@Query() query: Partial<CreateProviderDto>) {
    return this.providerService.find(query);
  }

  @Get(':id')
  async providerInquiry(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Provider ID format'),
      }),
    )
    id: string,
  ) {
    return this.providerService.findById(id);
  }

  @Post()
  async createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Put(':id')
  async updateProvider(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Provider ID format'),
      }),
    )
    id: string,
    @Body() updateProviderDto: CreateProviderDto,
  ) {
    return this.providerService.update(id, updateProviderDto);
  }

  @Patch(':id')
  async partialUpdateProvider(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Provider ID format'),
      }),
    )
    id: string,
    @Body() partialUpdateProviderDto: Partial<CreateProviderDto>,
  ) {
    return this.providerService.partialUpdate(id, partialUpdateProviderDto);
  }

  @Delete(':id')
  async deleteProvider(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException('Invalid Provider ID format'),
      }),
    )
    id: string,
  ) {
    return this.providerService.remove(id);
  }
}
