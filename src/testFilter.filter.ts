import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response, Request } from 'express';
import { TestFilterHandleException } from './testFilterHandle';

@Catch(TestFilterHandleException)
export class TestFilterFilter implements ExceptionFilter {
  catch(exception: TestFilterHandleException, host: ArgumentsHost) {
    const hostType = host.getType();

    if (hostType === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      response.status(500).json({
        ...exception,
      });
    }

    if (hostType === 'rpc') {
    }

    if (hostType === 'ws') {
    }
  }
}
