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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './interceptor/error.interceptor';

const providers = [TransactionManager];
const interceptors: ClassProvider[] = [
  { provide: APP_INTERCEPTOR, useClass: ErrorInterceptor },
];

@Global()
@Module({
  imports: [
    getTypeOrmModule(),
    WinstonModule.forRootAsync({ useClass: WinstonConfigService }),
  ],
  providers: [...providers, ...interceptors],
  exports: [...providers],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactionMiddleware).forRoutes('*');
  }
}
