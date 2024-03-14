import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CoreModule } from './core/core.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';

const applicationModules = [UserModule, PostModule];

@Module({
  imports: [
    CoreModule,
    ...applicationModules,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
    }),
  ],
})
export class Modules {}
