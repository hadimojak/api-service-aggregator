import { Injectable } from '@nestjs/common';
import { config, AppConfig } from './config.constant';

@Injectable()
export class ConfigService {
  public readonly config: AppConfig = config;
}
