import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { createNamespace, getNamespace } from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';
import {
  BOILER_ENTITY_MANAGER,
  BOILER_NAMESPACE,
} from 'src/common/constant/nameSpace';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(TransactionMiddleware.name);
  constructor(private readonly em: EntityManager) {}
  use(_req: Request, _res: Response, next: NextFunction) {
    // this.logger.log(`Hit TransactionMiddleware`);
    // next();

    const namespace =
      getNamespace(BOILER_NAMESPACE) ?? createNamespace(BOILER_NAMESPACE);
    this.logger.log(`Hit TransactionMiddleware`);

    return namespace.runAndReturn(async () => {
      this.logger.log(
        `BOILER_NAMESPACE Run with status: ${!!namespace.active}`,
      );
      Promise.resolve()
        .then(() => this.setEntityManager())
        .then(next);
    });
  }

  private setEntityManager() {
    const namespace = getNamespace(BOILER_NAMESPACE)!;
    namespace.set(BOILER_ENTITY_MANAGER, this.em);
  }
}
