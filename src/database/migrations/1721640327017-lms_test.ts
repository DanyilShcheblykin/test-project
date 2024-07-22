import { MigrationInterface, QueryRunner } from "typeorm";

export class LmsTest1721640327017 implements MigrationInterface {
    name = 'LmsTest1721640327017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "studentsId" integer, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "timezone" character varying, "avatar" character varying, "googleId" character varying, "facebookId" character varying, "refreshTokenHash" character varying, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "verification-code" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "verificationCode" character varying NOT NULL, "experationTime" character varying NOT NULL, "student_id" integer, CONSTRAINT "PK_490db8278c5d86481c7812034a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_7d38069cef75957e8373fcaedfa" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verification-code" ADD CONSTRAINT "FK_f6db5a6c762e3e4ea5ba107a162" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification-code" DROP CONSTRAINT "FK_f6db5a6c762e3e4ea5ba107a162"`);
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_7d38069cef75957e8373fcaedfa"`);
        await queryRunner.query(`DROP TABLE "verification-code"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "language"`);
    }

}
