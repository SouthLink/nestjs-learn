import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { AppService } from './app.service';

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
