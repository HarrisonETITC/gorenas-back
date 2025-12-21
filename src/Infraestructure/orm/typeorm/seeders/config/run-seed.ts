import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { TyepOrmConfig } from "../../config/ormconfig";
import { InitialDataSeeder } from "../initial-data.seeder";

// Import all entities
import { RoleEntity } from "../../entities/role.entity";
import { RestaurantEntity } from "../../entities/restaurant.entity";
import { BranchEntity } from "../../entities/branch.entity";
import { PermissionEntity } from "../../entities/permission.entity";
import { UserEntity } from "../../entities/user.entity";
import { PersonEntity } from "../../entities/person.entity";
import { EmployeeEntity } from "../../entities/employee.entity";
import { SaleEntity } from "../../entities/sale.entity";

const options: DataSourceOptions & SeederOptions = {
    ...TyepOrmConfig.getConfig(),
    entities: [
        RoleEntity,
        RestaurantEntity,
        BranchEntity,
        PermissionEntity,
        UserEntity,
        PersonEntity,
        EmployeeEntity,
        SaleEntity
    ],
    seeds: [
        InitialDataSeeder
    ]
}

const dataSource = new DataSource(options);

console.log('🚀 Initializing database connection...');

dataSource.initialize().then(async () => {
    console.log('📦 Synchronizing database schema...');
    await dataSource.synchronize();
    
    console.log('🌱 Running seeders...');
    await runSeeders(dataSource);
    
    console.log('🎉 Database seeding completed!');
    process.exit(0);
}).catch((error) => {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
});
