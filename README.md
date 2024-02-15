# Library

This project was created in educational purposes to get experience in working with `Docker`, `PostgreSQL`, `MongoDB` and `NestJS`.

## Usage

```bash
docker compose up
```

## Databases

### PostgreSQL

There are two ways to create and seed tables in database:

- Using migrations from folder `./migrations` in root. That migrations passes as volumes to `postgres` service in `docker-compose.yaml` and runs during Docker container initializing.

```
volumes:
    - pgdata:/var/lib/postgresql/data
    - ./migrations/create-tables.sql:/docker-entrypoint-initdb.d/01_create-tables.sql
    - ./migrations/seed-data.sql:/docker-entrypoint-initdb.d/02_seed-data.sql
```

- Using typeorm migrating and seeding data features. In this project typeorm is using to manipulate PostgreSQL database.
  After Docker container started run these commands inside container:

  - Running existed migrations (will create tables, since there is creating tables migration)

  ```
  pnpm pg:migrate
  ```

  - Seeding data in tables

  ```
  pnpm pg:seed
  ```

  Also, there are few more typeorm commands that used for manipulating database:

  - Dropping database schema (be careful while using this one, it's not recommended to use on production)

  ```
  pnpm pg:drop
  ```

  - Generating new migrations in folder with migrations, in this case ./src/common/db/postgresql/migrations/

  ```
  pnpm pg:generate ./src/common/db/postgresql/migrations/<NameOfTheMigration>
  ```

### MongoDB

[Migrate](https://www.npmjs.com/package/migrate) library is using for creating and running migrations for MongoDB. All migrations store in `./src/common/db/mongodb/migrations`.

- Creating migration based on template ./src/common/db/mongodb/templates/migration.template.ts

```
pnpm migrate:create -- <migration name>
```

- Running migration update script

```
pnpm migrate:up
```

- Running migration downgrade script

```
pnpm migrate:down
```

## Documentation

- [PostgreSQL Database Normalization](./documentation/PG-DATABASE-NORMALIZATION.md)
