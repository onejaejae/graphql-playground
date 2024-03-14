import { NestFactory } from '@nestjs/core';
import { Modules } from './modules';
import { setNestApp } from 'setNestApp';
import { TransactionMiddleware } from './core/middleware/transaction.middleware';

async function bootstrap() {
  const app = await NestFactory.create(Modules);

  setNestApp(app);
  await app.listen(3000);
}
bootstrap();
