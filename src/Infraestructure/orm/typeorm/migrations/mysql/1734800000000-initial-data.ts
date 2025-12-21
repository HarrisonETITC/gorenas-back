import { MigrationInterface, QueryRunner } from "typeorm";

// Data exported from existing database
const roles = [{"id": 1, "name": "administrador", "state": "A"}, {"id": 2, "name": "gerente", "state": "A"}, {"id": 3, "name": "propietario", "state": "A"}, {"id": 4, "name": "cajero", "state": "A"}];

const restaurants = [{"id": 1, "name": "Gorenas Central", "address": "Calle real en avenida principal"}];

const permissions = [{"id": 1, "name": "all_modules:general:deactivate", "role_id": 1}, {"id": 3, "name": "all_modules:general:create", "role_id": 3}];

export class InitialDataMigration1734800000000 implements MigrationInterface {
    name = 'InitialDataMigration1734800000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if data already exists
        const existingRoles = await queryRunner.query(`SELECT COUNT(*) as count FROM role`);
        if (existingRoles[0].count > 0) {
            console.log('⏭️  Initial data already exists, skipping migration...');
            return;
        }

        // Insert Roles
        for (const role of roles) {
            await queryRunner.query(
                `INSERT INTO role (id, name, state, created, modified) VALUES (?, ?, ?, NOW(), NOW())`,
                [role.id, role.name, role.state]
            );
        }
        console.log(`✅ Inserted ${roles.length} roles`);

        // Insert Restaurants
        for (const restaurant of restaurants) {
            await queryRunner.query(
                `INSERT INTO restaurant (id, name, address) VALUES (?, ?, ?)`,
                [restaurant.id, restaurant.name, restaurant.address]
            );
        }
        console.log(`✅ Inserted ${restaurants.length} restaurants`);

        // Insert Permissions
        for (const permission of permissions) {
            await queryRunner.query(
                `INSERT INTO permission (id, name, role_id, created) VALUES (?, ?, ?, NOW())`,
                [permission.id, permission.name, permission.role_id]
            );
        }
        console.log(`✅ Inserted ${permissions.length} permissions`);

        console.log('🎉 Initial data migration completed!');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete in reverse order due to foreign key constraints
        await queryRunner.query(`DELETE FROM permission WHERE id IN (1, 3)`);
        await queryRunner.query(`DELETE FROM restaurant WHERE id = 1`);
        await queryRunner.query(`DELETE FROM role WHERE id IN (1, 2, 3, 4)`);
        
        console.log('🔄 Initial data migration reverted!');
    }
}
