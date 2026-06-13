import { MigrationInterface, QueryRunner } from 'typeorm';

export class RequestlogTable1781352697488 implements MigrationInterface {
  name = 'RequestlogTable1781352697488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "request_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenantId" character varying NOT NULL, "providerName" character varying NOT NULL, "endpoint" character varying NOT NULL, "request" json, "response" json, "status" integer NOT NULL, "latency" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_1edd3815ae37a9b9511f5a26dca" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "request_logs"`);
  }
}
