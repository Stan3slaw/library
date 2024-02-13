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

```
pnpm pg:migrate // Using for running existed migrations
pnpm pg:seed // Using for seeding data in tables
```

Also, there are few more typeorm commands that used for manipulating database:

```
pnpm pg:drop // Using for dropping database schema (be careful while using this one, it's not recommended to use on production)
pnpm pg:generate ./src/common/migrations/<NameOfTheMigration> // Using for generating new migrations in folder with migrations, in this case ./src/common/migrations/
```

## Documentation

- [PostgreSQL Database Normalization](./documentation/PG-DATABASE-NORMALIZATION.md)
