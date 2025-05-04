import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { TyepOrmConfig } from "../../config/ormconfig";
import { SaleFactory } from "../factories/sale.factory";
import { PersonFactory } from "../factories/person.factory";
import { UserFactory } from "../factories/user.factory";
import { SaleSeeder } from "../sale.seeder";

const options: DataSourceOptions & SeederOptions = {
    ...TyepOrmConfig.getConfig(),
    factories: [
        SaleFactory,
        PersonFactory,
        UserFactory
    ],
    seeds: [
        SaleSeeder
    ]
}

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
    await dataSource.synchronize();
    await runSeeders(dataSource);
    process.exit();
});
