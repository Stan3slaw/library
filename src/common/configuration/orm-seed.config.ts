import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';

import { ormConfig } from './orm.config';

const ormSeedConfig: DataSourceOptions = {
  ...ormConfig,
  migrations: ['dist/common/seeds/*{.ts,.js}'],
};

export const pgSeedDataSource = new DataSource(ormSeedConfig);
