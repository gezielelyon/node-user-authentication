import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateNewUserService } from '@modules/users/services/CreateNewUserService';

class UsersController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userServiceInstance = container.resolve(CreateNewUserService);

    const user = await userServiceInstance.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}

const newUsersController = new UsersController();

export { newUsersController as UsersController };
