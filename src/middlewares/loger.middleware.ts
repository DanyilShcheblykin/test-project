import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;

    res.send = function (body) {
      // Capture and log the response body here
      console.log('Response Body:', body);
      // Call the original send method to send the response
      return originalSend.call(this, body);
    };

    next();
  }
}
