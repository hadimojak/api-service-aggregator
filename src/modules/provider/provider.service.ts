import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderEntity } from './entities/provider.entity';
import { CreateProviderDto } from '../../common/dto/create-provider.dto';
import { ModifyResultDto } from '../../common/dto/create-result.dto';
import { UUID } from 'crypto';
import { ProviderQueryDto } from '../../common/dto/provider-query.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepo: Repository<ProviderEntity>,
  ) {}

  async find(query: ProviderQueryDto): Promise<ProviderEntity[] | []> {
    return this.providerRepo.find({
      where: query,
      order: { priority: 'ASC' },
    });
  }

  async findById(id: UUID): Promise<ProviderEntity> {
    const provider = await this.providerRepo.findOne({ where: { id } });

    if (!provider) throw new NotFoundException(`Provider ${id} not found`);

    return provider;
  }

  async create(createDto: CreateProviderDto): Promise<ModifyResultDto> {
    const existing = await this.providerRepo.findOneBy({
      code: createDto.code,
    });
    if (existing) {
      throw new ConflictException(
        `Provider with code ${createDto.code} already exists`,
      );
    }

    const provider = this.providerRepo.create(createDto);
    await this.providerRepo.save(provider);
    return { result: { id: <UUID>provider.id }, message: 'row created' };
  }

  async update(
    id: UUID,
    updateDto: CreateProviderDto,
  ): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.findOneBy({ id });
    if (!provider) {
      throw new NotFoundException(
        `Provider with code ${updateDto.code} not exists`,
      );
    }

    await this.providerRepo.save(updateDto);
    return { result: { id }, message: 'row udpated' };
  }

  async partialUpdate(
    id: UUID,
    updateDto: Partial<CreateProviderDto>,
  ): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.preload({ id, ...updateDto });
    if (!provider) {
      throw new NotFoundException(
        `Provider with code ${updateDto.code} not exists`,
      );
    }

    await this.providerRepo.save(provider);
    return { result: { id }, message: 'row partialy updated' };
  }

  async remove(id: UUID): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.findOne({ where: { id } });

    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    await this.providerRepo.softDelete(id);
    return { result: { id }, message: 'provider removed' };
  }
}
