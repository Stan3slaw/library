import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    MongooseModule.forRoot(process.env.MONGODB_URL, mongooseConfig),
    BookModule,
    ReviewModule,
    AuthorModule,
    UserModule,
  ],
})
export class AppModule {}
