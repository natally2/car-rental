import "reflect-metadata";
import { DataSource } from "typeorm";
import { Category } from "../modules/cars/entities/Category";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "rental",
    password: "rental",
    database: "carrental",
    synchronize: true,
    logging: true,
    subscribers: [],
    entities: [Category],
    migrations: ["./src/database/migrations/*.ts"],
});

export function createConnection(host = "database_rental"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}
  
export default AppDataSource;