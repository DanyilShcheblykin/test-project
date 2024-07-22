import { MigrationInterface, QueryRunner } from "typeorm";

export class LmsTest1720770387524 implements MigrationInterface {
    name = 'LmsTest1720770387524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "timezone" character varying, "avatar" character varying, "googleId" character varying, "facebookId" character varying, "refreshTokenHash" character varying, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verification-code" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "verificationCode" character varying NOT NULL, "experationTime" character varying NOT NULL, "student_id" integer, CONSTRAINT "PK_490db8278c5d86481c7812034a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "verification-code" ADD CONSTRAINT "FK_f6db5a6c762e3e4ea5ba107a162" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification-code" DROP CONSTRAINT "FK_f6db5a6c762e3e4ea5ba107a162"`);
        await queryRunner.query(`DROP TABLE "verification-code"`);
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
