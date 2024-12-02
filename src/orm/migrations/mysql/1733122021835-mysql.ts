import { MigrationInterface, QueryRunner } from "typeorm";

export class Mysql1733122021835 implements MigrationInterface {
    name = 'Mysql1733122021835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`pass\` \`contrasena\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`contrasena\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`contrasena\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`contrasena\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`contrasena\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`contrasena\` \`pass\` varchar(255) NOT NULL`);
    }

}
