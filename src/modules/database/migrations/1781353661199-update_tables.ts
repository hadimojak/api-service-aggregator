import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1781353661199 implements MigrationInterface {
    name = 'UpdateTables1781353661199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" ADD "createdAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "updatedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider" ADD "createdAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "provider" ADD "updatedAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "request_logs" ADD "errorMessage" character varying`);
        await queryRunner.query(`ALTER TABLE "request_logs" ADD "updatedAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_logs" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "request_logs" DROP COLUMN "errorMessage"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "provider" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "createdAt"`);
    }

}
