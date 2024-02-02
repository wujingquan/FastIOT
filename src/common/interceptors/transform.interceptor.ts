import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        // const response = ctx.getResponse();
        const request = ctx.getRequest();

        if (Array.isArray(data)) {
          const offset = Number(request.query['offset']) || 0;
          const limit = Number(request.query['limit']) || 10;
          const [items, count] = data;
          return {
            items,
            count,
            offset,
            limit,
          };
        }

        return data;
      }),
    );
  }
}
