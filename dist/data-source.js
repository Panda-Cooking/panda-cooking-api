"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("reflect-metadata");
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const setDataSourceConfig = () => {
    const nodeEnv = process.env.NODE_ENV;
    const entitiesPath = path_1.default.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath = path_1.default.join(__dirname, "./migrations/**.{js,ts}");
    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [entitiesPath],
            migrations: [migrationsPath],
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
const AppDataSource = new typeorm_1.DataSource(configDb);
exports.default = AppDataSource;
