import { MigrationInterface, QueryRunner } from "typeorm";

export class Mysql1733679518602 implements MigrationInterface {
    name = 'Mysql1733679518602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`branch\` CHANGE \`earnings\` \`earnings\` decimal(16,2) NULL DEFAULT '0.00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`branch\` CHANGE \`earnings\` \`earnings\` decimal(16,2) NULL`);
    }

}
