import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { TypeORMException } from '../exception/typeorm.exception';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(TypeORMException)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();

    const response = ctx.res;

    let responseStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const responseJson: Record<string, any> = {
      callClass: exception.callClass,
      callMethod: exception.callMethod,
      message: exception.message,
      stack: exception.stack,
    };

    return exception;
    console.log('responseJson', responseJson);
    return responseJson;

    return response.status(responseStatus).json(responseJson);

    // const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();

    // let responseStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    // const responseJson: Record<string, any> = {
    //   callClass: exception.callClass,
    //   callMethod: exception.callMethod,
    //   message: exception.message,
    //   stack: exception.stack,
    // };

    // return response.status(responseStatus).json(responseJson);
  }
}
