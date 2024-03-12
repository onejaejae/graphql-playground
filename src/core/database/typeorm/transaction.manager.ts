import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import {
  BOILER_ENTITY_MANAGER,
  BOILER_NAMESPACE,
} from 'src/common/constant/nameSpace';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionManager {
  getEntityManager(): EntityManager {
    const nameSpace = getNamespace(BOILER_NAMESPACE);
    if (!nameSpace || !nameSpace.active)
      throw new InternalServerErrorException(
        `${BOILER_NAMESPACE} is not active`,
      );
    return nameSpace.get(BOILER_ENTITY_MANAGER);
  }
}
