import { DataSource } from "typeorm";

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
    migrations: ["./src/database/migrations/*.ts"],
});

export function createConnection(host = "database_rental"): Promise<DataSource> {
    return AppDataSource.setOptions({ host }).initialize();
}
  
export default AppDataSource;