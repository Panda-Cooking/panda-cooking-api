import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";
import "dotenv/config";
import path from "path";

const setDataSourceConfig = (): DataSourceOptions => {
    const nodeEnv = process.env.NODE_ENV;
    const entitiesPath = path.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath = path.join(__dirname, "./migrations/**.{js,ts}");

    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [entitiesPath],
            migrations: [migrationsPath],
        };
    }

    if (nodeEnv === "tests") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath],
        };
    }

    return {
        type: "postgres",
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSOWRD,
        port: Number(process.env.DB_PORT),
        host: process.env.DB_HOST,
        logging: true,
        synchronize: false,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    };
};

const configDb = setDataSourceConfig();

const AppDataSource = new DataSource(configDb);

export default AppDataSource;
