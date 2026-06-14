import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, QueryFailedError, Repository } from 'typeorm';
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
    try {
      const provider = this.providerRepo.create(createDto);
      await this.providerRepo.save(provider);
      return { result: { id: provider.id }, message: 'row created' };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const driverError = error.driverError;

        if (driverError?.code === '23505') {
          throw new ConflictException(
            'Provider code or baseUrl already exists',
          );
        }
      }

      throw new BadRequestException('Failed to create provider');
    }
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
      where: [
        { code: updateDto.code, id: Not(id) },
        { baseUrl: updateDto.baseUrl, id: Not(id) },
      ],
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
      where: [
        { code: updateDto.code, id: Not(id) },
        { baseUrl: updateDto.baseUrl, id: Not(id) },
      ],
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
