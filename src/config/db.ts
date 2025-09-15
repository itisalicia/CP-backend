import { DataSource } from "typeorm";
import { Country } from "../entities/Country";

const dataSource = new DataSource({
  type: "sqlite",
  database: "cp_db.sqlite",

  entities: [Country],
  synchronize: true,
  logging: ["error", "query"],
});

export async function initializeDB() {
  try {
    await dataSource.initialize();
    console.log("Database connected successfully ✅");
    return dataSource;
  } catch (error) {
    console.error(" ❌ Error during Data Source initialization ====> ", error);
    throw error;
  }
}

export default dataSource;
