// src/modules/user/entities/user.entity.ts
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TenantEntity } from '../../tenant/entities/tenant.entity';

export enum UserRole {
  ADMIN = 'admin',
  TENANT = 'tenant',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true, length: 255 })
  email!: string;

  @Column({ length: 10, unique: true })
  phoneNumber!: string;

  @Column({ length: 255 })
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TENANT,
  })
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  refreshTokenHash!: string | null;

  // nullable: admin users may not have a tenant
  @OneToOne(() => TenantEntity, (tenant) => tenant.user, {
    nullable: true,
    eager: false,
  })
  @JoinColumn()
  tenant?: TenantEntity | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;
}
