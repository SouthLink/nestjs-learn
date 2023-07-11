import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  catchError,
  map,
  tap,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

// 拦截器 是一种在控制器处理请求之前和之后执行的机制。它可以用于修改请求、修改响应、
// 执行某些操作以及控制请求流的顺序。拦截器主要用于处理与业务逻辑相关的横切关注点，
// 例如身份验证、日志记录、错误处理等。
// rxjs
// tap: 不修改响应数据，执行一些额外逻辑，比如记录日志、更新缓存等
// map：对响应数据做修改，一般都是改成 {code, data, message} 的格式
// catchError：在 exception filter 之前处理抛出的异常，可以记录或者抛出别的异常
// timeout：处理响应超时的情况，抛出一个 TimeoutError，配合 catchErrror 可以返回超时的响应
@Injectable()
export class TestInterceptorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TestInterceptorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Interceptor Before...');

    // timeout 接口超时处理
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          // return 408 error
          return throwError(() => new RequestTimeoutException());
        }

        return throwError(() => err);
      }),
    );

    // 异常处理
    // return next.handle().pipe(
    //   catchError((err) => {
    //     this.logger.error('Interceptor Error...', err.message, err.stack);
    //     return throwError(err);
    //   }),
    // );

    // 接口信息打印，缓存操作
    // return next
    //   .handle()
    //   .pipe(tap((data) => this.logger.log('test Interceptor', data)));

    // 返回信息包装
    // return next.handle().pipe(
    //   map((data) => ({
    //     code: 200,
    //     message: 'success',
    //     data,
    //   })),
    // );

    // 统计接口耗时
    // const now = Date.now();
    // return next
    //   .handle()
    //   .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
