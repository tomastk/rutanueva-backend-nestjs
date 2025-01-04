import { NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: (error?: Error | any) => void) {
    console.log('User Middleware');
    console.log(req.headers);
    const userId = req.headers['authorization']; // en un futuro acá va a estar la lógica del token
    console.log('userId: ' + userId);
    if (!userId) {
      return res
        .status(401)
        .json({ message: 'Debes incluir el Authorization token' });
    }
    req['userId'] = userId;
    next();
  }
}
