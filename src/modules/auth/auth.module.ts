import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { WalletEntity } from '../wallet/entities/entity';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, WalletEntity, TenantEntity]),
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
