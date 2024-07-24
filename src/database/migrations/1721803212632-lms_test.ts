import { MigrationInterface, QueryRunner } from "typeorm";

export class LmsTest1721803212632 implements MigrationInterface {
    name = 'LmsTest1721803212632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_7d38069cef75957e8373fcaedfa"`);
        await queryRunner.query(`ALTER TABLE "language" DROP COLUMN "studentsId"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "languageId" integer`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_4807678ec79da9ed2c94df5a7bc" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_4807678ec79da9ed2c94df5a7bc"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "languageId"`);
        await queryRunner.query(`ALTER TABLE "language" ADD "studentsId" integer`);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_7d38069cef75957e8373fcaedfa" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
