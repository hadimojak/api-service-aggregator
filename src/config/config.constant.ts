import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigValidationSchema } from '../model/configuration.schema';

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

// 3. Validate environment variables against schema
const { value: validatedEnv, error } = ConfigValidationSchema.validate(
  process.env,
  { abortEarly: false, stripUnknown: false },
);

if (error) {
  const errorMessages = error.details
    .map((detail) => `${detail.context?.key}: ${detail.message}`)
    .join(', ');
  throw new Error(`Environment validation failed: ${errorMessages}`);
}

// 4. Define the config object with validated values
export const config = {
  env,
  app: {
    port: validatedEnv.PORT ,
  },
  redis: {
    host: validatedEnv.HOST_REDIS ,
    port: validatedEnv.REDIS_PORT ,
    password: validatedEnv.REDIS_PASS ,
  },
  rabbitmq: {
    host: validatedEnv.RABBITMQ_HOST ,
    port: validatedEnv.RABBITMQ_PORT ,
    user: validatedEnv.RABBITMQ_USER ,
    password: validatedEnv.RABBITMQ_PASS ,
    serviceName: validatedEnv.RBT_SERVICE_NAME ,
    queueName: validatedEnv.RBT_QUEUE_NAME ,
  },
} as const;

export type AppConfig = typeof config;
