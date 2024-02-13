import { registerAs } from '@nestjs/config';
import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  username: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || '000000',
  database: process.env.PG_DATABASE || 'library',
  migrations: ['dist/common/db/postgresql/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  logging: Boolean(process.env.IS_VERBOSE_MODE),
  synchronize: false,
};

export default registerAs('ormConfig', () => ormConfig);
export const pgDataSource = new DataSource(ormConfig);
