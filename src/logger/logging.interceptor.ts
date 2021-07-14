/* eslint-disable class-methods-use-this */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Response, Request } from 'express';
import { tap } from 'rxjs/operators';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const { ip, url, method, query, protocol } = ctx.getRequest<
      Request | FastifyRequest
    >();
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = ctx.getResponse<Response | FastifyReply>();
        const logMsg = {
          statusCode,
          ip,
          protocol,
          method,
          path: url,
          query,
          exTime: `${Date.now() - now}ms`,
        };
        this.logger.log({ context: 'LoggingInterceptor', message: logMsg });
      })
    );
  }
}
