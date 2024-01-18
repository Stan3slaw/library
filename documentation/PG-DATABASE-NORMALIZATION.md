# Database Normalization

## Normal Forms to Achieve

- First Normal Form (1NF): This is the most basic level of normalization. In 1NF, each table cell should contain only a single value, and each column should have a unique name. The first normal form helps to eliminate duplicate data and simplify queries.
- Second Normal Form (2NF): 2NF eliminates redundant data by requiring that each non-key attribute be dependent on the primary key. This means that each column should be directly related to the primary key, and not to other columns.
- Third Normal Form (3NF): 3NF builds on 2NF by requiring that all non-key attributes are independent of each other. This means that each column should be directly related to the primary key, and not to any other columns in the same table.

## First Normal Form

- each record have primary key for identification;
- each cell have only one value;
- each column have a unique name.

All this criteria is meet, therefore database is in First Normal Form.

## Second Normal Form

- it’s already in 1NF;
- each column related to the primary key.

All this criteria is meet, therefore database is in Second Normal Form.

## Third Normal Form

- it's already in 2NF;
- have no transitive partial dependency within a table.

All this criteria is meet, therefore database is in Third Normal Form.

## Normalized Database Schema

![database schema](./assets/library-database-schema.png)
