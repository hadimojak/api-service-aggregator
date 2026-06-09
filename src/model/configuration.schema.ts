import * as Joi from 'joi';

export const ConfigValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  HOST_REDIS: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASS: Joi.string().required(),

  RABBITMQ_URL: Joi.string().required(),
  RABBITMQ_USER: Joi.string().required(),
  RABBITMQ_PASS: Joi.string().required(),
  RABBITMQ_PORT: Joi.number().default(5672),
  RABBITMQ_MGMT_PORT: Joi.number().default(15672),
});
