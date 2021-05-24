import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';

class SessionsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userServiceInstance = container.resolve(AuthenticateUserService);

    const { user, token } = await userServiceInstance.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}

const newSessionsController = new SessionsController();

export { newSessionsController as SessionsController };
