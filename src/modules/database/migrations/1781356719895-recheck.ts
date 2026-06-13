import { MigrationInterface, QueryRunner } from "typeorm";

export class Recheck1781356719895 implements MigrationInterface {
    name = 'Recheck1781356719895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "apiKey" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "rateLimitPerMin" integer NOT NULL DEFAULT '100', "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_30dec5cd2d1f58a2682a9c77bb8" UNIQUE ("apiKey"), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(255) NOT NULL, "type" character varying NOT NULL, "baseUrl" character varying NOT NULL, "apiKey" character varying NOT NULL, "priority" integer NOT NULL DEFAULT '1', "isActive" boolean NOT NULL DEFAULT true, "timeout" integer NOT NULL DEFAULT '10000', "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenantId" character varying NOT NULL, "providerName" character varying NOT NULL, "endpoint" character varying NOT NULL, "request" json, "response" json, "status" integer NOT NULL, "latency" integer NOT NULL, "errorMessage" character varying, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_1edd3815ae37a9b9511f5a26dca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "request_logs"`);
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
    }

}
