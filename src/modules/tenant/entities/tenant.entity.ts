import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
