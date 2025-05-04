import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { EmployeeEntity } from "../entities/employee.entity";
import { StateModel } from "@Domain/models/general/state.model";
import { SaleEntity } from "../entities/sale.entity";
import { faker } from "@faker-js/faker";

export class SaleSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const employeeRepository = dataSource.getRepository(EmployeeEntity);
        const saleRepository = dataSource.getRepository(SaleEntity);

        const availableEmployees = await employeeRepository.createQueryBuilder("e")
            .innerJoin("e.person", "p")
            .innerJoin("p.user", "u")
            .innerJoin("p.role", "r", "r.id = :roleId AND r.state = :roleState", { roleId: 4, roleState: StateModel.STATE_ACTIVE })
            .where("e.state = :state", { state: StateModel.STATE_ACTIVE })
            .andWhere("u.state = :state", { state: StateModel.STATE_ACTIVE })
            .getMany();

        const salesFactory = factoryManager.get(SaleEntity);
        const sales = await Promise.all(
            Array(30)
                .fill(null)
                .map(async () => {
                    const sale = await salesFactory.make({
                        employeeId: faker.helpers.arrayElement(availableEmployees).id
                    })
                    return sale;
                })
        )

        await saleRepository.save(await Promise.all(saleRepository.create(sales)));
    }
}