import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: true,
    //   autoSchemaFile: join(process.cwd(), './schema.gql'),
    // }),
  ],
  controllers: [],
  providers: [],
})
export class Modules {}
