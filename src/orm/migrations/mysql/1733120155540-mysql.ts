import { MigrationInterface, QueryRunner } from "typeorm";

export class Mysql1733120155540 implements MigrationInterface {
    name = 'Mysql1733120155540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`restaurante\` (\`id\` int NOT NULL AUTO_INCREMENT, \`direccion\` varchar(255) NULL, \`ganancias_totales\` decimal(16,2) NULL, \`ganancias_mes\` decimal(16,2) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sucursal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`direccion\` varchar(255) NULL, \`estado\` varchar(1) NOT NULL DEFAULT 'A', \`ganancias_mes\` decimal(16,2) NULL, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_modif\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`restaurante_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(200) NOT NULL, \`pass\` varchar(255) NOT NULL, \`estado\` varchar(1) NOT NULL DEFAULT 'A', \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rol\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(20) NOT NULL, \`estado\` varchar(1) NOT NULL DEFAULT 'A', \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_modif\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`persona\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombres\` varchar(200) NULL, \`apellidos\` varchar(200) NULL, \`tipo_identificacion\` varchar(4) NULL DEFAULT 'CC', \`identificacion\` varchar(15) NULL, \`numero_contacto\` varchar(10) NULL, \`rh\` varchar(3) NULL DEFAULT 'O+', \`direccion\` varchar(255) NULL, \`nacimiento\` datetime NULL, \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`usuario_id\` int NULL, \`rol_id\` int NULL, UNIQUE INDEX \`REL_642a3bd8cad3ad30de0718804c\` (\`usuario_id\`), UNIQUE INDEX \`REL_f0d933053c893098fadf81956d\` (\`rol_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`empleado\` (\`id\` int NOT NULL AUTO_INCREMENT, \`salario\` decimal(16,2) NULL, \`estado\` varchar(1) NOT NULL DEFAULT 'A', \`sucursal_id\` int NULL, \`persona_id\` int NULL, UNIQUE INDEX \`REL_3bd74b82a6501fa611f1e8c1c7\` (\`persona_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`venta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`monto\` decimal(16,2) NULL, \`metodo_pago\` varchar(30) NULL DEFAULT 'efectivo', \`fecha_creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`fecha_modif\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`empleado_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sucursal\` ADD CONSTRAINT \`FK_1340c349622eb6fc7519d75e8e6\` FOREIGN KEY (\`restaurante_id\`) REFERENCES \`restaurante\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`persona\` ADD CONSTRAINT \`FK_642a3bd8cad3ad30de0718804c9\` FOREIGN KEY (\`usuario_id\`) REFERENCES \`usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`persona\` ADD CONSTRAINT \`FK_f0d933053c893098fadf81956d6\` FOREIGN KEY (\`rol_id\`) REFERENCES \`rol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`empleado\` ADD CONSTRAINT \`FK_49778622b1c20506be43d01066b\` FOREIGN KEY (\`sucursal_id\`) REFERENCES \`sucursal\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`empleado\` ADD CONSTRAINT \`FK_3bd74b82a6501fa611f1e8c1c7f\` FOREIGN KEY (\`persona_id\`) REFERENCES \`persona\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`venta\` ADD CONSTRAINT \`FK_3fbf749bbabc70bc63b8f287610\` FOREIGN KEY (\`empleado_id\`) REFERENCES \`empleado\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`venta\` DROP FOREIGN KEY \`FK_3fbf749bbabc70bc63b8f287610\``);
        await queryRunner.query(`ALTER TABLE \`empleado\` DROP FOREIGN KEY \`FK_3bd74b82a6501fa611f1e8c1c7f\``);
        await queryRunner.query(`ALTER TABLE \`empleado\` DROP FOREIGN KEY \`FK_49778622b1c20506be43d01066b\``);
        await queryRunner.query(`ALTER TABLE \`persona\` DROP FOREIGN KEY \`FK_f0d933053c893098fadf81956d6\``);
        await queryRunner.query(`ALTER TABLE \`persona\` DROP FOREIGN KEY \`FK_642a3bd8cad3ad30de0718804c9\``);
        await queryRunner.query(`ALTER TABLE \`sucursal\` DROP FOREIGN KEY \`FK_1340c349622eb6fc7519d75e8e6\``);
        await queryRunner.query(`DROP TABLE \`venta\``);
        await queryRunner.query(`DROP INDEX \`REL_3bd74b82a6501fa611f1e8c1c7\` ON \`empleado\``);
        await queryRunner.query(`DROP TABLE \`empleado\``);
        await queryRunner.query(`DROP INDEX \`REL_f0d933053c893098fadf81956d\` ON \`persona\``);
        await queryRunner.query(`DROP INDEX \`REL_642a3bd8cad3ad30de0718804c\` ON \`persona\``);
        await queryRunner.query(`DROP TABLE \`persona\``);
        await queryRunner.query(`DROP TABLE \`rol\``);
        await queryRunner.query(`DROP INDEX \`IDX_2863682842e688ca198eb25c12\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP TABLE \`sucursal\``);
        await queryRunner.query(`DROP TABLE \`restaurante\``);
    }

}
