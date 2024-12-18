import { MigrationInterface, QueryRunner } from "typeorm";

export class Mysql1734487007254 implements MigrationInterface {
    name = 'Mysql1734487007254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(200) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`role_id\` int NOT NULL, UNIQUE INDEX \`UQ_permission_name_role_id\` (\`name\`, \`role_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_383892d758d08d346f837d3d8b7\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_383892d758d08d346f837d3d8b7\``);
        await queryRunner.query(`DROP INDEX \`UQ_permission_name_role_id\` ON \`permission\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
