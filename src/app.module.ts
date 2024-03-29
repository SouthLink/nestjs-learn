import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { TestMiddleware } from './test.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TestInterceptorInterceptor } from './test.interceptor.interceptor';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局拦截器依赖注入
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TestInterceptorInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  // 依赖注入中间件， * 代表所有路由
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware).forRoutes('coffees');
  }
}
