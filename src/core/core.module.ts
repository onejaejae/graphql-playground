import {
  ClassProvider,
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { getTypeOrmModule } from './database/typeorm/typeorm.module';
import { TransactionMiddleware } from './middleware/transaction.middleware';
import { TransactionManager } from './database/typeorm/transaction.manager';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './logger/winston-config.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { TypeORMExceptionFilter } from './filter/typeorm.exception.filter';

const providers = [TransactionManager];
const interceptors: ClassProvider[] = [
  // { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
];
const filters: ClassProvider[] = [
  { provide: APP_FILTER, useClass: TypeORMExceptionFilter },
];

@Global()
@Module({
  imports: [
    getTypeOrmModule(),
    WinstonModule.forRootAsync({ useClass: WinstonConfigService }),
  ],
  providers: [...providers, ...interceptors, ...filters],
  exports: [...providers],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
