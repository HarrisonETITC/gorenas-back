import { config } from "dotenv";
import { DataSourceOptions } from "typeorm";

config();
export class TyepOrmConfig {
    private static readonly optsmysqldev: DataSourceOptions = {
        type: 'mysql',
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
        connectTimeout: 60000,
        entities: ['dist/src/Infraestructure/**/*.entity.js'],
        ssl: true,
        extra: {
            ssl: {
                rejectUnauthorized: false
            },
            multipleStatements: true
        },
        synchronize: false,
        logging: ["error", "query"],
        migrationsRun: false,
        migrations: ['dist/src/Infraestructure/**/*-mysql.js'],
        dropSchema: false,
        migrationsTableName: 'migrations'
    }

    private static readonly optsmysqlprod: DataSourceOptions = {
        type: 'mysql',
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
        connectTimeout: 60000,
        entities: ['dist/src/Infraestructure/**/*.entity.js'],
        ssl: true,
        logging: ["error", "query"],
        synchronize: false,
        migrationsRun: true,
        migrations: ['dist/src/Infraestructure/**/*-mysql.js'],
        dropSchema: false,
        migrationsTableName: 'migrations',
        extra: {
            multipleStatements: true
        }
    }

    public static getConfig() {
        if (process.env.ENVIRONMENT === 'dev') {
            return this.optsmysqldev;
        }

        return this.optsmysqlprod;
    }
}

