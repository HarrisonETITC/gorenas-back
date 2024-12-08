import { MigrationInterface, QueryRunner } from "typeorm";

export class Mysql1733644407258 implements MigrationInterface {
    name = 'Mysql1733644407258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rol\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`state\` varchar(1) NOT NULL DEFAULT 'A', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_642b883443b82d52f4ba99589c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ammount\` decimal(16,2) NULL, \`paymenth_method\` varchar(30) NULL DEFAULT 'efectivo', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`employee_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`address\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`branch\` (\`id\` int NOT NULL AUTO_INCREMENT, \`state\` varchar(1) NOT NULL DEFAULT 'A', \`name\` varchar(100) NOT NULL, \`address\` varchar(255) NULL, \`earnings\` decimal(16,2) NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`restaurant_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`salary\` decimal(16,2) NULL, \`state\` varchar(1) NOT NULL DEFAULT 'A', \`branch_id\` int NULL, \`person_id\` int NULL, UNIQUE INDEX \`REL_84c9ced19362dcb45e274accf8\` (\`person_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`names\` varchar(200) NULL, \`surnames\` varchar(200) NULL, \`identification\` varchar(15) NULL, \`type_identification\` varchar(4) NULL DEFAULT 'C.C', \`phone_number\` varchar(10) NULL, \`rh\` varchar(3) NULL DEFAULT 'O+', \`address\` varchar(255) NULL, \`born\` datetime NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_id\` int NULL, \`rol_id\` int NULL, UNIQUE INDEX \`REL_5157fa65538cae06e66c922c89\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usertable\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(200) NOT NULL, \`password\` varchar(255) NOT NULL, \`state\` varchar(1) NOT NULL DEFAULT 'A', \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ec985076da1c2eaa9e95ba238b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_667f785b671873c471e903e8f16\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`branch\` ADD CONSTRAINT \`FK_7e35d54aace8ab22e436039de90\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_380241ef3c0ea0a87b9411f37ff\` FOREIGN KEY (\`branch_id\`) REFERENCES \`branch\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_84c9ced19362dcb45e274accf8f\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_5157fa65538cae06e66c922c898\` FOREIGN KEY (\`user_id\`) REFERENCES \`usertable\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person\` ADD CONSTRAINT \`FK_4b8d737c7b24aa1bf8270f2d414\` FOREIGN KEY (\`rol_id\`) REFERENCES \`rol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_4b8d737c7b24aa1bf8270f2d414\``);
        await queryRunner.query(`ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_5157fa65538cae06e66c922c898\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_84c9ced19362dcb45e274accf8f\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_380241ef3c0ea0a87b9411f37ff\``);
        await queryRunner.query(`ALTER TABLE \`branch\` DROP FOREIGN KEY \`FK_7e35d54aace8ab22e436039de90\``);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_667f785b671873c471e903e8f16\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec985076da1c2eaa9e95ba238b\` ON \`usertable\``);
        await queryRunner.query(`DROP TABLE \`usertable\``);
        await queryRunner.query(`DROP INDEX \`REL_5157fa65538cae06e66c922c89\` ON \`person\``);
        await queryRunner.query(`DROP TABLE \`person\``);
        await queryRunner.query(`DROP INDEX \`REL_84c9ced19362dcb45e274accf8\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP TABLE \`branch\``);
        await queryRunner.query(`DROP TABLE \`restaurant\``);
        await queryRunner.query(`DROP TABLE \`sale\``);
        await queryRunner.query(`DROP INDEX \`IDX_642b883443b82d52f4ba99589c\` ON \`rol\``);
        await queryRunner.query(`DROP TABLE \`rol\``);
    }

}
