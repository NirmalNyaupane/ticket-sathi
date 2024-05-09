import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { EnvConfiguration } from "./env.config";
const AppDataSource = new DataSource({
  type: EnvConfiguration.DB_TYPE as "postgres",
  host: EnvConfiguration.DB_HOST,
  port: +EnvConfiguration.DB_PORT,
  username: EnvConfiguration.DB_USERNAME,
  password: EnvConfiguration.DB_PASSWORD,
  database: EnvConfiguration.DB_NAME,
  synchronize: true,
  // logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [`${__dirname}/../entities/**/*.entity.ts`],
  // path.join() , for windows
  // dropSchema: true,
});

export { AppDataSource };

