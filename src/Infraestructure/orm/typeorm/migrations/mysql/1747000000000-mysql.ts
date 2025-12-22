import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from "fs";
import * as path from "path";

export class Mysql1747000000000 implements MigrationInterface {
    name = 'Mysql1747000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const filePath = path.join(__dirname, 'data.sql');

        const sql = fs.readFileSync(filePath, 'utf-8');

        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`delete from sale`);
        await queryRunner.query('delete from permission');
        await queryRunner.query(`delete from employee`);
        await queryRunner.query(`delete from person`);
        await queryRunner.query(`delete from branch`);
        await queryRunner.query(`delete from role`);
        await queryRunner.query(`delete from usertable`);
        await queryRunner.query(`delete from restaurant`);
    }

}
