import { InternalServerErrorException } from '@nestjs/common';
import { getNamespace } from 'cls-hooked';
import {
  BOILER_ENTITY_MANAGER,
  BOILER_NAMESPACE,
} from 'src/common/constant/nameSpace';
import { EntityManager } from 'typeorm';

export function Transactional() {
  return function (
    _target: Object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    // save original method
    const originMethod = descriptor.value;

    // wrapped origin method with Transaction
    async function transactionWrapped(...args: unknown[]) {
      // validate nameSpace && get nameSpace
      const nameSpace = getNamespace(BOILER_NAMESPACE);
      if (!nameSpace || !nameSpace.active)
        throw new InternalServerErrorException(
          `${BOILER_NAMESPACE} is not active`,
        );

      // get EntityManager
      const em = nameSpace.get(BOILER_ENTITY_MANAGER) as EntityManager;
      if (!em)
        throw new InternalServerErrorException(
          `Could not find EntityManager in ${BOILER_NAMESPACE} nameSpace`,
        );

      return await em.transaction(
        process.env.NODE_ENV !== 'test' ? 'REPEATABLE READ' : 'SERIALIZABLE',
        async (tx: EntityManager) => {
          nameSpace.set(BOILER_ENTITY_MANAGER, tx);
          return await originMethod.apply(this, args);
        },
      );
    }

    descriptor.value = transactionWrapped;
  };
}
