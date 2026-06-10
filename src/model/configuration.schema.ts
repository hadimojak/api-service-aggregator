import * as Joi from 'joi';

export const ConfigValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  HOST_REDIS: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASS: Joi.string().required(),

  RABBITMQ_HOST: Joi.string().required(),
  RABBITMQ_USER: Joi.string().required(),
  RABBITMQ_PASS: Joi.string().required(),
  RABBITMQ_PORT: Joi.number().default(5672),
  RBT_SERVICE_NAME: Joi.string().default('RABBITMQ_SERVICE'),
  RBT_QUEUE_NAME: Joi.string().default('API_JOB'),
});
