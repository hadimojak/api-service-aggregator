import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('tenant')
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 255,
  })
  name!: string;

  @Column({
    unique: true,
  })
  apiKey!: string;

  @Column({
    default: true,
  })
  isActive!: boolean;

  @Column({ default: 100 })
  rateLimitPerMin!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;

  @OneToOne(() => UserEntity, (user) => user.tenant, { nullable: true })
  user?: UserEntity;
}
