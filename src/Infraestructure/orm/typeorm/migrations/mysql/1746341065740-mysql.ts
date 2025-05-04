import { MigrationInterface, QueryRunner } from "typeorm";

export class Mysql1746341065740 implements MigrationInterface {
    name = 'Mysql1746341065740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`branch\` CHANGE \`name\` \`name\` varchar(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`branch\` CHANGE \`name\` \`name\` varchar(100) NULL DEFAULT ''`);
    }

}
