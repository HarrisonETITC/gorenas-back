import { DataSource } from "typeorm";
import { TyepOrmConfig } from "./ormconfig";

const source: DataSource = new DataSource(TyepOrmConfig.getConfig());
if (!source.isInitialized)
    source.initialize();

export default source;

export const dbProviders = [
    {
        provide: DataSource,
        useFactory: async () => {
            const dataSource = new DataSource(TyepOrmConfig.getConfig());
            try {
                if (!dataSource.isInitialized) {
                    await dataSource.initialize();
                }
            } catch (error) {
                console.log(error?.message);
            }
            return dataSource;
        }
    }
]
