import type { DataSourceOptions } from 'typeorm';

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  username: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || '000000',
  database: process.env.PG_DATABASE || 'library',
  synchronize: false,
};

export default ormconfig;
