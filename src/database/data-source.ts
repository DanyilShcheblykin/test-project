import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  // url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: Number.parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  // logging: process.env.DATABASE_LOGGING === 'true',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
