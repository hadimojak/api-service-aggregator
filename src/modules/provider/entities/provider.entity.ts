import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('provider')
export class ProviderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    length: 255,
  })
  code!: string;

  @Column()
  type!: string;

  @Column()
  baseUrl!: string;

  @Column()
  apiKey!: string;

  @Column({ default: 1 })
  priority!: number;

  @Column({
    default: true,
  })
  isActive!: boolean;

  @Column({
    default: 10000,
  })
  timeout!: number;

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
}
