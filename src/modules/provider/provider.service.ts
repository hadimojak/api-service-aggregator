import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ProviderEntity } from './entities/provider.entity';
import { CreateProviderDto } from '../../common/dto/create-provider.dto';
import { ModifyResultDto } from '../../common/dto/create-result.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepo: Repository<ProviderEntity>,
  ) {}

  async find(query: Partial<CreateProviderDto>): Promise<ProviderEntity[]> {
    return this.providerRepo.find({
      where: query,
      order: { priority: 'ASC' },
    });
  }

  async findById(id: string): Promise<ProviderEntity> {
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
    return { result: { id: provider.id }, message: 'row created' };
  }

  async update(
    id: string,
    updateDto: CreateProviderDto,
  ): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.findOneBy({ id });
    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    const duplicateCode = await this.providerRepo.findOne({
      where: { code: updateDto.code, id: Not(id) },
    });
    if (duplicateCode) {
      throw new NotFoundException(`Provider code duplication error`);
    }

    await this.providerRepo.update(id, { ...updateDto, updatedAt: new Date() });
    return { result: { id }, message: 'row udpated' };
  }

  async partialUpdate(
    id: string,
    updateDto: Partial<CreateProviderDto>,
  ): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.preload({
      id,
      ...updateDto,
      updatedAt: new Date(),
    });
    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    const duplicateCode = await this.providerRepo.findOne({
      where: { code: updateDto.code, id: Not(id) },
    });
    if (duplicateCode) {
      throw new NotFoundException(`Provider code duplication error`);
    }

    await this.providerRepo.save(provider);
    return { result: { id }, message: 'row partialy updated' };
  }

  async remove(id: string): Promise<ModifyResultDto> {
    const provider = await this.providerRepo.findOneBy({ id });

    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    await this.providerRepo.softDelete(id);
    return { result: { id }, message: 'provider removed' };
  }
}
