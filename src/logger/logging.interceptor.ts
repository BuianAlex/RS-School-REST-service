/* eslint-disable class-methods-use-this */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Response, Request } from 'express';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const { ip, url, method, query, protocol } = ctx.getRequest<
      Request | FastifyRequest
    >();

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = ctx.getResponse<Response | FastifyReply>();
        const resMsg = {
          timestamp: new Date().toISOString(),
          statusCode,
          ip,
          protocol,
          method,
          path: url,
          query,
        };
        console.log(resMsg);
      })
    );
  }
}
