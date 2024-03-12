import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { getTypeOrmModule } from './database/typeorm/typeorm.module';
import { TransactionMiddleware } from './middleware/transaction.middleware';
import { TransactionManager } from './database/typeorm/transaction.manager';

const providers = [TransactionManager];

@Global()
@Module({
  imports: [getTypeOrmModule()],
  providers: [...providers],
  exports: [...providers],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
