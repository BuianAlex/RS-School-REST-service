/* eslint-disable class-methods-use-this */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FastifyRequest, FastifyReply } from 'fastify';

import { config } from './config';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { ip, url, method, query, protocol } = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const resMsg = {
      timestamp: new Date().toISOString(),
      statusCode: status,
      ip,
      protocol,
      method,
      path: url,
      query,
    };
    console.log(resMsg);

    if (exception instanceof Error) {
      console.log(exception.stack);
    }
    response.status(status).send();
  }
}
