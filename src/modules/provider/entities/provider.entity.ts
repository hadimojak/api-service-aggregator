import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
