import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';

import { BookModule } from './book/book.module';
import ormConfig from './common/db/postgresql/configuration/orm.config';
import { ReviewModule } from './review/review.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { mongooseConfig } from './common/db/mongodb/configuration/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('ormConfig'),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
      },
      formatError: (error) => {
        const originalError = error.extensions?.originalError as Error;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }

        return {
          message: originalError.message,
          code: error.extensions?.code,
        };
      },
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, mongooseConfig),
    BookModule,
    ReviewModule,
    AuthorModule,
    UserModule,
  ],
})
export class AppModule {}
