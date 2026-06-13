import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request_logs')
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

  @Column()
  createdAt!: Date;
}
