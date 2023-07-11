import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { AppService } from './app.service';

// middleware 是一种在请求处理管道中进行操作的机制。它可以用于修改进入应用程序的请求、
// 修改响应、执行某些操作以及控制请求流的顺序。Middleware 可以在请求处理的不同阶段进行操作，
// 例如在请求被路由之前、在请求被处理器处理之前或之后，甚至在响应返回给客户端之前或之后。
@Injectable()
export class TestMiddleware implements NestMiddleware {
  @Inject(AppService)
  private readonly appService: AppService;

  use(req: any, res: any, next: () => void) {
    console.log('middleware before');
    console.log(this.appService);
    next();
    console.log('middleware after');
  }
}
