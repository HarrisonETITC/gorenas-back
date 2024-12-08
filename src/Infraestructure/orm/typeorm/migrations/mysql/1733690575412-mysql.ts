import { MigrationInterface, QueryRunner } from "typeorm";

export class Mysql1733690575412 implements MigrationInterface {
    name = 'Mysql1733690575412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_4b8d737c7b24aa1bf8270f2d414\``);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`rol_id\` \`role_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`ammount\` \`amount\` decimal(16,2) NULL`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`state\` varchar(1) NOT NULL DEFAULT 'A', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_7dfed12a35115c66c0ab0c22b0d\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_7dfed12a35115c66c0ab0c22b0d\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`amount\` \`ammount\` decimal(16,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` CHANGE \`role_id\` \`rol_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_4b8d737c7b24aa1bf8270f2d414\` FOREIGN KEY (\`rol_id\`) REFERENCES \`rol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
