/* eslint-disable class-methods-use-this */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FastifyRequest, FastifyReply } from 'fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response | FastifyReply>();
    const { ip, url, method, query, protocol } = ctx.getRequest<
      Request | FastifyRequest
    >();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logMsg = {
      statusCode: status,
      ip,
      protocol,
      method,
      path: url,
      query,
    };
    this.logger.log({ context: 'HttpExceptionFilter', message: logMsg });

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error({
        context: 'HttpExceptionFilter',
        message: logMsg,
        stack: exception.stack,
      });
    }
    response.status(status).send();
  }
}
