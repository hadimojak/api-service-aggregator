import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ConfigService } from '../../config/config.service';
import { TenantEntity } from '../tenant/entities/tenant.entity';
import { ProviderEntity } from '../provider/entities/provider.entity';
import { RequestLogEntity } from '../log/entities/request-log.entity';

export default new DataSource({
  type: 'postgres',
  host: ConfigService.config.postgress.POSTGRES_HOST,
  port: ConfigService.config.postgress.POSTGRES_PORT,
  username: ConfigService.config.postgress.POSTGRES_USER,
  password: ConfigService.config.postgress.POSTGRES_PASSWORD,
  database: ConfigService.config.postgress.POSTGRES_DB,
  entities: [
    TenantEntity,
    ProviderEntity,
    RequestLogEntity,
    // Add entities here
  ],

  migrations: ['src/modules/database/migrations/*.ts'],

  synchronize: false,

  logging: false,
});
