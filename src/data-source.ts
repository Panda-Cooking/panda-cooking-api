import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";
import "dotenv/config";
import path from "path";

const setDataSourceConfig = (): DataSourceOptions => {
    return {
        type: "postgres",
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSOWRD,
        port: Number(process.env.DB_PORT),
        host: process.env.DB_HOST,
        logging: true,
        synchronize: false,
        entities: [path.join(__dirname, "./entities/**.{js,ts}")],
        migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
    };
};

const configDb = setDataSourceConfig();

const AppDataSource = new DataSource(configDb);

export default AppDataSource;
