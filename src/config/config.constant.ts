import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// 1. Determine the environment
const env = process.env.APP_ENV || 'dev';
const filename = `.env.${env}`;
const filePath = path.resolve(process.cwd(), filename);

// 2. Load the specific file
if (fs.existsSync(filePath)) {
  dotenv.config({ path: filePath });
} else {
  throw new Error(`Environment file ${filename} not found!`);
}

// 3. Define the config object
export const config = {
  env,
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
  },
  redis: {
    host: process.env.HOST_REDIS || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASS || '',
  },
  rabbitmq: {
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: parseInt(process.env.RABBITMQ_PORT || '4067', 10),
    user: process.env.RABBITMQ_USER || '',
    password: process.env.RABBITMQ_PASS || '',
    serviceName: process.env.RBT_SERVICE_NAME || '',
    queueName: process.env.RBT_QUEUE_NAME || '',
  },
} as const;

export type AppConfig = typeof config;
