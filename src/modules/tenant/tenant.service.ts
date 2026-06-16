import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, QueryFailedError, Repository } from 'typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { ModifyResultDto } from '../../common/dto/create-result.dto';
import { CreateTenantDto } from '../../common/dto/create-tenant.dto';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepo: Repository<TenantEntity>,
  ) {}

  async find(query: Partial<CreateTenantDto>): Promise<TenantEntity[]> {
    return this.tenantRepo.find({
      where: query,
    });
  }

  async findById(id: string): Promise<TenantEntity> {
    const provider = await this.tenantRepo.findOne({ where: { id } });

    if (!provider) throw new NotFoundException(`Provider ${id} not found`);

    return provider;
  }

  async create(createDto: CreateTenantDto): Promise<ModifyResultDto> {
    try {
      const provider = this.tenantRepo.create(createDto);
      await this.tenantRepo.save(provider);
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
    updateDto: CreateTenantDto,
  ): Promise<ModifyResultDto> {
    const provider = await this.tenantRepo.findOneBy({ id });
    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    const duplicateCode = await this.tenantRepo.findOne({
      where: [
        { apiKey: updateDto.apiKey, id: Not(id) },
        { name: updateDto.name, id: Not(id) },
      ],
    });
    if (duplicateCode) {
      throw new NotFoundException(`Provider code duplication error`);
    }

    await this.tenantRepo.update(id, { ...updateDto, updatedAt: new Date() });
    return { result: { id }, message: 'row udpated' };
  }

  async partialUpdate(
    id: string,
    updateDto: Partial<CreateTenantDto>,
  ): Promise<ModifyResultDto> {
    const provider = await this.tenantRepo.preload({
      id,
      ...updateDto,
      updatedAt: new Date(),
    });
    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    const duplicateCode = await this.tenantRepo.findOne({
      where: [
        { apiKey: updateDto.apiKey, id: Not(id) },
        { name: updateDto.name, id: Not(id) },
      ],
    });
    if (duplicateCode) {
      throw new NotFoundException(`Provider code duplication error`);
    }

    await this.tenantRepo.save(provider);
    return { result: { id }, message: 'row partialy updated' };
  }

  async remove(id: string): Promise<ModifyResultDto> {
    const provider = await this.tenantRepo.findOneBy({ id });

    if (!provider) {
      throw new NotFoundException(`Provider ${id} not found`);
    }

    await this.tenantRepo.softDelete(id);
    return { result: { id }, message: 'provider removed' };
  }
}
