import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TestFilterFilter } from './testFilter.filter';
import { TestInterceptorInterceptor } from './test.interceptor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new TestFilterFilter());
  app.useGlobalInterceptors(new TestInterceptorInterceptor());

  await app.listen(4000);
}
bootstrap();
