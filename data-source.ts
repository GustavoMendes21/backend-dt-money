import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USERNAME_KEY,
  password: process.env.POSTGRES_PASSWORD_KEY,
  database: process.env.POSTGRES_DATABASE_KEY,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  synchronize: true,
});

export function createConnection() {
  AppDataSource.setOptions({ host: "database-dt-money" })
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.log("Error during Data Souce initialization:", err);
    });
}
