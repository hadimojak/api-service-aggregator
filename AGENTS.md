# AGENTS — AI agent guidance for this repository

Purpose: give concise, actionable context so an AI coding agent can be immediately productive. This file is minimal by design — links point to detailed docs in the repo.

**Quick commands**
- **Install:** `npm install` — see [package.json](package.json) for scripts.
- **Dev:** `npm run start:dev`
- **Build:** `npm run build`
- **Tests:** `npm run test`, `npm run test:e2e` — e2e config at [test/jest-e2e.json](test/jest-e2e.json).
- **Docker:** use `docker compose --env-file .env.dev up -d` (see [README.md](README.md)).

**Network-focused (argument: "netwrok")**
- **Where network code lives:** [src/rabbitmq](src/rabbitmq) (RabbitMQ client/service), [src/redis](src/redis) (Redis client/service), and [src/thirdparty](src/thirdparty) for external integrations.
- **Dependencies:** `amqplib`, `amqp-connection-manager`, and `ioredis` — declared in [package.json](package.json).
- **How to run integration flows locally:** spin up RabbitMQ + Redis via `docker compose` (see [docker-compose.yml](docker-compose.yml)) or provide reachable service URLs in `.env.*` files. The repo expects `.env.dev`, `.env.stage`, `.env.prod` (see [README.md](README.md)).
- **Common pitfalls:** missing env files, wrong ports, or RabbitMQ/Redis not running — prefer Docker for reproducible local environment.

**Agent behavior & conventions**
- Prefer linking to existing docs (this file, `README.md`, `package.json`) rather than copying large sections.
- Run `npm run lint` and `npm run format` on changes. Respect ESLint and Prettier config (see `eslint.config.mjs`).
- For refactors touching networking modules, include a short integration plan: how to run services, which env vars to set, and relevant tests to run (unit + e2e).

**Where to look first**
- Project entry: [src/main.ts](src/main.ts)
- App module: [src/app.module.ts](src/app.module.ts)
- RabbitMQ: [src/rabbitmq/rabbitmq.module.ts](src/rabbitmq/rabbitmq.module.ts)
- Redis: [src/redis/redis.module.ts](src/redis/redis.module.ts)

**Suggestions for next customizations**
- Add a small `netwrok.skill.md` (or `skills/network.md`) that automates: starting Docker services, running integration tests, and collecting logs for RabbitMQ/Redis failures.
- Add `.github/copilot-instructions.md` if maintainers prefer that location for top-level guidance.

If this looks good, I can add the `netwrok` skill file and a small runnable script that starts Docker services and runs e2e tests.
