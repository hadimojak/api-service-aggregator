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
