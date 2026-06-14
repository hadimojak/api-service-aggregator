import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request_log')
export class RequestLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  tenantId!: string;

  @Column()
  providerName!: string;

  @Column()
  endpoint!: string;

  @Column('json', { nullable: true })
  request: any;

  @Column('json', { nullable: true })
  response: any;

  @Column()
  status!: number;

  @Column()
  latency!: number;

  @Column({
    nullable: true,
  })
  errorMessage?: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
