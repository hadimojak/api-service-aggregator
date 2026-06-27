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
npm run mig:run:one --name=name
## tree
```
api-service-aggregator
├─ .env.example
├─ .prettierrc
├─ db_shema.pgerd
├─ docker-compose.yml
├─ eslint.config.mjs
├─ nest-cli.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.module.ts
│  ├─ common
│  │  ├─ dto
│  │  │  ├─ provider-create.dto.ts
│  │  │  ├─ provider-filtere.dto.ts
│  │  │  ├─ request-create-log.dto.ts
│  │  │  ├─ result-modify.dto.ts
│  │  │  ├─ tenant-create.dto.ts
│  │  │  └─ tenant-filter.dto.ts
│  │  ├─ guards
│  │  │  └─ tenant.auth.guard.ts
│  │  └─ types
│  │     └─ peginate-result.type.ts
│  ├─ config
│  │  ├─ config.constant.ts
│  │  ├─ config.module.ts
│  │  ├─ config.service.ts
│  │  └─ model
│  │     ├─ configuration.schema.ts
│  │     └─ env.validation.interface.ts
│  ├─ main.ts
│  ├─ modules
│  │  ├─ api
│  │  │  ├─ api.controller.ts
│  │  │  ├─ api.module.ts
│  │  │  ├─ api.service.ts
│  │  │  └─ entities
│  │  │     └─ api.entity.ts
│  │  ├─ auth
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ dto
│  │  │  │  ├─ auth-response.dto.ts
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ login.dto.ts
│  │  │  │  ├─ refresh-token.dto.ts
│  │  │  │  └─ signup.dto.ts
│  │  │  ├─ guards
│  │  │  │  ├─ jwt-auth.guard.ts
│  │  │  │  └─ roles.guard.ts
│  │  │  └─ strategies
│  │  │     ├─ jwt-refresh.strategy.ts
│  │  │     └─ jwt.strategy.ts
│  │  ├─ cache
│  │  │  └─ redis
│  │  │     ├─ redis.module.ts
│  │  │     └─ redis.service.ts
│  │  ├─ database
│  │  │  ├─ data-source.ts
│  │  │  ├─ database.module.ts
│  │  │  └─ database.service.ts
│  │  ├─ index.ts
│  │  ├─ log
│  │  │  ├─ consumers
│  │  │  │  └─ log.consumer.ts
│  │  │  ├─ entities
│  │  │  │  └─ request-log.entity.ts
│  │  │  ├─ log.module.ts
│  │  │  └─ log.service.ts
│  │  ├─ notification
│  │  │  ├─ entities
│  │  │  │  └─ notification.entity.ts
│  │  │  ├─ notification.controller.ts
│  │  │  ├─ notification.module.ts
│  │  │  └─ notification.service.ts
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
│  │  ├─ tenant
│  │  │  ├─ entities
│  │  │  │  └─ tenant.entity.ts
│  │  │  ├─ tenant.controller.ts
│  │  │  ├─ tenant.module.ts
│  │  │  └─ tenant.service.ts
│  │  ├─ user
│  │  │  ├─ entities
│  │  │  │  └─ user.entity.ts
│  │  │  ├─ user.controller.ts
│  │  │  ├─ user.module.ts
│  │  │  └─ user.service.ts
│  │  └─ wallet
│  │     ├─ entities
│  │     │  └─ wallet.entity.ts
│  │     ├─ wallet.controller.ts
│  │     ├─ wallet.module.ts
│  │     └─ wallet.service.ts
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