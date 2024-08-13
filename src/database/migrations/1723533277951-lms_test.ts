import { MigrationInterface, QueryRunner } from "typeorm";

export class LmsTest1723533277951 implements MigrationInterface {
    name = 'LmsTest1723533277951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "path" character varying NOT NULL, "teacher_id" integer NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "teachers" ADD "typeOfTeacher" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "verification-code" ADD "teacher_id" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_3bc0503bc78a4fc7165e5a1a69d" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "verification-code" ADD CONSTRAINT "FK_13029df13830e919b397254086b" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification-code" DROP CONSTRAINT "FK_13029df13830e919b397254086b"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_3bc0503bc78a4fc7165e5a1a69d"`);
        await queryRunner.query(`ALTER TABLE "verification-code" DROP COLUMN "teacher_id"`);
        await queryRunner.query(`ALTER TABLE "teachers" DROP COLUMN "typeOfTeacher"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
