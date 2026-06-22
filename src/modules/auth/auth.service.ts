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
export class AuthService {}
