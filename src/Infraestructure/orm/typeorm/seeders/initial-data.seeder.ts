import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { RoleEntity } from "../entities/role.entity";
import { RestaurantEntity } from "../entities/restaurant.entity";
import { BranchEntity } from "../entities/branch.entity";
import { PermissionEntity } from "../entities/permission.entity";
import { UserEntity } from "../entities/user.entity";
import { PersonEntity } from "../entities/person.entity";
import { EmployeeEntity } from "../entities/employee.entity";
import { SaleEntity } from "../entities/sale.entity";

// Import JSON data
import * as rolesData from "./data/roles.json";
import * as restaurantsData from "./data/restaurants.json";
import * as branchesData from "./data/branches.json";
import * as permissionsData from "./data/permissions.json";
import * as usersData from "./data/users.json";
import * as personsData from "./data/persons.json";
import * as employeesData from "./data/employees.json";
import * as salesData from "./data/sales.json";

export class InitialDataSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        console.log('🌱 Starting Initial Data Seeder...');
        
        // Order is important due to foreign key constraints
        await this.seedRoles(dataSource);
        await this.seedRestaurants(dataSource);
        await this.seedBranches(dataSource);
        await this.seedPermissions(dataSource);
        await this.seedUsers(dataSource);
        await this.seedPersons(dataSource);
        await this.seedEmployees(dataSource);
        await this.seedSales(dataSource);
        
        console.log('✅ Initial Data Seeder completed successfully!');
    }

    private async seedRoles(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(RoleEntity);
        const existingCount = await repository.count();
        
        if (existingCount > 0) {
            console.log('⏭️  Roles already exist, skipping...');
            return;
        }

        const roles = (rolesData as any).map((role: any) => ({
            id: role.id,
            name: role.name,
            state: role.state,
        }));

        await repository.save(roles);
        console.log(`✅ Seeded ${roles.length} roles`);
    }

    private async seedRestaurants(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(RestaurantEntity);
        const existingCount = await repository.count();
        
        if (existingCount > 0) {
            console.log('⏭️  Restaurants already exist, skipping...');
            return;
        }

        const restaurants = (restaurantsData as any).map((restaurant: any) => ({
            id: restaurant.id,
            name: restaurant.name,
            address: restaurant.address,
        }));

        await repository.save(restaurants);
        console.log(`✅ Seeded ${restaurants.length} restaurants`);
    }

    private async seedBranches(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(BranchEntity);
        const existingCount = await repository.count();
        
        if (existingCount > 0) {
            console.log('⏭️  Branches already exist, skipping...');
            return;
        }

        const branches = (branchesData as any).map((branch: any) => ({
            id: branch.id,
            state: branch.state,
            name: branch.name,
            address: branch.address,
            earnings: parseFloat(branch.earnings) || 0,
            restaurantId: branch.restaurant_id,
        }));

        await repository.save(branches);
        console.log(`✅ Seeded ${branches.length} branches`);
    }

    private async seedPermissions(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(PermissionEntity);
        const existingCount = await repository.count();
        
        if (existingCount > 0) {
            console.log('⏭️  Permissions already exist, skipping...');
            return;
        }

        const permissions = (permissionsData as any).map((permission: any) => ({
            id: permission.id,
            name: permission.name,
            roleId: permission.role_id,
        }));

        await repository.save(permissions);
        console.log(`✅ Seeded ${permissions.length} permissions`);
    }

    private async seedUsers(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(UserEntity);
        const existingCount = await repository.count();
        
        if (existingCount > 0) {
            console.log('⏭️  Users already exist, skipping...');
            return;
        }

        const users = (usersData as any).map((user: any) => ({
            id: user.id,
            email: user.email,
            password: user.password, // Already hashed
            state: user.state,
        }));

        await repository.save(users);
        console.log(`✅ Seeded ${users.length} users`);
    }

    private async seedPersons(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(PersonEntity);
        const existingCount = await repository.count();
        
        if (existingCount > 0) {
            console.log('⏭️  Persons already exist, skipping...');
            return;
        }

        const persons = (personsData as any).map((person: any) => ({
            id: person.id,
            names: person.names,
            surnames: person.surnames,
            identification: person.identification,
            typeIdentification: person.type_identification,
            phoneNumber: person.phone_number,
            rh: person.rh,
            address: person.address,
            born: person.born ? new Date(person.born) : null,
            userId: person.user_id,
            roleId: person.role_id,
        }));

        await repository.save(persons);
        console.log(`✅ Seeded ${persons.length} persons`);
    }

    private async seedEmployees(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(EmployeeEntity);
        const existingCount = await repository.count();
        
        if (existingCount > 0) {
            console.log('⏭️  Employees already exist, skipping...');
            return;
        }

        const employees = (employeesData as any).map((employee: any) => ({
            id: employee.id,
            salary: parseFloat(employee.salary) || 0,
            state: employee.state,
            branchId: employee.branch_id,
            personId: employee.person_id,
        }));

        await repository.save(employees);
        console.log(`✅ Seeded ${employees.length} employees`);
    }

    private async seedSales(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(SaleEntity);
        const existingCount = await repository.count();
        
        if (existingCount > 0) {
            console.log('⏭️  Sales already exist, skipping...');
            return;
        }

        const sales = (salesData as any).map((sale: any) => ({
            id: sale.id,
            amount: parseFloat(sale.amount) || 0,
            paymenthMethod: sale.paymenth_method,
            employeeId: sale.employee_id,
        }));

        await repository.save(sales);
        console.log(`✅ Seeded ${sales.length} sales`);
    }
}
