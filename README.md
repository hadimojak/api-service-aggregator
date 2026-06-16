## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Docker

docker compose --env-file .env.dev up -d
docker compose --env-file .env.dev down -v

docker compose --env-file .env.stage up -d
docker compose --env-file .env.stage down -v

docker compose --env-file .env.prod up -d
docker compose --env-file .env.prod down -v

## enviroment

we should have three diffrent env file likes this :
.env.dev|.env.stage|.env.prod

## migrations script guide

npm run mig:gen:dev --name=name

## tree



```
api-service-aggregator
├─ .env.example
├─ .prettierrc
├─ docker-compose.yml
├─ eslint.config.mjs
├─ mailhog
│  └─ auth
├─ nest-cli.json
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.module.ts
│  ├─ common
│  │  ├─ decorators
│  │  │  └─ temp.ts
│  │  ├─ dto
│  │  │  ├─ create-provider.dto.ts
│  │  │  ├─ create-request-log.dto.ts
│  │  │  └─ create-result.dto.ts
│  │  ├─ guards
│  │  │  └─ tenant.auth.guard.ts
│  │  ├─ helpers
│  │  │  └─ temp.ts
│  │  └─ interceptors
│  │     └─ temp.ts
│  ├─ config
│  │  ├─ config.constant.ts
│  │  ├─ config.module.ts
│  │  ├─ config.service.ts
│  │  └─ model
│  │     ├─ configuration.schema.ts
│  │     └─ env.validation.interface.ts
│  ├─ main.ts
│  ├─ modules
│  │  ├─ cache
│  │  │  └─ redis
│  │  │     ├─ redis.module.ts
│  │  │     └─ redis.service.ts
│  │  ├─ database
│  │  │  ├─ data-source.ts
│  │  │  ├─ database.module.ts
│  │  │  ├─ database.service.ts
│  │  │  └─ migrations
│  │  ├─ log
│  │  │  ├─ consumers
│  │  │  │  └─ log.consumer.ts
│  │  │  ├─ entities
│  │  │  │  └─ request-log.entity.ts
│  │  │  ├─ log.module.ts
│  │  │  └─ log.service.ts
│  │  ├─ provider
│  │  │  ├─ entities
│  │  │  │  └─ provider.entity.ts
│  │  │  ├─ interfaces
│  │  │  │  └─ base-provider.interface.ts
│  │  │  ├─ provider.controller.ts
│  │  │  ├─ provider.module.ts
│  │  │  └─ provider.service.ts
│  │  ├─ queue
│  │  │  └─ rabbitmq
│  │  │     ├─ rabbitmq.module.ts
│  │  │     └─ rabbitmq.service.ts
│  │  └─ tenant
│  │     ├─ entities
│  │     │  └─ tenant.entity.ts
│  │     ├─ tenant.module.ts
│  │     └─ tenant.service.ts
│  └─ test
│     ├─ test.controller.spec.ts
│     ├─ test.controller.ts
│     ├─ test.module.ts
│     ├─ test.service.spec.ts
│     └─ test.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json

```