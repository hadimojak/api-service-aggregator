import * as Joi from 'joi';

export const ConfigValidationSchema = Joi.object({
  PORT: Joi.number().port().default(3000),

  REDIS_HOST: Joi.string().hostname().required(),
  REDIS_PORT: Joi.number().port().default(6379),
  REDIS_PASS: Joi.string().min(6).required(),

  RABBITMQ_HOST: Joi.string().hostname().required(),
  RABBITMQ_USER: Joi.string().alphanum().min(3).required(),
  RABBITMQ_PASS: Joi.string().min(6).required(),
  RABBITMQ_PORT: Joi.number().port().default(5672),
  RBT_SERVICE_NAME: Joi.string().default('RABBITMQ_SERVICE'),
  RBT_QUEUE_NAME: Joi.string().default('API_JOB'),
}).unknown(true);
