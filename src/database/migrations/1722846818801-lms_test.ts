import { MigrationInterface, QueryRunner } from "typeorm";

export class LmsTest1722846818801 implements MigrationInterface {
    name = 'LmsTest1722846818801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "sub_title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "timezone" character varying, "avatar" character varying, "googleId" character varying, "facebookId" character varying, "refreshTokenHash" character varying, "language_id" integer, "level_id" integer, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verification-code" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "verificationCode" character varying NOT NULL, "experationTime" character varying NOT NULL, "student_id" integer, CONSTRAINT "PK_490db8278c5d86481c7812034a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_c6c01790de5460c60b51ee2f3e6" FOREIGN KEY ("language_id") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_ebc3adae3c7b211f927b6403bc5" FOREIGN KEY ("level_id") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verification-code" ADD CONSTRAINT "FK_f6db5a6c762e3e4ea5ba107a162" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification-code" DROP CONSTRAINT "FK_f6db5a6c762e3e4ea5ba107a162"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_ebc3adae3c7b211f927b6403bc5"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_c6c01790de5460c60b51ee2f3e6"`);
        await queryRunner.query(`DROP TABLE "verification-code"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "level"`);
    }

}
