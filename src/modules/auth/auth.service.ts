import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import { UserEntity } from '../user/entities/user.entity';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { WalletEntity } from '../wallet/entities/entity';
import {
  AuthResponseDto,
  LoginDto,
  RefreshTokenDto,
  SignupDto,
} from './dto/index';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(TenantEntity)
    private readonly tenantRepo: Repository<TenantEntity>,
    @InjectRepository(WalletEntity)
    private readonly walletRepo: Repository<WalletEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signup() {}

  async login() {}

  async logout() {}

  async refreshTokens() {}

  async validateUser() {}

  private async updateRefreshToken() {}

  private async generateTokens() {}
  
  async generateApiKey() {}
}
