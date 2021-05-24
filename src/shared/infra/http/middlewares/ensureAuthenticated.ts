import { AppError } from '@shared/error/AppError';
import { Request, Response, NextFunction } from 'express';

import { JsonWebTokenProvider } from '@modules/users/providers/JWTProvider/implementations/JsonWebTokenProvider';

const jwtProvider = new JsonWebTokenProvider();

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await jwtProvider.verify(token);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token!', 401);
  }
}
