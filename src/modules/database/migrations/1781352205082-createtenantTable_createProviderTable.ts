import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatetenantTableCreateProviderTable1781352205082 implements MigrationInterface {
    name = 'CreatetenantTableCreateProviderTable1781352205082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "apiKey" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "rateLimitPerMin" integer NOT NULL DEFAULT '100', CONSTRAINT "UQ_30dec5cd2d1f58a2682a9c77bb8" UNIQUE ("apiKey"), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(255) NOT NULL, "type" character varying NOT NULL, "baseUrl" character varying NOT NULL, "apiKey" character varying NOT NULL, "priority" integer NOT NULL DEFAULT '1', "isActive" boolean NOT NULL DEFAULT true, "timeout" integer NOT NULL DEFAULT '10000', CONSTRAINT "PK_6ab2f66d8987bf1bfdd6136a2d5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "provider"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
    }

}
